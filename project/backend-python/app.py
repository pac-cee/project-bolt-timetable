import os
from flask import Flask, jsonify, request, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_cors import CORS
from werkzeug.utils import secure_filename
import pandas as pd
from datetime import timedelta

app = Flask(__name__)
CORS(app)

# Config
app.config['SECRET_KEY'] = 'super-secret-key'
app.config['JWT_SECRET_KEY'] = 'jwt-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

db = SQLAlchemy(app)
jwt = JWTManager(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

class Timetable(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    data = db.Column(db.Text)  # JSON string
    filename = db.Column(db.String(120))

class StudyPlan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    data = db.Column(db.Text)  # JSON string

class Progress(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    data = db.Column(db.Text)  # JSON string

with app.app_context():
    db.create_all()

@app.route('/ping')
def ping():
    return jsonify({'message': 'pong'})

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({'status': 'error', 'message': 'Username and password required.'}), 400
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'status': 'error', 'message': 'User already exists.'}), 400
    user = User(username=data['username'], password=data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'User registered.'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(username=data.get('username')).first()
    if not user or user.password != data.get('password'):
        return jsonify({'status': 'error', 'message': 'Invalid credentials.'}), 401
    access_token = create_access_token(identity=user.id)
    return jsonify({'status': 'success', 'access_token': access_token}), 200

@app.route('/upload-timetable', methods=['POST'])
@jwt_required()
def upload_timetable():
    user_id = get_jwt_identity()
    if 'file' not in request.files:
        return jsonify({'status': 'error', 'message': 'No file uploaded.'}), 400
    file = request.files['file']
    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)
    # Parse CSV or Excel
    try:
        if filename.endswith('.csv'):
            df = pd.read_csv(filepath)
        elif filename.endswith('.xlsx') or filename.endswith('.xls'):
            df = pd.read_excel(filepath)
        else:
            return jsonify({'status': 'error', 'message': 'Unsupported file type.'}), 400
        timetable_json = df.to_json(orient='records')
        timetable = Timetable(user_id=user_id, data=timetable_json, filename=filename)
        db.session.add(timetable)
        db.session.commit()
        return jsonify({'status': 'success', 'message': 'Timetable uploaded and parsed.'}), 200
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/generate-plan', methods=['POST'])
@jwt_required()
def generate_plan():
    user_id = get_jwt_identity()
    timetable = Timetable.query.filter_by(user_id=user_id).order_by(Timetable.id.desc()).first()
    if not timetable:
        return jsonify({'status': 'error', 'message': 'No timetable uploaded.'}), 400
    # Dummy AI logic: Generate a plan based on timetable rows
    import json
    timetable_data = json.loads(timetable.data)
    plan = {'plan': []}
    for i, row in enumerate(timetable_data):
        plan['plan'].append({'day': f'Day {i+1}', 'task': str(row)})
    plan_json = json.dumps(plan)
    study_plan = StudyPlan(user_id=user_id, data=plan_json)
    db.session.add(study_plan)
    db.session.commit()
    return jsonify({'status': 'success', 'plan': plan}), 200

@app.route('/plan', methods=['GET'])
@jwt_required()
def get_plan():
    user_id = get_jwt_identity()
    plan = StudyPlan.query.filter_by(user_id=user_id).order_by(StudyPlan.id.desc()).first()
    if not plan:
        return jsonify({'status': 'error', 'message': 'No plan generated.'}), 404
    import json
    return jsonify({'status': 'success', 'plan': json.loads(plan.data)}), 200

@app.route('/progress', methods=['POST'])
@jwt_required()
def update_progress():
    user_id = get_jwt_identity()
    data = request.get_json()
    import json
    progress = Progress(user_id=user_id, data=json.dumps(data))
    db.session.add(progress)
    db.session.commit()
    return jsonify({'status': 'success', 'progress': data}), 200

@app.route('/progress', methods=['GET'])
@jwt_required()
def get_progress():
    user_id = get_jwt_identity()
    progress = Progress.query.filter_by(user_id=user_id).order_by(Progress.id.desc()).first()
    import json
    if not progress:
        return jsonify({'status': 'success', 'progress': {}}), 200
    return jsonify({'status': 'success', 'progress': json.loads(progress.data)}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

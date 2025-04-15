import React from 'react';
import { FileUpload } from './components/file-upload';
import { AuthForm } from './components/auth/auth-form';
import { Brain } from 'lucide-react';
import { useAuthStore } from './store/auth-store';
import TimetableDemoPanel from './TimetableDemoPanel';

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-neutral-900" />
              <span className="ml-2 text-xl font-semibold text-neutral-900">
                Intelligent Timetable Analyzer
              </span>
            </div>
            {user && (
              <div className="text-sm text-neutral-600">
                {user.email}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          {!user ? (
            <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-8">
              <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
                Sign In to Your Account
              </h2>
              <AuthForm />
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Welcome to Your Smart Study Planner
              </h1>
              <p className="text-neutral-600 mb-8">
                Upload your timetable and let our AI create a personalized study schedule optimized for your success.
              </p>
              
              <div className="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                <FileUpload />
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature Cards */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Smart Analysis
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Our AI analyzes your timetable to create an optimized study schedule.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Personalized Planning
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Get customized study sessions based on your course load and preferences.
                  </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
                  <h3 className="font-semibold text-neutral-900 mb-2">
                    Progress Tracking
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Monitor your study progress and adjust your schedule as needed.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <TimetableDemoPanel />
    </div>
  );
}

export default App;
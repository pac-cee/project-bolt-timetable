import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';
import { Button } from './ui/button';

export function FileUpload() {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle file upload logic here
    console.log('Accepted files:', acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/pdf': ['.pdf']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
        ${isDragActive ? 'border-neutral-500 bg-neutral-50' : 'border-neutral-200 hover:border-neutral-300'}`}
    >
      <input {...getInputProps()} />
      <Upload className="w-12 h-12 mx-auto mb-4 text-neutral-400" />
      <h3 className="text-lg font-semibold mb-2">Upload Your Timetable</h3>
      <p className="text-neutral-600 mb-4">
        Drag & drop your file here, or click to select
      </p>
      <div className="text-sm text-neutral-500">
        Supported formats: CSV, Excel, PDF
      </div>
      <Button variant="outline" className="mt-4">
        Select File
      </Button>
    </div>
  );
}
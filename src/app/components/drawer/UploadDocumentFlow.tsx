import { useState } from 'react';
import { Upload, FileText, X, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

interface UploadDocumentFlowProps {
  onComplete: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

export function UploadDocumentFlow({ onComplete }: UploadDocumentFlowProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [caseId, setCaseId] = useState('');

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (fileList: File[]) => {
    const newFiles: UploadedFile[] = fileList.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const handleSubmit = () => {
    console.log('Uploading documents:', { files, caseId });
    onComplete();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Case Association */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">
            Associate with Case (Optional)
          </label>
          <input
            type="text"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            placeholder="Enter case ID or search..."
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-neutral-500 mt-1.5">
            Leave blank to upload without a case association
          </p>
        </div>

        {/* Upload Zone */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Upload Files</h3>
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-blue-400 hover:bg-blue-50/50 transition-colors"
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-neutral-900 font-medium mb-1">
                  Drop files here or click to browse
                </p>
                <p className="text-sm text-neutral-600">
                  Supports PDF, JPG, PNG (max 10MB each)
                </p>
              </div>
              <input
                type="file"
                multiple
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png"
              />
              <label
                htmlFor="file-upload"
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors"
              >
                Browse Files
              </label>
            </div>
          </div>
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">
              Files ({files.length})
            </h3>
            <div className="space-y-2">
              {files.map(file => (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 bg-white border border-neutral-200 rounded-lg"
                >
                  <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-neutral-900 truncate">{file.name}</p>
                    <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="p-1 hover:bg-neutral-100 rounded transition-colors"
                  >
                    <X className="w-4 h-4 text-neutral-600" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-neutral-200 p-6 bg-neutral-50 flex items-center justify-between">
        <button
          onClick={onComplete}
          className="px-4 py-2 text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={files.length === 0}
          className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="w-4 h-4" />
          Upload {files.length > 0 && `(${files.length})`}
        </button>
      </div>
    </div>
  );
}

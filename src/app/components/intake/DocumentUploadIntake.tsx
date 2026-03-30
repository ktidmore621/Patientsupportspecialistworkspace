import { useState } from 'react';
import { Upload, FileText, X, CheckCircle2, Sparkles, AlertCircle, Search, Loader2, UserCheck, XCircle, User } from 'lucide-react';
import { mockCases } from '../../data/mockData';

interface DocumentUploadIntakeProps {
  onComplete: () => void;
}

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
}

interface PatientMatch {
  caseId: string;
  patientName: string;
  phone: string;
  confidence: number;
}

export function DocumentUploadIntake({ onComplete }: DocumentUploadIntakeProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractedData, setExtractedData] = useState<any>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [matchCandidates, setMatchCandidates] = useState<PatientMatch[]>([]);
  const [linkedPatient, setLinkedPatient] = useState<PatientMatch | null>(null);
  const [showManualSearch, setShowManualSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [caseSearchQuery, setCaseSearchQuery] = useState('');
  const [showCaseSearchResults, setShowCaseSearchResults] = useState(false);
  const [linkedCase, setLinkedCase] = useState<any>(null);

  // Filter cases based on search query for case linking
  const caseSearchResults = caseSearchQuery.length > 0
    ? mockCases.filter(c => 
        c.patient.firstName.toLowerCase().includes(caseSearchQuery.toLowerCase()) ||
        c.patient.lastName.toLowerCase().includes(caseSearchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(caseSearchQuery.toLowerCase()) ||
        (c.patient.phone && c.patient.phone.includes(caseSearchQuery))
      ).slice(0, 5)
    : [];

  const handleLinkCase = (caseItem: any) => {
    setLinkedCase(caseItem);
    setCaseSearchQuery('');
    setShowCaseSearchResults(false);
  };

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
    
    // Simulate AI extraction
    setIsExtracting(true);
    setTimeout(() => {
      setIsExtracting(false);
      setExtractedData({
        patientName: 'Maria Rodriguez',
        dateOfBirth: '1967-08-15',
        phone: '(555) 234-9012',
        insurance: 'Blue Cross Blue Shield',
        confidence: 0.94,
      });
      
      // Start patient matching immediately after extraction
      setIsMatching(true);
      setTimeout(() => {
        setIsMatching(false);
        // High-confidence match found - auto-select
        const highConfidenceMatch: PatientMatch = {
          caseId: 'PSP-2024-1847',
          patientName: 'Maria Rodriguez',
          phone: '(555) 234-9012',
          confidence: 0.96
        };
        setMatchCandidates([
          highConfidenceMatch,
          { caseId: 'PSP-2024-1823', patientName: 'Jennifer Kim', phone: '(555) 123-7890', confidence: 0.72 }
        ]);
        // Auto-link high confidence match
        setLinkedPatient(highConfidenceMatch);
      }, 1500);
    }, 2000);
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
    if (!linkedPatient) {
      alert('Please link a patient before creating the case');
      return;
    }
    console.log('Creating case from document upload:', { files, extractedData, linkedPatient });
    onComplete();
  };

  const handleUnlink = () => {
    setLinkedPatient(null);
  };

  const handleLinkPatient = (patient: PatientMatch) => {
    setLinkedPatient(patient);
    setShowManualSearch(false);
  };

  const handleManualSearch = () => {
    setShowManualSearch(true);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Upload Zone */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Upload Documents</h3>
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
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Uploaded Files</h3>
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

        {/* AI Extraction Status */}
        {isExtracting && (
          <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-purple-600 animate-pulse" />
              <div>
                <p className="text-sm font-medium text-purple-900">
                  AI is extracting data from your documents...
                </p>
                <p className="text-xs text-purple-700 mt-0.5">
                  This usually takes a few seconds
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Data Preview */}
        {extractedData && !linkedPatient && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-neutral-900">AI Extracted Data</h3>
              <div className="flex items-center gap-1.5 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                <span className="text-green-700 font-medium">
                  {Math.round(extractedData.confidence * 100)}% Confidence
                </span>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    value={extractedData.patientName}
                    readOnly
                    className="w-full px-3 py-2 border border-green-300 bg-white rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={extractedData.phone}
                    readOnly
                    className="w-full px-3 py-2 border border-green-300 bg-white rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Patient Matching Loading */}
        {isMatching && (
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-3">
              <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
              <div>
                <p className="text-sm font-medium text-blue-900">
                  Matching document to patient...
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Linked Patient Banner */}
        {linkedPatient && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <UserCheck className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Linked to: {linkedPatient.patientName}
                  </p>
                  <div className="mt-1 space-y-0.5">
                    <p className="text-xs text-green-700">Case ID: {linkedPatient.caseId}</p>
                    <p className="text-xs text-green-700">Phone: {linkedPatient.phone}</p>
                    <p className="text-xs text-green-700">Confidence: {Math.round(linkedPatient.confidence * 100)}%</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleUnlink}
                className="text-sm text-green-700 hover:text-green-800 font-medium underline"
              >
                Unlink
              </button>
            </div>
          </div>
        )}

        {/* Match Candidates (if no link or manual search) */}
        {matchCandidates.length > 0 && !linkedPatient && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Match Candidates</h3>
            <div className="space-y-2">
              {matchCandidates.map((candidate) => (
                <div
                  key={candidate.caseId}
                  className="p-4 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-neutral-900">{candidate.patientName}</p>
                      <div className="mt-1 space-y-0.5">
                        <p className="text-xs text-neutral-600">Case ID: {candidate.caseId}</p>
                        <p className="text-xs text-neutral-600">Phone: {candidate.phone}</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <div className={`w-2 h-2 rounded-full ${candidate.confidence > 0.9 ? 'bg-green-500' : 'bg-amber-500'}`} />
                          <span className="text-xs text-neutral-600">
                            {Math.round(candidate.confidence * 100)}% match
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleLinkPatient(candidate)}
                      className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
                    >
                      Link
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <button
                onClick={handleManualSearch}
                className="text-sm text-blue-700 hover:text-blue-800 font-medium"
              >
                Can't find the patient? Search manually
              </button>
            </div>
          </div>
        )}

        {/* Manual Search Field */}
        {showManualSearch && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Manual Patient Search</h3>
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, case ID, or phone..."
                  className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Case Linking Search Field */}
        {linkedCase === null && (
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Link to Existing Case (Optional)</h3>
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={caseSearchQuery}
                  onChange={(e) => {
                    setCaseSearchQuery(e.target.value);
                    setShowCaseSearchResults(e.target.value.length > 0);
                  }}
                  onFocus={() => setShowCaseSearchResults(caseSearchQuery.length > 0)}
                  placeholder="Search by name, case ID, or phone..."
                  className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Case Search Results Dropdown */}
              {showCaseSearchResults && caseSearchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {caseSearchResults.map((caseItem) => (
                    <button
                      key={caseItem.id}
                      type="button"
                      onClick={() => handleLinkCase(caseItem)}
                      className="w-full px-3 py-2.5 hover:bg-neutral-50 transition-colors text-left flex items-center gap-3 border-b border-neutral-100 last:border-b-0"
                    >
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-blue-700" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-neutral-900">
                          {caseItem.patient.firstName} {caseItem.patient.lastName}
                        </div>
                        <div className="text-xs text-neutral-500">
                          {caseItem.id} • {caseItem.patient.phone}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Linked Case Indicator */}
            {linkedCase && (
              <div className="mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                <User className="w-4 h-4 text-blue-700" />
                <span className="text-sm text-blue-900">
                  Linked to: <span className="font-medium">{linkedCase.patient.firstName} {linkedCase.patient.lastName}</span> ({linkedCase.id})
                </span>
                <button
                  type="button"
                  onClick={() => setLinkedCase(null)}
                  className="ml-auto text-xs text-blue-700 hover:text-blue-900 font-medium"
                >
                  Unlink
                </button>
              </div>
            )}
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
          disabled={!linkedPatient}
          className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <CheckCircle2 className="w-4 h-4" />
          Confirm & Create Case
        </button>
      </div>
    </div>
  );
}
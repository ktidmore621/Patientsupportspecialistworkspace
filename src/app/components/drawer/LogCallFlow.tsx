import { useState } from 'react';
import { Phone, CheckCircle2, Search } from 'lucide-react';

interface LogCallFlowProps {
  onComplete: () => void;
}

export function LogCallFlow({ onComplete }: LogCallFlowProps) {
  const [formData, setFormData] = useState({
    caseId: '',
    callType: '',
    duration: '',
    outcome: '',
    notes: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Logging call:', formData);
    onComplete();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Content */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Case Association */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">
            Case <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              value={formData.caseId}
              onChange={(e) => handleChange('caseId', e.target.value)}
              placeholder="Search by case ID or patient name..."
              className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <p className="text-xs text-neutral-500 mt-1.5">
            Start typing to search for a case
          </p>
        </div>

        {/* Call Details */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Call Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Call Type <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.callType}
                onChange={(e) => handleChange('callType', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select type...</option>
                <option value="outbound">Outbound</option>
                <option value="inbound">Inbound</option>
                <option value="voicemail">Voicemail</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Duration (minutes)
              </label>
              <input
                type="number"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="e.g., 5"
                min="0"
                step="1"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Outcome <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.outcome}
                onChange={(e) => handleChange('outcome', e.target.value)}
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select outcome...</option>
                <option value="reached">Patient Reached</option>
                <option value="no_answer">No Answer</option>
                <option value="left_message">Left Message</option>
                <option value="disconnected">Number Disconnected</option>
                <option value="callback_requested">Callback Requested</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Call Notes <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => handleChange('notes', e.target.value)}
                rows={6}
                placeholder="Enter details about the call..."
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
            </div>
          </div>
        </div>
      </form>

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
          className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Log Call
        </button>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { Mail, CheckCircle2, Search, Sparkles, Copy } from 'lucide-react';

interface SendEmailFlowProps {
  onComplete: () => void;
}

export function SendEmailFlow({ onComplete }: SendEmailFlowProps) {
  const [formData, setFormData] = useState({
    caseId: '',
    template: '',
    subject: '',
    body: '',
  });
  const [isGenerating, setIsGenerating] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateAI = () => {
    setIsGenerating(true);
    
    // Simulate AI generation
    setTimeout(() => {
      setFormData(prev => ({
        ...prev,
        subject: 'Missing HIPAA Authorization - Action Required',
        body: `Dear [Patient Name],

We hope this message finds you well. We're reaching out regarding your enrollment in the Patient Support Program.

To continue processing your application, we need you to complete and return the HIPAA Authorization form. This is a required document that allows us to access your medical information and process your enrollment.

What you need to do:
1. Download the attached HIPAA Authorization form
2. Complete all required fields
3. Sign and date the form
4. Return it to us via fax (555-123-4567) or email

If you have any questions or need assistance completing the form, please don't hesitate to contact us at (555) 123-4567.

We're here to help make this process as smooth as possible.

Best regards,
Patient Support Team`,
      }));
      setIsGenerating(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending email:', formData);
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
        </div>

        {/* Email Template */}
        <div>
          <label className="block text-sm font-semibold text-neutral-900 mb-2">
            Email Template
          </label>
          <select
            value={formData.template}
            onChange={(e) => handleChange('template', e.target.value)}
            className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Start from scratch</option>
            <option value="hipaa">HIPAA Request</option>
            <option value="welcome">Welcome to Program</option>
            <option value="status">Status Update</option>
            <option value="missing_info">Missing Information</option>
          </select>
        </div>

        {/* AI Generation */}
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-purple-900 mb-1">
                AI-Powered Draft
              </p>
              <p className="text-xs text-purple-700">
                Generate a contextual email based on the case details and history
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleGenerateAI}
            disabled={isGenerating || !formData.caseId}
            className="w-full px-4 py-2 bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? 'Generating...' : 'Generate with AI'}
          </button>
        </div>

        {/* Email Composition */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Email Content</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => handleChange('subject', e.target.value)}
                placeholder="Enter email subject..."
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.body}
                onChange={(e) => handleChange('body', e.target.value)}
                rows={12}
                placeholder="Enter email message..."
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
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
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg transition-colors"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}

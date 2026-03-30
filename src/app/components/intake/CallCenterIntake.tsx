import { useState } from 'react';
import { Phone, Clock, CheckCircle2, Search, Sparkles, User } from 'lucide-react';
import { mockCases } from '../../data/mockData';

interface CallCenterIntakeProps {
  onComplete: () => void;
}

export function CallCenterIntake({ onComplete }: CallCenterIntakeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [linkedPatient, setLinkedPatient] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    callReason: '',
    notes: '',
  });

  // Filter cases based on search query
  const searchResults = searchQuery.length > 0
    ? mockCases.filter(c => 
        c.patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (c.patient.phone && c.patient.phone.includes(searchQuery))
      ).slice(0, 5)
    : [];

  const handleLinkPatient = (caseItem: any) => {
    setLinkedPatient(caseItem.patient);
    setFormData({
      firstName: caseItem.patient.firstName,
      lastName: caseItem.patient.lastName,
      dateOfBirth: caseItem.patient.dateOfBirth,
      phone: caseItem.patient.phone || '',
      email: caseItem.patient.email || '',
      callReason: formData.callReason,
      notes: formData.notes,
    });
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating case from call center intake:', formData);
    onComplete();
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Live Call Status Banner */}
      <div className="bg-green-50 border-b border-green-200 px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <Phone className="w-4 h-4 text-green-700" />
          <span className="text-sm font-medium text-green-900">Live Call Active</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-green-700 ml-auto">
          <Clock className="w-4 h-4" />
          <span>03:42</span>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
        <div className="space-y-6">
          {/* Quick Patient Search */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Quick Search Patient
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-neutral-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(e.target.value.length > 0);
                }}
                onFocus={() => setShowSearchResults(searchQuery.length > 0)}
                className="w-full pl-9 pr-3 py-2.5 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-neutral-50"
                placeholder="Search by name, case ID, or phone..."
              />
              
              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-neutral-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {searchResults.map((caseItem) => (
                    <button
                      key={caseItem.id}
                      type="button"
                      onClick={() => handleLinkPatient(caseItem)}
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
            
            {/* Linked Patient Indicator */}
            {linkedPatient && (
              <div className="mt-2 px-3 py-2 bg-blue-50 border border-blue-200 rounded-lg flex items-center gap-2">
                <User className="w-4 h-4 text-blue-700" />
                <span className="text-sm text-blue-900">
                  Linked to: <span className="font-medium">{linkedPatient.firstName} {linkedPatient.lastName}</span>
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setLinkedPatient(null);
                    setFormData({
                      firstName: '',
                      lastName: '',
                      dateOfBirth: '',
                      phone: '',
                      email: '',
                      callReason: formData.callReason,
                      notes: formData.notes,
                    });
                  }}
                  className="ml-auto text-xs text-blue-700 hover:text-blue-900 font-medium"
                >
                  Unlink
                </button>
              </div>
            )}
          </div>

          {/* Patient Information */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Patient Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="(555) 555-5555"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Call Details */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-900 mb-3">Call Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Call Reason <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.callReason}
                  onChange={(e) => handleChange('callReason', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">Select reason...</option>
                  <option value="new_enrollment">New Enrollment</option>
                  <option value="status_inquiry">Status Inquiry</option>
                  <option value="update_info">Update Information</option>
                  <option value="copay_assistance">Copay Assistance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Call Notes
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Enter any additional notes from the call..."
                />
              </div>
            </div>
          </div>

          {/* AI Call Summary */}
          <div className="border border-purple-200 rounded-xl bg-gradient-to-br from-purple-50 to-blue-50 p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <h3 className="text-sm font-semibold text-neutral-900">AI Call Summary</h3>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse" />
                <span className="text-xs text-purple-700 font-medium">Summarizing...</span>
              </div>
            </div>
            
            <div className="space-y-2.5">
              <div>
                <div className="text-xs font-medium text-neutral-700 mb-1">Call Purpose</div>
                <p className="text-sm text-neutral-900">
                  Patient inquiring about copay assistance program eligibility. Expressed concerns about medication affordability and current insurance coverage limitations.
                </p>
              </div>
              
              <div>
                <div className="text-xs font-medium text-neutral-700 mb-1">Key Points</div>
                <ul className="text-sm text-neutral-900 space-y-1">
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                    <span>Patient has commercial insurance with high deductible ($3,500 remaining)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                    <span>Prescribed medication costs approximately $850/month out-of-pocket</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1 h-1 bg-purple-600 rounded-full mt-1.5 flex-shrink-0" />
                    <span>Patient expressed willingness to provide required documentation</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <div className="text-xs font-medium text-neutral-700 mb-1">Recommended Next Steps</div>
                <p className="text-sm text-neutral-900">
                  Initiate copay assistance enrollment. Request proof of insurance and income verification. Set follow-up call for document review in 3-5 business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Footer Actions */}
      <div className="border-t border-neutral-200 p-6 bg-neutral-50 flex items-center justify-between">
        <button
          type="button"
          onClick={onComplete}
          className="px-4 py-2 text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors"
        >
          Cancel Call
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
        >
          <CheckCircle2 className="w-4 h-4" />
          Save & Create Case
        </button>
      </div>
    </div>
  );
}
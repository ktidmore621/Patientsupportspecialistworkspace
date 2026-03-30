import { useState, useEffect } from 'react';
import { CheckCircle2, User, Building2, FileText, AlertTriangle } from 'lucide-react';

interface ManualEntryIntakeProps {
  onComplete: () => void;
}

interface PossibleMatch {
  caseId: string;
  patientName: string;
  phone: string;
}

export function ManualEntryIntake({ onComplete }: ManualEntryIntakeProps) {
  const [formData, setFormData] = useState({
    // Patient Info
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    
    // Insurance Info
    insuranceProvider: '',
    policyNumber: '',
    groupNumber: '',
    subscriberName: '',
    
    // Provider Info
    prescribingPhysician: '',
    npi: '',
    clinicName: '',
    clinicPhone: '',
    
    // Program Info
    program: '',
    medication: '',
    diagnosis: '',
  });

  const [possibleMatches, setPossibleMatches] = useState<PossibleMatch[]>([]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating case from manual entry:', formData);
    onComplete();
  };

  // Real-time duplicate detection
  useEffect(() => {
    const { firstName, lastName, dateOfBirth } = formData;
    
    // Only run check if we have minimum required data
    if (firstName.length >= 3 && lastName.length >= 3 && dateOfBirth) {
      // Simulate API call to check for duplicates
      setTimeout(() => {
        // Mock match found
        if (firstName.toLowerCase() === 'maria' && lastName.toLowerCase() === 'rodriguez') {
          setPossibleMatches([
            { 
              caseId: 'PSP-2024-1847', 
              patientName: 'Maria Rodriguez', 
              phone: '(555) 234-9012' 
            }
          ]);
        } else {
          setPossibleMatches([]);
        }
      }, 300);
    } else {
      setPossibleMatches([]);
    }
  }, [formData.firstName, formData.lastName, formData.dateOfBirth]);

  return (
    <div className="h-full flex flex-col">
      {/* Content */}
      <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6">
        <div className="space-y-8">
          {/* Patient Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-4 h-4 text-blue-700" />
              </div>
              <h3 className="font-semibold text-neutral-900">Patient Information</h3>
            </div>
            
            <div className="space-y-4 pl-10">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Duplicate Detection Banner */}
              {possibleMatches.length > 0 && (
                <div className="bg-[#f59e0b]/10 border border-[#f59e0b] rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-[#f59e0b] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-neutral-900">
                        Possible match found — {possibleMatches[0].patientName} · {possibleMatches[0].caseId} · {possibleMatches[0].phone}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <button className="text-sm text-[#f59e0b] hover:text-[#d97706] font-medium">
                          Review match
                        </button>
                        <span className="text-neutral-400">·</span>
                        <button className="text-sm text-neutral-600 hover:text-neutral-700 font-medium">
                          Continue as new
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange('address', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-6 gap-3">
                <div className="col-span-3">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="col-span-1">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    State
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => handleChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    maxLength={2}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    ZIP
                  </label>
                  <input
                    type="text"
                    value={formData.zip}
                    onChange={(e) => handleChange('zip', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Insurance Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-green-700" />
              </div>
              <h3 className="font-semibold text-neutral-900">Insurance Information</h3>
            </div>
            
            <div className="space-y-4 pl-10">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Insurance Provider <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.insuranceProvider}
                  onChange={(e) => handleChange('insuranceProvider', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Policy Number
                  </label>
                  <input
                    type="text"
                    value={formData.policyNumber}
                    onChange={(e) => handleChange('policyNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Group Number
                  </label>
                  <input
                    type="text"
                    value={formData.groupNumber}
                    onChange={(e) => handleChange('groupNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Subscriber Name (if different)
                </label>
                <input
                  type="text"
                  value={formData.subscriberName}
                  onChange={(e) => handleChange('subscriberName', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Provider Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building2 className="w-4 h-4 text-purple-700" />
              </div>
              <h3 className="font-semibold text-neutral-900">Provider Information</h3>
            </div>
            
            <div className="space-y-4 pl-10">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Prescribing Physician
                  </label>
                  <input
                    type="text"
                    value={formData.prescribingPhysician}
                    onChange={(e) => handleChange('prescribingPhysician', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    NPI Number
                  </label>
                  <input
                    type="text"
                    value={formData.npi}
                    onChange={(e) => handleChange('npi', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Clinic Name
                  </label>
                  <input
                    type="text"
                    value={formData.clinicName}
                    onChange={(e) => handleChange('clinicName', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Clinic Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.clinicPhone}
                    onChange={(e) => handleChange('clinicPhone', e.target.value)}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Program Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-amber-700" />
              </div>
              <h3 className="font-semibold text-neutral-900">Program Information</h3>
            </div>
            
            <div className="space-y-4 pl-10">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Program <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => handleChange('program', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select program...</option>
                  <option value="copay_assistance">Copay Assistance</option>
                  <option value="free_drug">Free Drug Program</option>
                  <option value="patient_support">Patient Support</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Medication
                </label>
                <input
                  type="text"
                  value={formData.medication}
                  onChange={(e) => handleChange('medication', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Diagnosis/Indication
                </label>
                <input
                  type="text"
                  value={formData.diagnosis}
                  onChange={(e) => handleChange('diagnosis', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
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
          Create Case
        </button>
      </div>
    </div>
  );
}
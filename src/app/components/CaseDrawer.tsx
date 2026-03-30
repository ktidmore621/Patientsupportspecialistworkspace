import { X, User, FileText, Building2, Pill, Sparkles, CheckCircle2, Edit3, Clock } from 'lucide-react';
import { Case } from '../types/case';
import { useState } from 'react';

interface CaseDrawerProps {
  case: Case;
  onClose: () => void;
}

export function CaseDrawer({ case: caseData, onClose }: CaseDrawerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [actionDismissed, setActionDismissed] = useState(false);
  const [formData, setFormData] = useState({
    firstName: caseData.patient.firstName,
    lastName: caseData.patient.lastName,
    dateOfBirth: caseData.patient.dateOfBirth,
    phone: caseData.patient.phone || '',
    email: caseData.patient.email || '',
    insuranceType: caseData.insuranceType,
    insuranceVerified: caseData.insuranceVerified,
    hipaaAuthorized: caseData.hipaaAuthorized,
    enrollmentConsent: caseData.enrollmentConsent,
    prescriber: caseData.prescriber || '',
    prescriberNPI: caseData.prescriberNPI || '',
    program: caseData.program,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log('Saving case updates:', formData);
    setIsEditing(false);
  };

  return (
    <div className="w-[600px] h-full bg-white border-l border-neutral-200 shadow-2xl flex-shrink-0 flex flex-col">
      {/* Compact Sticky Action Bar */}
      {!actionDismissed && (
        <div className="flex-shrink-0 bg-[#3b82f6] border-b border-[#3b82f6]">
          <div className="h-14 px-6 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="text-white font-medium text-sm truncate">
                {caseData.nextBestAction.action}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                className="h-9 px-4 bg-white text-[#3b82f6] text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors whitespace-nowrap"
                onClick={() => {/* Take action */}}
              >
                Take Action
              </button>
              <button
                onClick={() => setActionDismissed(true)}
                className="p-1.5 hover:bg-[#3b82f6]/80 rounded transition-colors"
                aria-label="Dismiss action"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="h-16 border-b border-neutral-200 flex items-center justify-between px-6 flex-shrink-0 bg-white sticky" style={{
        top: actionDismissed ? '0' : '56px'
      }}>
        <div className="flex items-center gap-3">
          <h2 className="font-semibold text-neutral-900">Case Details</h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-neutral-600" />
        </button>
      </div>

      {/* Content */}
      <div className="overflow-y-auto h-[calc(100vh-128px)]">
        <div className="p-6 space-y-6">
          {/* Case Header */}
          <div className="space-y-3">
            <div>
              <div className="font-semibold text-neutral-900">
                {caseData.patient.firstName} {caseData.patient.lastName}
              </div>
              <div className="text-sm text-neutral-500">{caseData.id}</div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
                caseData.status === 'active'
                  ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                  : caseData.status === 'temp'
                  ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                  : 'bg-neutral-100 text-neutral-600'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                <span className="capitalize">{caseData.status}</span>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-neutral-100 text-sm text-neutral-600">
                {caseData.daysOpen} days
              </span>
            </div>
          </div>

          {/* AI-Generated Draft */}
          {caseData.nextBestAction.actionType === 'outreach' && !caseData.hipaaAuthorized && (
            <div className="border border-purple-200/60 rounded-xl bg-gradient-to-br from-purple-50/40 to-blue-50/30 p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900">AI-generated draft</h3>
                  <p className="text-sm text-neutral-600">HIPAA Authorization Request</p>
                </div>
              </div>

              <div className="bg-white rounded-lg p-5 border border-neutral-200/60 space-y-3 text-sm text-neutral-800 leading-relaxed">
                <p>Dear {caseData.patient.firstName} {caseData.patient.lastName},</p>
                
                <p>
                  We are reaching out regarding your enrollment in our pap program. 
                  To continue processing your application, we require your signed HIPAA authorization form.
                </p>
                
                <p>
                  This authorization allows us to coordinate with your healthcare providers and insurance company 
                  to ensure you receive the support you need.
                </p>
                
                <p>
                  Please sign and return the attached form at your earliest convenience. If you have any questions, 
                  feel free to reply to this email or call us directly.
                </p>
                
                <div className="pt-2">
                  <p>Best regards,</p>
                  <p className="font-medium text-neutral-900">Sarah Johnson</p>
                  <p className="text-neutral-600">Patient Support Specialist</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 h-11 px-5 bg-[#10b981] hover:bg-[#0ea572] text-white rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Approve & send
                </button>
                <button className="flex-1 h-11 px-5 border border-[#8b8b8e] text-[#8b8b8e] hover:bg-neutral-50 rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                  <Edit3 className="w-4 h-4" />
                  Edit before sending
                </button>
              </div>
            </div>
          )}

          {/* AI Call Summary */}
          {caseData.nextBestAction.actionType === 'outreach' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <h3 className="text-sm font-medium text-purple-900">AI CALL SUMMARY</h3>
              </div>
              <div className="bg-purple-50/40 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-2 text-sm text-neutral-600">
                  <Clock className="w-4 h-4" />
                  <span>Last call: Mar 27 • 8 min</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></span>
                    <span className="text-neutral-800">Insurance confirmed - Aetna PPO commercial plan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0"></span>
                    <span className="text-neutral-800">Prescriber verification complete</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0"></span>
                    <span className="text-neutral-800">HIPAA authorization not yet received</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0"></span>
                    <span className="text-neutral-800">Patient confirmed preferred email contact</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Recent Events */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-neutral-700">RECENT EVENTS</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3">
                <span className="text-neutral-500 whitespace-nowrap">Mar 27 14:32</span>
                <span className="text-neutral-800">Record updated • Insurance verified</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-neutral-500 whitespace-nowrap">Mar 27 14:24</span>
                <span className="text-neutral-800">Call completed • 8 min duration</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-neutral-500 whitespace-nowrap">Mar 26 09:15</span>
                <span className="text-neutral-800">Email sent • HIPAA outreach</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-neutral-500 whitespace-nowrap">Mar 25 16:42</span>
                <span className="text-neutral-800">AI processing • Complete</span>
              </div>
            </div>
          </div>

          {/* Patient Information Section */}
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
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-50 disabled:text-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-50 disabled:text-neutral-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-50 disabled:text-neutral-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-50 disabled:text-neutral-600"
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
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-50 disabled:text-neutral-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Insurance Information Section */}
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
                  Insurance Type
                </label>
                <input
                  type="text"
                  value={formData.insuranceType}
                  onChange={(e) => handleChange('insuranceType', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-50 disabled:text-neutral-600 capitalize"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.insuranceVerified}
                    onChange={(e) => handleChange('insuranceVerified', e.target.checked)}
                    disabled={!isEditing}
                    className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-neutral-700">Insurance Verified</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.hipaaAuthorized}
                    onChange={(e) => handleChange('hipaaAuthorized', e.target.checked)}
                    disabled={!isEditing}
                    className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-neutral-700">HIPAA Authorized</span>
                </label>
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enrollmentConsent}
                    onChange={(e) => handleChange('enrollmentConsent', e.target.checked)}
                    disabled={!isEditing}
                    className="w-4 h-4 text-blue-600 border-neutral-300 rounded focus:ring-blue-500 disabled:opacity-50"
                  />
                  <span className="text-sm text-neutral-700">Enrollment Consent</span>
                </label>
              </div>
            </div>
          </div>

          {/* Provider Information Section */}
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
                    value={formData.prescriber}
                    onChange={(e) => handleChange('prescriber', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-50 disabled:text-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                    NPI Number
                  </label>
                  <input
                    type="text"
                    value={formData.prescriberNPI}
                    onChange={(e) => handleChange('prescriberNPI', e.target.value)}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-50 disabled:text-neutral-600"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Program Information Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                <Pill className="w-4 h-4 text-amber-700" />
              </div>
              <h3 className="font-semibold text-neutral-900">Program Information</h3>
            </div>
            
            <div className="space-y-4 pl-10">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Program
                </label>
                <select
                  value={formData.program}
                  onChange={(e) => handleChange('program', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-neutral-50 disabled:text-neutral-600 capitalize"
                >
                  <option value="copay_assistance">Copay Assistance</option>
                  <option value="free_drug">Free Drug Program</option>
                  <option value="patient_support">Patient Support</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-neutral-200 p-6 bg-neutral-50 flex items-center justify-between sticky bottom-0">
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors"
          >
            Edit Case
          </button>
        ) : (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save Changes
            </button>
          </>
        )}
      </div>
    </div>
  );
}
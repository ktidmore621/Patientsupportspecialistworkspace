import { useParams, Link } from 'react-router';
import { ArrowLeft, CheckCircle2, AlertCircle, Building2, FileText, Phone, Mail, Clock } from 'lucide-react';
import { mockCases } from '../data/mockData';
import { getStatusDisplay, getStatusColor, getProgramDisplay } from '../utils/caseHelpers';
import { useState } from 'react';

export function CaseRecord() {
  const { caseId } = useParams<{ caseId: string }>();
  const caseData = mockCases.find(c => c.id === caseId);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

  if (!caseData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-900 mb-2">Case Not Found</h2>
          <p className="text-neutral-600 mb-4">The case you're looking for doesn't exist.</p>
          <Link to="/cases" className="text-blue-700 hover:text-blue-800 font-medium">
            Back to Cases
          </Link>
        </div>
      </div>
    );
  }

  // Determine action banner color based on case state
  const getActionBannerStyle = () => {
    if (caseData.id === 'PSP-2024-1847') {
      // Maria Rodriguez - green (positive action)
      return {
        border: 'border-l-4 border-[#10b981]',
        bg: 'bg-[#10b981]/5',
        labelColor: 'text-[#10b981]',
        buttonColor: 'bg-[#10b981] hover:bg-[#059669]'
      };
    } else if (caseData.priority === 'urgent') {
      return {
        border: 'border-l-4 border-[#ef4444]',
        bg: 'bg-[#ef4444]/5',
        labelColor: 'text-[#ef4444]',
        buttonColor: 'bg-[#ef4444] hover:bg-[#dc2626]'
      };
    } else if (caseData.priority === 'high') {
      return {
        border: 'border-l-4 border-[#f59e0b]',
        bg: 'bg-[#f59e0b]/5',
        labelColor: 'text-[#f59e0b]',
        buttonColor: 'bg-[#f59e0b] hover:bg-[#d97706]'
      };
    }
    return {
      border: 'border-l-4 border-[#3b82f6]',
      bg: 'bg-[#3b82f6]/5',
      labelColor: 'text-[#3b82f6]',
      buttonColor: 'bg-[#3b82f6] hover:bg-[#2563eb]'
    };
  };

  const actionStyle = getActionBannerStyle();

  return (
    <div className="flex h-full">
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Bar with Breadcrumb */}
        <div className="h-16 border-b border-neutral-200 flex items-center px-6 bg-white sticky top-0 z-10">
          <Link 
            to="/cases"
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Cases</span>
          </Link>
          <span className="mx-2 text-neutral-400">›</span>
          <span className="text-sm font-medium text-neutral-900">
            {caseData.patient.firstName} {caseData.patient.lastName} · {caseData.id}
          </span>
        </div>

        <div className="p-6 space-y-6 max-w-7xl">
          {/* Zone 1 - Next Best Action Banner */}
          <div className={`${actionStyle.border} ${actionStyle.bg} rounded-lg p-6 flex items-center justify-between gap-6`}>
            <div className="flex-1">
              <div className={`text-xs font-bold tracking-wider mb-2 ${actionStyle.labelColor}`}>
                NEXT BEST ACTION
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">
                {caseData.nextBestAction.action}
              </h3>
              <p className="text-sm text-neutral-700 mb-2">
                {caseData.nextBestAction.why}
              </p>
              <p className="text-sm text-neutral-600">
                <span className="font-medium">If delayed:</span> {caseData.nextBestAction.impact}
              </p>
            </div>
            <button 
              onClick={() => setRightPanelOpen(true)}
              className={`${actionStyle.buttonColor} text-white px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors`}
            >
              {caseData.id === 'PSP-2024-1847' ? 'Confirm & Notify' : 'Take Action'}
            </button>
          </div>

          {/* Zone 2 - Case Identity Bar */}
          <div className="flex items-center gap-4 flex-wrap">
            <h1 className="text-2xl font-semibold text-neutral-900">
              {caseData.patient.firstName} {caseData.patient.lastName}
            </h1>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-600">{caseData.id}</span>
            <span className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap ${getStatusColor(caseData.status)}`}>
              {getStatusDisplay(caseData.status)}
            </span>
            <span className="text-neutral-500">•</span>
            <span className="text-sm text-neutral-600">{getProgramDisplay(caseData.program)}</span>
            <span className="text-neutral-500">•</span>
            <span className="text-sm text-neutral-600">Day {caseData.daysOpen}</span>
            <span className="text-neutral-500">•</span>
            <span className="text-sm text-neutral-600">{caseData.assignedTo}</span>
          </div>

          {/* Zone 3 - Critical Blockers */}
          <div className="flex items-center gap-3 text-sm">
            {caseData.blockers.length === 0 ? (
              <>
                <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
                <span className="text-[#10b981] font-medium">Consent gates cleared</span>
                {caseData.id === 'PSP-2024-1847' && (
                  <>
                    <span className="text-neutral-400">•</span>
                    <div className="w-2 h-2 bg-[#10b981] rounded-full"></div>
                    <span className="text-[#10b981] font-medium">PA approved — awaiting confirmation</span>
                  </>
                )}
              </>
            ) : (
              caseData.blockers.map((blocker, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {idx > 0 && <span className="text-neutral-400">•</span>}
                  <div className={`w-2 h-2 rounded-full ${blocker.severity === 'critical' ? 'bg-[#ef4444]' : 'bg-[#f59e0b]'}`}></div>
                  <span className={blocker.severity === 'critical' ? 'text-[#ef4444]' : 'text-[#f59e0b]'}>
                    {blocker.description}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Zone 4 - Key Data Summary */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="text-xs text-neutral-500 mb-1">Insurance</div>
              <div className="text-sm font-medium text-neutral-900 capitalize">
                {caseData.insuranceType === 'commercial' ? 'Aetna PPO · Commercial' : caseData.insuranceType}
              </div>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="text-xs text-neutral-500 mb-1">Program</div>
              <div className="text-sm font-medium text-neutral-900 capitalize">
                {getProgramDisplay(caseData.program)}
              </div>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="text-xs text-neutral-500 mb-1">Prescriber</div>
              <div className="text-sm font-medium text-neutral-900">
                {caseData.prescriber} · NPI verified
              </div>
            </div>
            <div className="p-4 bg-neutral-50 rounded-lg border border-neutral-200">
              <div className="text-xs text-neutral-500 mb-1">Consent</div>
              <div className="text-sm font-medium text-neutral-900">
                {caseData.hipaaAuthorized && caseData.enrollmentConsent && caseData.insuranceVerified 
                  ? 'All gates cleared' 
                  : 'Pending'}
              </div>
            </div>
          </div>

          {/* Below the Fold - Section Cards */}
          <div className="grid grid-cols-3 gap-4">
            {/* Intake Card */}
            <div className="p-5 bg-white border border-[#10b981] rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                <h3 className="font-semibold text-neutral-900">Intake</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-neutral-500">Source:</span>
                  <span className="ml-2 text-neutral-900">{caseData.enrollmentSource}</span>
                </div>
                <div>
                  <span className="text-neutral-500">Received:</span>
                  <span className="ml-2 text-neutral-900">
                    {new Date(caseData.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">Required fields:</span>
                  <span className="ml-2 text-[#10b981] font-medium">All complete</span>
                </div>
                <div>
                  <span className="text-neutral-500">Status:</span>
                  <span className="ml-2 text-[#10b981] font-medium">Complete</span>
                </div>
              </div>
            </div>

            {/* Verification Card */}
            <div className={`p-5 bg-white border rounded-lg ${
              caseData.insuranceVerified && caseData.hipaaAuthorized && caseData.enrollmentConsent
                ? 'border-[#10b981]'
                : 'border-[#f59e0b]'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                {caseData.insuranceVerified && caseData.hipaaAuthorized && caseData.enrollmentConsent ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#f59e0b]" />
                )}
                <h3 className="font-semibold text-neutral-900">Verification</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-neutral-500">Insurance:</span>
                  <span className="ml-2 text-neutral-900">
                    {caseData.insuranceType === 'commercial' ? 'Aetna PPO · Verified' : caseData.insuranceType}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">Coverage:</span>
                  <span className="ml-2 text-neutral-900">Active through 12/31/2026</span>
                </div>
                <div>
                  <span className="text-neutral-500">HIPAA:</span>
                  <span className={`ml-2 font-medium ${caseData.hipaaAuthorized ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                    {caseData.hipaaAuthorized ? 'Received 03/22/2026' : 'Pending'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">Enrollment consent:</span>
                  <span className={`ml-2 font-medium ${caseData.enrollmentConsent ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                    {caseData.enrollmentConsent ? 'Received 03/22/2026' : 'Pending'}
                  </span>
                </div>
              </div>
            </div>

            {/* Eligibility Card */}
            <div className={`p-5 bg-white border rounded-lg ${
              caseData.status === 'active' ? 'border-[#10b981]' : 'border-[#f59e0b]'
            }`}>
              <div className="flex items-center gap-2 mb-4">
                {caseData.status === 'active' ? (
                  <CheckCircle2 className="w-5 h-5 text-[#10b981]" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-[#f59e0b]" />
                )}
                <h3 className="font-semibold text-neutral-900">Eligibility</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-neutral-500">Benefit type:</span>
                  <span className="ml-2 text-neutral-900 capitalize">
                    {caseData.program === 'copay' ? 'Commercial copay assistance' : getProgramDisplay(caseData.program)}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">PA required:</span>
                  <span className="ml-2 text-neutral-900">
                    {caseData.priorAuthStatus ? `Yes — ${caseData.priorAuthStatus} 03/28/2026` : 'No'}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">FPL assessment:</span>
                  <span className="ml-2 text-neutral-900">
                    {caseData.program === 'copay' ? 'Not required for copay' : `${caseData.fplPercentage}% FPL`}
                  </span>
                </div>
                <div>
                  <span className="text-neutral-500">Determination:</span>
                  <span className={`ml-2 font-medium ${caseData.status === 'active' ? 'text-[#10b981]' : 'text-[#f59e0b]'}`}>
                    {caseData.id === 'PSP-2024-1847' ? 'Confirmed — awaiting pharmacy notification' : 'In progress'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Section */}
          <div className="bg-white border border-neutral-200 rounded-lg p-5">
            <h3 className="font-semibold text-neutral-900 mb-4">Documents</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 bg-[#10b981]/5 border border-[#10b981]/20 rounded-lg">
                <FileText className="w-5 h-5 text-[#10b981]" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">Prescription</div>
                  <div className="text-xs text-[#10b981]">Received</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#10b981]/5 border border-[#10b981]/20 rounded-lg">
                <FileText className="w-5 h-5 text-[#10b981]" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">Insurance card</div>
                  <div className="text-xs text-[#10b981]">Received</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#10b981]/5 border border-[#10b981]/20 rounded-lg">
                <FileText className="w-5 h-5 text-[#10b981]" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">HIPAA authorization</div>
                  <div className="text-xs text-[#10b981]">Received</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[#10b981]/5 border border-[#10b981]/20 rounded-lg">
                <FileText className="w-5 h-5 text-[#10b981]" />
                <div className="flex-1">
                  <div className="text-sm font-medium text-neutral-900">Enrollment consent</div>
                  <div className="text-xs text-[#10b981]">Received</div>
                </div>
              </div>
              {caseData.id === 'PSP-2024-1847' && (
                <div className="flex items-center gap-3 p-3 bg-[#10b981]/5 border border-[#10b981]/20 rounded-lg">
                  <FileText className="w-5 h-5 text-[#10b981]" />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-neutral-900">PA approval letter</div>
                    <div className="text-xs text-[#10b981]">Received</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Communication Timeline */}
          <div className="bg-white border border-neutral-200 rounded-lg p-5">
            <h3 className="font-semibold text-neutral-900 mb-4">Communication Timeline</h3>
            <div className="space-y-3">
              {caseData.id === 'PSP-2024-1847' && (
                <div className="flex items-start gap-4 text-sm">
                  <div className="flex items-center gap-2 text-neutral-500 whitespace-nowrap w-32">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Mar 28 16:00</span>
                  </div>
                  <div className="flex-1">
                    <span className="font-medium text-neutral-900">PA approved</span>
                    <span className="text-neutral-600"> · Aetna response received</span>
                  </div>
                </div>
              )}
              <div className="flex items-start gap-4 text-sm">
                <div className="flex items-center gap-2 text-neutral-500 whitespace-nowrap w-32">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Mar 27 14:32</span>
                </div>
                <div className="flex-1">
                  <span className="font-medium text-neutral-900">Record updated</span>
                  <span className="text-neutral-600"> · Insurance verified</span>
                </div>
              </div>
              <div className="flex items-start gap-4 text-sm">
                <div className="flex items-center gap-2 text-neutral-500 whitespace-nowrap w-32">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Mar 27 14:24</span>
                </div>
                <div className="flex-1">
                  <span className="font-medium text-neutral-900">Call completed</span>
                  <span className="text-neutral-600"> · 8 min · {caseData.assignedTo}</span>
                </div>
              </div>
              <div className="flex items-start gap-4 text-sm">
                <div className="flex items-center gap-2 text-neutral-500 whitespace-nowrap w-32">
                  <Mail className="w-3.5 h-3.5" />
                  <span>Mar 26 09:15</span>
                </div>
                <div className="flex-1">
                  <span className="font-medium text-neutral-900">Email sent</span>
                  <span className="text-neutral-600"> · HIPAA outreach</span>
                </div>
              </div>
              <div className="flex items-start gap-4 text-sm">
                <div className="flex items-center gap-2 text-neutral-500 whitespace-nowrap w-32">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Mar 25 16:42</span>
                </div>
                <div className="flex-1">
                  <span className="font-medium text-neutral-900">AI processing complete</span>
                </div>
              </div>
              <div className="flex items-start gap-4 text-sm">
                <div className="flex items-center gap-2 text-neutral-500 whitespace-nowrap w-32">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {new Date(caseData.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} 
                    {' '}
                    {new Date(caseData.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })}
                  </span>
                </div>
                <div className="flex-1">
                  <span className="font-medium text-neutral-900">Case created</span>
                  <span className="text-neutral-600"> · {caseData.enrollmentSource} intake</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      {rightPanelOpen && caseData.id === 'PSP-2024-1847' && (
        <div className="w-[480px] bg-white border-l border-neutral-200 shadow-2xl flex-shrink-0 flex flex-col">
          {/* Header */}
          <div className="h-16 border-b border-neutral-200 flex items-center justify-between px-6">
            <h2 className="font-semibold text-neutral-900">Confirm & Notify</h2>
            <button
              onClick={() => setRightPanelOpen(false)}
              className="p-2 hover:bg-neutral-100 rounded-lg transition-colors text-neutral-600"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Draft Notification */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Pharmacy Notification Draft</h3>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm space-y-3">
                <div>
                  <div className="text-xs text-blue-700 mb-1">To: Specialty Pharmacy</div>
                  <div className="text-xs text-blue-700">Re: Prior Authorization Approval - Maria Rodriguez</div>
                </div>
                <div className="pt-3 border-t border-blue-200 text-neutral-900 space-y-2">
                  <p>Dear Pharmacy Team,</p>
                  <p>This confirms that prior authorization has been <span className="font-semibold">approved</span> for the following patient:</p>
                  <div className="pl-4 space-y-1">
                    <div><span className="font-medium">Patient:</span> Maria Rodriguez</div>
                    <div><span className="font-medium">DOB:</span> 08/15/1967</div>
                    <div><span className="font-medium">Case ID:</span> PSP-2024-1847</div>
                    <div><span className="font-medium">PA Reference:</span> PA-AET-2024-8842</div>
                    <div><span className="font-medium">Approval Date:</span> March 28, 2026</div>
                  </div>
                  <p>You are authorized to dispense medication per the approved prescription.</p>
                  <p>Please contact our office if you need any additional information.</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button className="w-full px-4 py-3 bg-[#10b981] hover:bg-[#059669] text-white font-medium rounded-lg transition-colors">
                Confirm & notify pharmacy
              </button>
              <button className="w-full px-4 py-3 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 font-medium rounded-lg transition-colors">
                Edit before sending
              </button>
            </div>

            {/* AI Call Summary */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">AI Call Summary (Mar 27)</h3>
              <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg text-sm space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-1.5"></div>
                  <p className="text-neutral-700">Patient confirmed insurance coverage is active</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-1.5"></div>
                  <p className="text-neutral-700">HIPAA authorization verbally confirmed and signed form received</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-1.5"></div>
                  <p className="text-neutral-700">Discussed copay assistance program benefits and enrollment</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full mt-1.5"></div>
                  <p className="text-neutral-700">PA submission confirmed — patient awaiting approval notification</p>
                </div>
              </div>
            </div>

            {/* Recent Events */}
            <div>
              <h3 className="text-sm font-semibold text-neutral-900 mb-3">Recent Events</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-neutral-500 whitespace-nowrap">Mar 28 16:00</span>
                  <span className="text-neutral-800">PA approved • Aetna response received</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neutral-500 whitespace-nowrap">Mar 27 14:32</span>
                  <span className="text-neutral-800">Record updated • Insurance verified</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-neutral-500 whitespace-nowrap">Mar 27 14:24</span>
                  <span className="text-neutral-800">Call completed • 8 min duration</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
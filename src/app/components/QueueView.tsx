import { useState } from 'react';
import { AlertCircle, ArrowRight, Clock, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { mockCases, priorityActions, queueMetrics } from '../data/mockData';
import { Case, ActionType } from '../types/case';
import { CaseDrawer } from './CaseDrawer';
import { getStatusLabel, getStatusPillStyle, getDaysOpenColor } from '../utils/caseHelpers';

export function QueueView() {
  const [showAllCases, setShowAllCases] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [expandedActions, setExpandedActions] = useState<Record<string, boolean>>({});

  // Filter cases that need action (excluding those with low priority and no critical blockers)
  const casesNeedingAction = mockCases.filter(c => 
    c.priority === 'urgent' || c.priority === 'high' || c.blockers.length > 0
  );

  // Filter cases in eligibility determination phase
  const eligibilityCases = mockCases.filter(c => 
    c.status === 'in_review' || c.status === 'pending_eligibility'
  );

  const cases = showAllCases ? mockCases : casesNeedingAction;
  const selectedCase = selectedCaseId ? mockCases.find(c => c.id === selectedCaseId) : null;
  const metrics = queueMetrics;
  const formattedDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long',
    month: 'long', 
    day: 'numeric',
    year: 'numeric'
  });

  const handleSelectCase = (caseId: string) => {
    setSelectedCaseId(caseId);
  };

  const handleCloseDrawer = () => {
    setSelectedCaseId(null);
  };

  const toggleActionExpansion = (actionId: string) => {
    setExpandedActions(prev => ({ ...prev, [actionId]: !prev[actionId] }));
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* Main Workspace */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        selectedCase ? 'bg-neutral-50' : 'bg-white'
      }`}>
        <div className={`flex-1 overflow-y-auto transition-all duration-300 ${
          selectedCase ? 'opacity-90 scale-[0.98]' : 'opacity-100 scale-100'
        }`}>
          {/* Status Bar */}
          <div className="h-14 border-b border-neutral-200 bg-white flex items-center px-8 justify-between flex-shrink-0">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-neutral-600">My Queue</span>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-500">{formattedDate}</span>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm">
                  <span className="font-semibold text-neutral-900">{metrics.needsActionToday}</span>
                  <span className="text-neutral-600"> Need action today</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-sm">
                  <span className="font-semibold text-neutral-900">{metrics.stalledOrAtRisk}</span>
                  <span className="text-neutral-600"> At risk</span>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-500" />
                <span className="text-sm">
                  <span className="font-semibold text-neutral-900">{metrics.awaitingOutreach}</span>
                  <span className="text-neutral-600"> Awaiting outreach</span>
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 py-6">
            <div className={`transition-all duration-300 ${selectedCase ? 'max-w-5xl' : 'max-w-6xl'}`}>
              {/* Priority Actions */}
              <div className="mb-8">
                <h2 className="mb-4">Priority Actions</h2>
                
                <div className="space-y-3">
                  {priorityActions.map((action) => {
                    const isExpanded = expandedActions[action.id];
                    const caseData = action.case;
                    
                    return (
                      <div
                        key={action.id}
                        className="bg-white border border-neutral-200 rounded-xl overflow-hidden transition-all hover:shadow-sm"
                      >
                        <div className="flex items-start gap-4 p-4">
                          {/* Priority Indicator - Unified Amber for attention */}
                          <div className="flex-shrink-0 mt-1">
                            <div className={`w-1.5 h-10 rounded-full ${
                              caseData.priority === 'urgent'
                                ? 'bg-[#ef4444]'
                                : 'bg-[#f59e0b]'
                            }`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            {/* Main Row */}
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1 min-w-0">
                                <h3 className="text-neutral-900 font-medium mb-0.5">
                                  {action.action}
                                </h3>
                                <p className="text-sm text-neutral-600 line-clamp-2">
                                  {action.reasoning}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 flex-shrink-0">
                                <button
                                  onClick={() => handleSelectCase(caseData.id)}
                                  style={{ width: '160px' }}
                                  className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                                    caseData.nextBestAction.actionType === 'confirm'
                                      ? 'bg-[#10b981] hover:bg-[#0ea572] text-white'
                                      : caseData.nextBestAction.actionType === 'review'
                                      ? 'border border-[#8b8b8e] text-[#8b8b8e] hover:bg-neutral-50'
                                      : 'bg-[#10b981] hover:bg-[#0ea572] text-white'
                                  }`}
                                >
                                  {action.actionButton}
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleActionExpansion(action.id);
                                  }}
                                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                                >
                                  {isExpanded ? (
                                    <ChevronUp className="w-4 h-4 text-neutral-600" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4 text-neutral-600" />
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Expanded Details */}
                            {isExpanded && (
                              <div className="mt-4 pt-4 border-t border-neutral-200 space-y-3">
                                <div>
                                  <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-1.5">
                                    Why This Matters
                                  </h4>
                                  <p className="text-sm text-neutral-800">
                                    {action.impact}
                                  </p>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 pt-2">
                                  <div>
                                    <div className="text-xs text-neutral-500 mb-1">Case ID</div>
                                    <div className="text-sm font-medium text-neutral-900">{caseData.id}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-neutral-500 mb-1">Days Open</div>
                                    <div className={`text-sm font-medium ${
                                      caseData.daysOpen > 10 ? 'text-red-700' : 
                                      caseData.daysOpen > 5 ? 'text-amber-700' : 
                                      'text-neutral-900'
                                    }`}>
                                      {caseData.daysOpen} days
                                    </div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-neutral-500 mb-1">Program</div>
                                    <div className="text-sm font-medium text-neutral-900 capitalize">
                                      {caseData.program.replace('_', ' ')}
                                    </div>
                                  </div>
                                </div>

                                {caseData.blockers.length > 0 && (
                                  <div className="pt-2">
                                    <h4 className="text-xs font-semibold text-neutral-700 uppercase tracking-wide mb-2">
                                      Blockers
                                    </h4>
                                    <div className="space-y-1.5">
                                      {caseData.blockers.map((blocker, idx) => (
                                        <div key={idx} className="flex items-center gap-2 text-sm">
                                          <AlertCircle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                                          <span className="text-amber-900">{blocker.description}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Cases Table */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2>Cases</h2>
                  <button className="text-sm text-blue-700 hover:text-blue-800 font-medium">
                    Show all cases →
                  </button>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-200">
                        <th className="text-left px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Patient
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Next Action
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Blocker
                        </th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Days Open
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Program
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {cases.map((caseItem) => (
                        <tr
                          key={caseItem.id}
                          onClick={() => handleSelectCase(caseItem.id)}
                          className={`cursor-pointer transition-colors ${
                            caseItem.id === selectedCase?.id
                              ? 'bg-blue-50'
                              : 'hover:bg-neutral-50'
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="text-sm font-medium text-neutral-900">
                              {caseItem.patient.firstName} {caseItem.patient.lastName}
                            </div>
                            <div className="text-xs text-neutral-500">{caseItem.id}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${
                                caseItem.status === 'active'
                                  ? 'bg-[#3b82f6]/10 text-[#3b82f6]'
                                  : caseItem.status === 'temp'
                                  ? 'bg-[#f59e0b]/10 text-[#f59e0b]'
                                  : 'bg-neutral-100 text-neutral-600'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                              <span className="capitalize">{caseItem.status}</span>
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="text-sm text-neutral-900">
                              {caseItem.nextBestAction.action}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            {caseItem.blockers.length > 0 ? (
                              <div className="flex items-center gap-1.5">
                                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                <span className="text-sm text-amber-900">
                                  {caseItem.blockers[0].description}
                                </span>
                              </div>
                            ) : (
                              <span className="text-xs text-neutral-400">None</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span
                              className={`text-sm font-medium ${
                                caseItem.daysOpen > 10
                                  ? 'text-red-700'
                                  : caseItem.daysOpen > 5
                                  ? 'text-amber-700'
                                  : 'text-neutral-700'
                              }`}
                            >
                              {caseItem.daysOpen}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className="text-sm text-neutral-600 capitalize">
                              {caseItem.program.replace('_', ' ')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Eligibility Determination Cases Table */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2>Eligibility Determination</h2>
                  <span className="text-sm text-neutral-500">
                    {eligibilityCases.length} {eligibilityCases.length === 1 ? 'case' : 'cases'}
                  </span>
                </div>

                <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-200">
                        <th className="text-left px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Patient
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Next Action
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Blocker
                        </th>
                        <th className="text-right px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Days Open
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-medium text-neutral-600 uppercase tracking-wide">
                          Program
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {eligibilityCases.length > 0 ? (
                        eligibilityCases.map((caseItem) => (
                          <tr
                            key={caseItem.id}
                            onClick={() => handleSelectCase(caseItem.id)}
                            className={`cursor-pointer transition-colors ${
                              caseItem.id === selectedCase?.id
                                ? 'bg-blue-50'
                                : 'hover:bg-neutral-50'
                            }`}
                          >
                            <td className="px-4 py-3">
                              <div className="text-sm font-medium text-neutral-900">
                                {caseItem.patient.firstName} {caseItem.patient.lastName}
                              </div>
                              <div className="text-xs text-neutral-500">{caseItem.id}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-purple-50 text-purple-700">
                                <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                                <span>In Review</span>
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-neutral-900">
                                {caseItem.nextBestAction.action}
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              {caseItem.blockers.length > 0 ? (
                                <div className="flex items-center gap-1.5">
                                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                                  <span className="text-sm text-amber-900">
                                    {caseItem.blockers[0].description}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-xs text-neutral-400">None</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-right">
                              <span
                                className={`text-sm font-medium ${
                                  caseItem.daysOpen > 10
                                    ? 'text-red-700'
                                    : caseItem.daysOpen > 5
                                    ? 'text-amber-700'
                                    : 'text-neutral-700'
                                }`}
                              >
                                {caseItem.daysOpen}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-sm text-neutral-600 capitalize">
                                {caseItem.program.replace('_', ' ')}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-4 py-8 text-center text-sm text-neutral-500">
                            No cases in eligibility determination phase
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Drawer */}
      {selectedCase && (
        <CaseDrawer case={selectedCase} onClose={handleCloseDrawer} />
      )}
    </div>
  );
}
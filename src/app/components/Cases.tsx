import { useState } from 'react';
import { Filter, Download, Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import { mockCases } from '../data/mockData';
import { CaseDrawer } from './CaseDrawer';
import { getNBAChipStyle, getNBAChipLabel, getDaysOpenColor, getStatusLabel, getStatusPillStyle } from '../utils/caseHelpers';
import { Tooltip, TooltipTrigger, TooltipContent } from './ui/tooltip';

export function Cases() {
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [programFilter, setProgramFilter] = useState<string>('all');

  const selectedCase = selectedCaseId ? mockCases.find(c => c.id === selectedCaseId) : null;

  const filteredCases = mockCases.filter(c => {
    const matchesSearch = searchQuery === '' || 
      c.patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.patient.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    const matchesProgram = programFilter === 'all' || c.program === programFilter;
    
    return matchesSearch && matchesStatus && matchesProgram;
  });

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <div className="flex min-h-full">
        <div className={`flex-1 transition-all duration-300 ${
          selectedCaseId ? 'bg-neutral-50' : 'bg-white'
        }`}>
          <div className={`transition-all duration-300 ${
            selectedCaseId ? 'opacity-90 scale-[0.98]' : 'opacity-100 scale-100'
          }`}>
            {/* Header */}
            <div className="border-b border-neutral-200 bg-white px-8 py-6">
              <div className="max-w-7xl">
                <h1 className="mb-2">Cases</h1>
                <p className="text-neutral-600">
                  Comprehensive case data with advanced filtering and reporting
                </p>
              </div>
            </div>

            {/* Filters & Actions Bar */}
            <div className="bg-white border-b border-neutral-200 px-8 py-4">
              <div className="max-w-7xl flex items-center gap-3">
                {/* Search */}
                <div className="flex-1 max-w-md relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or case ID..."
                    className="w-full pl-10 pr-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Status Filter */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="appearance-none pl-3 pr-9 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="temp">Temporary</option>
                    <option value="closed">Closed</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                </div>

                {/* Program Filter */}
                <div className="relative">
                  <select
                    value={programFilter}
                    onChange={(e) => setProgramFilter(e.target.value)}
                    className="appearance-none pl-3 pr-9 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
                  >
                    <option value="all">All Programs</option>
                    <option value="copay_assistance">Copay Assistance</option>
                    <option value="free_drug">Free Drug</option>
                    <option value="patient_support">Patient Support</option>
                  </select>
                  <ChevronDown className="absolute right-2.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500 pointer-events-none" />
                </div>

                {/* Export */}
                <button className="px-4 py-2 border border-neutral-300 text-neutral-700 hover:bg-neutral-50 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="bg-neutral-50 px-8 py-3 border-b border-neutral-200">
              <div className="max-w-7xl">
                <p className="text-sm text-neutral-600">
                  Showing <span className="font-medium text-neutral-900">{filteredCases.length}</span> of{' '}
                  <span className="font-medium text-neutral-900">{mockCases.length}</span> cases
                </p>
              </div>
            </div>

            {/* Data Table */}
            <div className="px-8 py-6">
              <div className="max-w-7xl">
                <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-neutral-50 border-b border-neutral-200">
                        <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                          Case ID
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                          Patient
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                          Status
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                          Program
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                          Days Open
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                          Next Action
                        </th>
                        <th className="text-left px-4 py-3 text-xs font-semibold text-neutral-700 uppercase tracking-wide">
                          Blockers
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200">
                      {filteredCases.map((caseItem) => (
                        <tr
                          key={caseItem.id}
                          className={`transition-colors ${
                            caseItem.id === selectedCaseId
                              ? 'bg-blue-50'
                              : 'hover:bg-neutral-50'
                          }`}
                        >
                          <td className="px-4 py-3">
                            <Link 
                              to={`/cases/${caseItem.id}`}
                              className="text-sm font-mono text-blue-700 hover:text-blue-900 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {caseItem.id}
                            </Link>
                          </td>
                          <td 
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => setSelectedCaseId(caseItem.id)}
                          >
                            <div>
                              <p className="text-sm font-medium text-neutral-900">
                                {caseItem.patient.firstName} {caseItem.patient.lastName}
                              </p>
                              <p className="text-xs text-neutral-600">
                                {caseItem.patient.phone}
                              </p>
                            </div>
                          </td>
                          <td 
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => setSelectedCaseId(caseItem.id)}
                          >
                            <span className={`inline-flex px-2 py-1 rounded-md border text-xs font-medium capitalize ${
                              caseItem.status === 'active'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : caseItem.status === 'temp'
                                ? 'bg-amber-50 text-amber-700 border-amber-200'
                                : 'bg-neutral-50 text-neutral-600 border-neutral-200'
                            }`}>
                              {caseItem.status}
                            </span>
                          </td>
                          <td 
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => setSelectedCaseId(caseItem.id)}
                          >
                            <span className="text-sm text-neutral-700 capitalize">
                              {caseItem.program.replace('_', ' ')}
                            </span>
                          </td>
                          <td 
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => setSelectedCaseId(caseItem.id)}
                          >
                            <span className={`text-sm font-medium ${getDaysOpenColor(caseItem.daysOpen)}`}>
                              {caseItem.daysOpen}
                            </span>
                          </td>
                          <td 
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => setSelectedCaseId(caseItem.id)}
                          >
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${getNBAChipStyle(caseItem.nextBestAction.actionType)}`}>
                              {getNBAChipLabel(caseItem.nextBestAction.actionType)}
                            </span>
                          </td>
                          <td 
                            className="px-4 py-3 cursor-pointer"
                            onClick={() => setSelectedCaseId(caseItem.id)}
                          >
                            {caseItem.blockers.length > 0 ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs font-medium cursor-help">
                                    {caseItem.blockers.length}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs bg-neutral-900 text-white">
                                  <div className="space-y-1">
                                    {caseItem.blockers.map((blocker, idx) => (
                                      <div key={idx} className="text-xs">
                                        {blocker.description}
                                      </div>
                                    ))}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                <span className="text-xs text-neutral-500">None</span>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {filteredCases.length === 0 && (
                    <div className="py-12 text-center">
                      <Filter className="w-8 h-8 text-neutral-300 mx-auto mb-2" />
                      <p className="text-sm text-neutral-600">No cases match your filters</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Drawer */}
        {selectedCase && (
          <CaseDrawer case={selectedCase} onClose={() => setSelectedCaseId(null)} />
        )}
      </div>
    </div>
  );
}

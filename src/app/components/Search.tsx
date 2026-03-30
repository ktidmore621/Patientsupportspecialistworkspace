import { useState } from 'react';
import { Search as SearchIcon, User, FileText, Calendar } from 'lucide-react';
import { mockCases } from '../data/mockData';
import { CaseDrawer } from './CaseDrawer';

export function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(mockCases);
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(null);

  const selectedCase = selectedCaseId ? mockCases.find(c => c.id === selectedCaseId) : null;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults(mockCases);
      return;
    }

    const filtered = mockCases.filter(c => {
      const searchLower = query.toLowerCase();
      return (
        c.id.toLowerCase().includes(searchLower) ||
        c.patient.firstName.toLowerCase().includes(searchLower) ||
        c.patient.lastName.toLowerCase().includes(searchLower) ||
        c.patient.phone?.includes(query) ||
        c.patient.email?.toLowerCase().includes(searchLower)
      );
    });

    setSearchResults(filtered);
  };

  const handleCaseClick = (caseId: string) => {
    setSelectedCaseId(caseId);
  };

  const handleCloseDrawer = () => {
    setSelectedCaseId(null);
  };

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden">
      <div className="flex min-h-full">
        <div className={`flex-1 transition-all duration-300 ${
          selectedCaseId ? 'bg-neutral-50' : 'bg-white'
        }`}>
          <div className={`max-w-5xl mx-auto p-8 transition-all duration-300 ${
            selectedCaseId ? 'opacity-90 scale-[0.98]' : 'opacity-100 scale-100'
          }`}>
            <div className="mb-8">
              <h1 className="mb-2">Search Cases</h1>
              <p className="text-neutral-600">
                Search by patient name, case ID, phone, or email
              </p>
            </div>

            {/* Search Input */}
            <div className="mb-8">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search cases..."
                  className="w-full pl-12 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Results */}
            <div>
              <div className="mb-4">
                <p className="text-sm text-neutral-600">
                  {searchResults.length} {searchResults.length === 1 ? 'case' : 'cases'} found
                </p>
              </div>

              <div className="space-y-4">
                {searchResults.map((caseItem) => (
                  <button
                    key={caseItem.id}
                    onClick={() => handleCaseClick(caseItem.id)}
                    className={`block w-full bg-white rounded-lg border p-6 hover:border-blue-300 hover:shadow-md transition-all text-left ${
                      caseItem.id === selectedCaseId ? 'border-blue-300 bg-blue-50/50' : 'border-neutral-200'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-neutral-900 mb-1">
                          {caseItem.patient.firstName} {caseItem.patient.lastName}
                        </h3>
                        <p className="text-sm text-neutral-600">{caseItem.id}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-md border text-sm capitalize ${
                        caseItem.status === 'active'
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : caseItem.status === 'temp'
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-neutral-50 text-neutral-600 border-neutral-200'
                      }`}>
                        {caseItem.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-neutral-600" />
                        <span className="text-neutral-700">{caseItem.patient.phone || 'No phone'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-neutral-600" />
                        <span className="text-neutral-700 capitalize">
                          {caseItem.program.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-neutral-600" />
                        <span className="text-neutral-700">{caseItem.daysOpen} days open</span>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-neutral-200">
                      <p className="text-sm text-neutral-600">
                        Next action: <span className="text-neutral-900">{caseItem.nextBestAction.action}</span>
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {searchResults.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
                  <SearchIcon className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-neutral-900 mb-2">No cases found</h3>
                  <p className="text-neutral-600">
                    Try adjusting your search terms or check for typos
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Drawer */}
        {selectedCase && (
          <CaseDrawer case={selectedCase} onClose={handleCloseDrawer} />
        )}
      </div>
    </div>
  );
}
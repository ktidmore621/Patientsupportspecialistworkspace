import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Search, FileText, Phone, Mail, Upload, UserPlus, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { mockCases } from '../data/mockData';
import { Case } from '../types/case';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onExecuteAction: (actionId: string) => void;
}

interface QuickAction {
  id: string;
  label: string;
  icon: React.ElementType;
  type: 'action';
  keywords: string[];
}

interface SearchResult {
  id: string;
  label: string;
  sublabel?: string;
  icon: React.ElementType;
  type: 'case' | 'document' | 'communication' | 'contact' | 'action';
  data?: any;
}

const quickActions: QuickAction[] = [
  { id: 'new-intake', label: 'New Intake', icon: UserPlus, type: 'action', keywords: ['new', 'intake', 'create', 'add', 'patient'] },
  { id: 'upload-doc', label: 'Upload Document', icon: Upload, type: 'action', keywords: ['upload', 'document', 'file', 'attach'] },
  { id: 'log-call', label: 'Log Call', icon: Phone, type: 'action', keywords: ['log', 'call', 'phone', 'contact'] },
  { id: 'send-email', label: 'Send Email Outreach', icon: Mail, type: 'action', keywords: ['email', 'send', 'outreach', 'message'] },
];

export function CommandPalette({ isOpen, onClose, onExecuteAction }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Reset state when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const allResults = getAllResults();
      
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % allResults.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + allResults.length) % allResults.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = allResults[selectedIndex];
        if (selected) {
          handleSelect(selected);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, query]);

  // Auto-scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selectedElement = resultsRef.current.querySelector(`[data-index="${selectedIndex}"]`);
      selectedElement?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const getAllResults = (): SearchResult[] => {
    if (!query) {
      // Default state: show recent, quick actions, suggested
      return [
        ...quickActions.map(action => ({
          id: action.id,
          label: action.label,
          icon: action.icon,
          type: 'action' as const,
        })),
        // Recent cases (first 3)
        ...mockCases.slice(0, 3).map(c => ({
          id: c.id,
          label: `${c.patient.firstName} ${c.patient.lastName}`,
          sublabel: `${c.id} • ${c.daysOpen} days open`,
          icon: FileText,
          type: 'case' as const,
          data: c,
        })),
      ];
    }

    // Typed state: filter and group results
    const results: SearchResult[] = [];
    const lowerQuery = query.toLowerCase();

    // Match actions
    quickActions.forEach(action => {
      if (
        action.label.toLowerCase().includes(lowerQuery) ||
        action.keywords.some(k => k.includes(lowerQuery))
      ) {
        results.push({
          id: action.id,
          label: action.label,
          icon: action.icon,
          type: 'action',
        });
      }
    });

    // Match cases
    mockCases.forEach(c => {
      const fullName = `${c.patient.firstName} ${c.patient.lastName}`.toLowerCase();
      const caseId = c.id.toLowerCase();
      
      if (fullName.includes(lowerQuery) || caseId.includes(lowerQuery)) {
        results.push({
          id: c.id,
          label: `${c.patient.firstName} ${c.patient.lastName}`,
          sublabel: `${c.id} • ${c.daysOpen} days open`,
          icon: FileText,
          type: 'case',
          data: c,
        });
      }
    });

    // Mock documents (if query matches)
    if (lowerQuery.includes('hipaa') || lowerQuery.includes('document') || lowerQuery.includes('form')) {
      results.push({
        id: 'doc-1',
        label: 'HIPAA_Authorization.pdf',
        sublabel: 'Uploaded 2 days ago',
        icon: FileText,
        type: 'document',
      });
    }

    // Mock communications
    if (lowerQuery.includes('email') || lowerQuery.includes('outreach') || lowerQuery.includes('message')) {
      results.push({
        id: 'comm-1',
        label: 'Email – HIPAA Request',
        sublabel: 'Sent Mar 27',
        icon: Mail,
        type: 'communication',
      });
    }

    return results;
  };

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'case') {
      navigate('/');
      onClose();
    } else if (result.type === 'action') {
      // Handle action execution
      onExecuteAction(result.id);
      onClose();
    } else {
      // Handle other types
      console.log('Open:', result.type, result.id);
      onClose();
    }
  };

  const getGroupedResults = () => {
    const results = getAllResults();
    
    if (!query) {
      // Default state grouping
      return {
        'Quick Actions': results.filter(r => r.type === 'action').slice(0, 4),
        'Recent': results.filter(r => r.type === 'case').slice(0, 3),
      };
    }

    // Typed state grouping
    const grouped: Record<string, SearchResult[]> = {};
    
    const actions = results.filter(r => r.type === 'action');
    const cases = results.filter(r => r.type === 'case');
    const documents = results.filter(r => r.type === 'document');
    const communications = results.filter(r => r.type === 'communication');
    const contacts = results.filter(r => r.type === 'contact');

    if (actions.length > 0) grouped['Actions'] = actions.slice(0, 3);
    if (cases.length > 0) grouped['Cases'] = cases.slice(0, 5);
    if (documents.length > 0) grouped['Documents'] = documents.slice(0, 5);
    if (communications.length > 0) grouped['Communications'] = communications.slice(0, 5);
    if (contacts.length > 0) grouped['Contacts'] = contacts.slice(0, 5);

    return grouped;
  };

  const getSuggestedActions = () => {
    if (query) return [];
    
    // Mock suggested actions based on context
    return [
      { id: 'suggest-1', label: 'Continue Thomas Anderson case', icon: Sparkles, sublabel: 'HIPAA pending' },
      { id: 'suggest-2', label: 'Finish HIPAA outreach', icon: Mail, sublabel: '3 cases waiting' },
    ];
  };

  if (!isOpen) return null;

  const groupedResults = getGroupedResults();
  const suggested = getSuggestedActions();
  const allResults = getAllResults();

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm" />
      
      {/* Command Palette */}
      <div 
        className="relative w-full max-w-[680px] bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400 flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or run a command…"
            className="flex-1 outline-none text-neutral-900 placeholder:text-neutral-400"
          />
          <kbd className="hidden sm:block px-2 py-1 text-xs text-neutral-500 bg-neutral-100 rounded">
            Esc
          </kbd>
        </div>

        {/* Results */}
        <div 
          ref={resultsRef}
          className="max-h-[480px] overflow-y-auto overscroll-contain"
        >
          {/* Grouped Results */}
          <div className="py-2">
            {Object.entries(groupedResults).map(([groupName, items], groupIndex) => (
              <div key={groupName}>
                <div className="px-4 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                  {groupName}
                </div>
                {items.map((item, itemIndex) => {
                  const flatIndex = Object.entries(groupedResults)
                    .slice(0, groupIndex)
                    .reduce((acc, [_, items]) => acc + items.length, 0) + itemIndex;
                  
                  return (
                    <ResultItem
                      key={item.id}
                      result={item}
                      isSelected={flatIndex === selectedIndex}
                      onClick={() => handleSelect(item)}
                      dataIndex={flatIndex}
                      query={query}
                    />
                  );
                })}
              </div>
            ))}

            {/* Suggested Actions (default state only) */}
            {suggested.length > 0 && (
              <div>
                <div className="px-4 py-2 text-xs font-medium text-neutral-500 uppercase tracking-wide">
                  Suggested
                </div>
                {suggested.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-neutral-50 cursor-pointer transition-colors"
                    onClick={onClose}
                  >
                    <item.icon className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-neutral-900">{item.label}</div>
                      {item.sublabel && (
                        <div className="text-xs text-neutral-500">{item.sublabel}</div>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-neutral-400" />
                  </div>
                ))}
              </div>
            )}

            {/* Empty state */}
            {allResults.length === 0 && query && (
              <div className="px-4 py-12 text-center">
                <p className="text-sm text-neutral-500">No results found for "{query}"</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 px-5 py-3 border-t border-neutral-200 bg-neutral-50/50 text-xs text-neutral-500">
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded text-[10px]">↑</kbd>
            <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded text-[10px]">↓</kbd>
            <span>Navigate</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded text-[10px]">↵</kbd>
            <span>Select</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white border border-neutral-300 rounded text-[10px]">Esc</kbd>
            <span>Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ResultItemProps {
  result: SearchResult;
  isSelected: boolean;
  onClick: () => void;
  dataIndex: number;
  query: string;
}

function ResultItem({ result, isSelected, onClick, dataIndex, query }: ResultItemProps) {
  const Icon = result.icon;
  
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const index = text.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return text;
    
    return (
      <>
        {text.slice(0, index)}
        <mark className="bg-blue-200/60 text-neutral-900">{text.slice(index, index + query.length)}</mark>
        {text.slice(index + query.length)}
      </>
    );
  };

  return (
    <div
      data-index={dataIndex}
      className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
        isSelected ? 'bg-blue-50' : 'hover:bg-neutral-50'
      }`}
      onClick={onClick}
    >
      <Icon className={`w-4 h-4 flex-shrink-0 ${
        result.type === 'action' ? 'text-blue-600' : 'text-neutral-600'
      }`} />
      <div className="flex-1 min-w-0">
        <div className="text-sm text-neutral-900 truncate">
          {highlightMatch(result.label, query)}
        </div>
        {result.sublabel && (
          <div className="text-xs text-neutral-500 truncate">{result.sublabel}</div>
        )}
      </div>
      {result.type === 'action' && (
        <ArrowRight className="w-4 h-4 text-neutral-400 flex-shrink-0" />
      )}
    </div>
  );
}
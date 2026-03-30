import { Link, useLocation } from 'react-router';
import { Home, FileText, BarChart3, ChevronLeft, ChevronRight } from 'lucide-react';

interface LeftNavProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

export function LeftNav({ isCollapsed, onToggleCollapse }: LeftNavProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Queue', icon: Home },
    { path: '/cases', label: 'Cases', icon: FileText },
    { path: '/reports', label: 'Reports', icon: BarChart3 },
  ];

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <nav className={`bg-white border-r border-neutral-200 flex flex-col transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-neutral-200 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h1 className="font-semibold text-neutral-900">PSP Workspace</h1>
            <p className="text-xs text-neutral-600">Sarah Mitchell</p>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 hover:bg-neutral-100 rounded-md transition-colors"
          aria-label={isCollapsed ? 'Expand navigation' : 'Collapse navigation'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-neutral-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-neutral-600" />
          )}
        </button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 transition-colors relative ${
                active
                  ? 'bg-white text-neutral-900 border-l-[3px] border-l-[#f89c27] font-semibold'
                  : 'text-neutral-700 hover:bg-neutral-50'
              } ${isCollapsed ? 'justify-center' : ''}`}
              title={isCollapsed ? item.label : undefined}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${active ? 'text-[#f89c27]' : 'text-neutral-600'}`} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-neutral-200">
        {!isCollapsed ? (
          <div className="text-xs text-neutral-500">
            <p>Active Cases: 24</p>
            <p>Action Required: 4</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <span className="text-xs font-semibold text-neutral-700">24</span>
            <span className="text-xs text-neutral-500">4</span>
          </div>
        )}
      </div>
    </nav>
  );
}
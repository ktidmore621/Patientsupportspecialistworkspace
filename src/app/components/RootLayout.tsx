import { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { LeftNav } from './LeftNav';
import { CommandPalette } from './CommandPalette';
import { UniversalDrawer } from './UniversalDrawer';
import { Search, Command, Plus } from 'lucide-react';

export type DrawerContent = 
  | { type: 'none' }
  | { type: 'intake' }
  | { type: 'upload' }
  | { type: 'call' }
  | { type: 'email' };

export function RootLayout() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [drawerContent, setDrawerContent] = useState<DrawerContent>({ type: 'none' });
  const navigate = useNavigate();

  // Listen for ⌘K / Ctrl+K globally
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCommandAction = (actionId: string) => {
    setCommandPaletteOpen(false);
    
    // Execute actions in-place using drawer
    switch (actionId) {
      case 'new-intake':
        setDrawerContent({ type: 'intake' });
        break;
      case 'upload-doc':
        setDrawerContent({ type: 'upload' });
        break;
      case 'log-call':
        setDrawerContent({ type: 'call' });
        break;
      case 'send-email':
        setDrawerContent({ type: 'email' });
        break;
    }
  };

  const handleCloseDrawer = () => {
    setDrawerContent({ type: 'none' });
  };

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Left Navigation Panel */}
      <LeftNav 
        isCollapsed={isNavCollapsed} 
        onToggleCollapse={() => setIsNavCollapsed(!isNavCollapsed)}
      />

      {/* Main Content Area with Top Command Bar */}
      <div className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ${
        drawerContent.type !== 'none' ? 'mr-[600px]' : ''
      }`}>
        {/* Top Command Bar */}
        <div className="h-20 bg-white border-b border-neutral-200 flex items-center px-6 gap-3 flex-shrink-0">
          {/* Enhanced Search Bar (Command Surface) */}
          <div 
            className="flex-1 max-w-2xl h-14 relative group cursor-pointer bg-neutral-50 border border-neutral-300 rounded-xl hover:bg-neutral-100 hover:border-neutral-400 transition-all"
            onClick={() => setCommandPaletteOpen(true)}
          >
            <div className="absolute inset-0 flex items-center px-4 gap-3">
              <Search className="w-5 h-5 text-neutral-400 group-hover:text-neutral-600 transition-colors flex-shrink-0" />
              <input
                type="text"
                readOnly
                placeholder="Search cases, documents, or run a command…"
                className="flex-1 bg-transparent text-neutral-600 placeholder:text-neutral-500 cursor-pointer focus:outline-none"
                onFocus={(e) => {
                  e.target.blur();
                  setCommandPaletteOpen(true);
                }}
              />
              {/* Keycap Hint */}
              <div className="hidden sm:flex items-center gap-1 text-xs text-neutral-500">
                <kbd className="px-2 py-1 bg-white border border-neutral-300 rounded shadow-sm font-medium">
                  ⌘K
                </kbd>
              </div>
            </div>
          </div>

          {/* Right Cluster: Command Button + New Intake */}
          <div className="flex items-center gap-2">
            {/* Command Icon Button (Supporting) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="h-14 w-14 flex items-center justify-center hover:bg-neutral-100 rounded-xl transition-colors group"
              title="Open command menu (⌘K)"
            >
              <Command className="w-5 h-5 text-neutral-500 group-hover:text-neutral-700" />
            </button>

            {/* New Intake Button (Primary Action) */}
            <button
              className="h-14 px-5 bg-[#f89c27] hover:bg-[#e88d1f] text-white font-medium rounded-xl transition-colors flex items-center gap-2.5 whitespace-nowrap shadow-sm"
              onClick={() => setDrawerContent({ type: 'intake' })}
            >
              <Plus className="w-5 h-5" />
              New Intake
            </button>
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 overflow-hidden">
          <Outlet context={{ drawerContent, setDrawerContent }} />
        </main>
      </div>

      {/* Command Palette */}
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)}
        onExecuteAction={handleCommandAction}
      />

      {/* Universal Drawer */}
      <UniversalDrawer 
        content={drawerContent}
        onClose={handleCloseDrawer}
      />
    </div>
  );
}
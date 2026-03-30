import { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { DrawerContent } from './RootLayout';
import { IntakeSelection } from './drawer/IntakeSelection';
import { CallCenterIntake } from './intake/CallCenterIntake';
import { DocumentUploadIntake } from './intake/DocumentUploadIntake';
import { ManualEntryIntake } from './intake/ManualEntryIntake';
import { LogCallFlow } from './drawer/LogCallFlow';
import { SendEmailFlow } from './drawer/SendEmailFlow';

interface UniversalDrawerProps {
  content: DrawerContent;
  onClose: () => void;
}

type IntakeType = 'call' | 'document' | 'email' | 'manual' | null;

export function UniversalDrawer({ content, onClose }: UniversalDrawerProps) {
  const [selectedIntake, setSelectedIntake] = useState<IntakeType>(null);

  const isOpen = content.type !== 'none';

  // Reset intake selection when drawer closes or content changes
  useEffect(() => {
    if (!isOpen) {
      setSelectedIntake(null);
    }
  }, [isOpen]);

  const handleBack = () => {
    setSelectedIntake(null);
  };

  const getTitle = () => {
    if (content.type === 'intake') {
      if (selectedIntake === 'call') return 'Call Center';
      if (selectedIntake === 'document') return 'Document Upload';
      if (selectedIntake === 'email') return 'Email Forward';
      if (selectedIntake === 'manual') return 'Manual Entry';
      return 'New Intake';
    }
    if (content.type === 'upload') return 'Upload Document';
    if (content.type === 'call') return 'Log Call';
    if (content.type === 'email') return 'Send Email Outreach';
    return '';
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed top-0 right-0 h-full w-[600px] bg-white border-l border-neutral-200 shadow-2xl transition-transform duration-300 z-30 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      {/* Header */}
      <div className="h-16 border-b border-neutral-200 flex items-center justify-between px-6 flex-shrink-0 bg-white">
        <div className="flex items-center gap-3">
          {selectedIntake && content.type === 'intake' && (
            <button
              onClick={handleBack}
              className="p-1.5 hover:bg-neutral-100 rounded-lg transition-colors -ml-1.5"
            >
              <ArrowLeft className="w-5 h-5 text-neutral-600" />
            </button>
          )}
          <h2 className="font-semibold text-neutral-900">
            {getTitle()}
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-neutral-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto h-[calc(100vh-64px)]">
        {content.type === 'intake' && !selectedIntake && (
          <IntakeSelection onSelectIntake={setSelectedIntake} />
        )}

        {content.type === 'intake' && selectedIntake === 'call' && (
          <CallCenterIntake onComplete={onClose} />
        )}

        {content.type === 'intake' && selectedIntake === 'document' && (
          <DocumentUploadIntake onComplete={onClose} />
        )}

        {/* Use SendEmailFlow for Email Forward intake */}
        {content.type === 'intake' && selectedIntake === 'email' && (
          <SendEmailFlow onComplete={onClose} />
        )}

        {content.type === 'intake' && selectedIntake === 'manual' && (
          <ManualEntryIntake onComplete={onClose} />
        )}

        {/* Use the same DocumentUploadIntake for standalone upload */}
        {content.type === 'upload' && (
          <DocumentUploadIntake onComplete={onClose} />
        )}

        {content.type === 'call' && (
          <LogCallFlow onComplete={onClose} />
        )}

        {content.type === 'email' && (
          <SendEmailFlow onComplete={onClose} />
        )}
      </div>
    </div>
  );
}
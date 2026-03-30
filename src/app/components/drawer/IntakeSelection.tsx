import { Phone, Upload, Mail, Edit3, ChevronRight } from 'lucide-react';

interface IntakeSelectionProps {
  onSelectIntake: (type: 'call' | 'document' | 'email' | 'manual') => void;
}

const intakeOptions = [
  {
    id: 'call' as const,
    label: 'Call Center',
    description: 'Live call capture with real-time form entry',
    icon: Phone,
    color: 'blue',
  },
  {
    id: 'email' as const,
    label: 'Email Forward',
    description: 'Process forwarded emails and attachments',
    icon: Mail,
    color: 'purple',
  },
  {
    id: 'document' as const,
    label: 'Document Upload',
    description: 'Drag & drop files with AI extraction',
    icon: Upload,
    color: 'green',
  },
  {
    id: 'manual' as const,
    label: 'Manual Entry',
    description: 'Structured intake form for complete data',
    icon: Edit3,
    color: 'amber',
  },
];

export function IntakeSelection({ onSelectIntake }: IntakeSelectionProps) {
  return (
    <div className="p-6">
      <p className="text-neutral-600 mb-6">
        Select an intake channel to begin the enrollment process
      </p>

      <div className="space-y-3">
        {intakeOptions.map((option) => {
          const Icon = option.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
            green: 'bg-green-50 text-green-600 group-hover:bg-green-100',
            purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
            amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-100',
          }[option.color];

          return (
            <button
              key={option.id}
              onClick={() => onSelectIntake(option.id)}
              className="group w-full bg-white border border-neutral-200 rounded-xl p-5 hover:border-neutral-300 hover:shadow-sm transition-all text-left"
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${colorClasses}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-neutral-900 mb-1 flex items-center gap-2">
                    {option.label}
                    <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 transition-colors" />
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
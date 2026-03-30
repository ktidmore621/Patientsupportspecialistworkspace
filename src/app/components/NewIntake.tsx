import { useState } from 'react';
import { Phone, Upload, Mail, Database, CheckCircle2 } from 'lucide-react';

export function NewIntake() {
  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);

  const channels = [
    {
      id: 'call',
      name: 'Call Center',
      icon: Phone,
      description: 'Live call intake with real-time case creation',
      color: 'blue',
    },
    {
      id: 'upload',
      name: 'Document Upload',
      icon: Upload,
      description: 'Upload fax, PDF, or scanned documents for AI processing',
      color: 'purple',
    },
    {
      id: 'email',
      name: 'Email Forward',
      icon: Mail,
      description: 'Forward email with attachments to intake queue',
      color: 'green',
    },
    {
      id: 'manual',
      name: 'Manual Entry',
      icon: Database,
      description: 'Direct data entry for structured information',
      color: 'amber',
    },
  ];

  const getColorClasses = (color: string, selected: boolean) => {
    const colors = {
      blue: selected 
        ? 'border-blue-500 bg-blue-50' 
        : 'border-blue-200 hover:border-blue-300 hover:bg-blue-50',
      purple: selected 
        ? 'border-purple-500 bg-purple-50' 
        : 'border-purple-200 hover:border-purple-300 hover:bg-purple-50',
      green: selected 
        ? 'border-green-500 bg-green-50' 
        : 'border-green-200 hover:border-green-300 hover:bg-green-50',
      amber: selected 
        ? 'border-amber-500 bg-amber-50' 
        : 'border-amber-200 hover:border-amber-300 hover:bg-amber-50',
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-700',
      purple: 'text-purple-700',
      green: 'text-green-700',
      amber: 'text-amber-700',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="h-full overflow-auto">
      <div className="max-w-5xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="mb-2">New Intake</h1>
          <p className="text-neutral-600">
            Select an intake channel to begin enrollment process
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {channels.map((channel) => {
            const Icon = channel.icon;
            const isSelected = selectedChannel === channel.id;
            
            return (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${getColorClasses(channel.color, isSelected)}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-white border ${
                    isSelected ? `border-${channel.color}-300` : 'border-neutral-200'
                  }`}>
                    <Icon className={`w-6 h-6 ${getIconColor(channel.color)}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-neutral-900">{channel.name}</h3>
                      {isSelected && (
                        <CheckCircle2 className={`w-5 h-5 ${getIconColor(channel.color)}`} />
                      )}
                    </div>
                    <p className="text-sm text-neutral-600">{channel.description}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {selectedChannel && (
          <div className="bg-white rounded-lg border border-neutral-200 p-6">
            <h2 className="mb-4">
              {channels.find(c => c.id === selectedChannel)?.name} Intake
            </h2>
            
            {selectedChannel === 'call' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                  <p className="text-sm text-blue-900">
                    Call center integration would connect here. The system attempts automatic caller identification
                    and presents matching cases or creates a new in-progress case for real-time data entry.
                  </p>
                </div>
                <button className="px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors">
                  Initialize Call Session
                </button>
              </div>
            )}

            {selectedChannel === 'upload' && (
              <div className="space-y-4">
                <div className="border-2 border-dashed border-neutral-300 rounded-lg p-12 text-center hover:border-neutral-400 transition-colors cursor-pointer">
                  <Upload className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                  <p className="text-neutral-700 mb-1">Drop files here or click to browse</p>
                  <p className="text-sm text-neutral-500">
                    Supports PDF, JPEG, PNG. AI will extract and parse data automatically.
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-200 rounded-md p-4">
                  <p className="text-sm text-purple-900">
                    Files will be processed using OCR and intelligent parsing. The system will extract patient data,
                    check for duplicates, and create cases automatically.
                  </p>
                </div>
              </div>
            )}

            {selectedChannel === 'email' && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-md p-4">
                  <p className="text-sm text-green-900 mb-3">
                    Forward enrollment emails to this dedicated intake address:
                  </p>
                  <div className="bg-white border border-green-300 rounded-md p-3">
                    <code className="text-sm font-mono text-green-800">
                      intake@psp-workspace.example.com
                    </code>
                  </div>
                  <p className="text-sm text-green-900 mt-3">
                    Emails and attachments will be automatically parsed and routed to the appropriate workflow.
                  </p>
                </div>
              </div>
            )}

            {selectedChannel === 'manual' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-neutral-700 mb-1">First Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-700 mb-1">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-700 mb-1">Date of Birth</label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm text-neutral-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="patient@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-700 mb-1">Insurance Type</label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select type</option>
                      <option value="commercial">Commercial</option>
                      <option value="medicare">Medicare</option>
                      <option value="medicaid">Medicaid</option>
                      <option value="uninsured">Uninsured</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-neutral-700 mb-1">Program</label>
                    <select className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="">Select program</option>
                      <option value="copay">Copay Assistance</option>
                      <option value="pap">Patient Assistance (PAP)</option>
                      <option value="bridge">Bridge Supply</option>
                      <option value="quick_start">Quick Start</option>
                    </select>
                  </div>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                  <p className="text-sm text-amber-900">
                    System will check for duplicate records after you enter patient name and DOB.
                    Missing fields will be flagged for outreach.
                  </p>
                </div>
                <button className="px-4 py-2 bg-amber-700 text-white rounded-md hover:bg-amber-800 transition-colors">
                  Create Case
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

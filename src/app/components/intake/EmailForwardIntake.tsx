import { Mail, Copy, CheckCircle2, Inbox, Clock } from 'lucide-react';

interface EmailForwardIntakeProps {
  onComplete: () => void;
}

const recentEmails = [
  {
    id: '1',
    from: 'patient@example.com',
    subject: 'Enrollment Request - Sarah Johnson',
    received: '2 hours ago',
    status: 'pending',
  },
  {
    id: '2',
    from: 'doctor@clinic.com',
    subject: 'Re: Patient Authorization Form',
    received: '5 hours ago',
    status: 'processed',
  },
];

export function EmailForwardIntake({ onComplete }: EmailForwardIntakeProps) {
  const forwardingEmail = 'intake@psp-workspace.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(forwardingEmail);
  };

  const handleProcessEmail = (emailId: string) => {
    console.log('Processing email:', emailId);
    onComplete();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Forwarding Instructions */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Forwarding Address</h3>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-3 mb-4">
              <Mail className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-purple-900 font-medium mb-1">
                  Forward enrollment emails to this address
                </p>
                <p className="text-xs text-purple-700">
                  Our system will automatically process attachments and extract patient information
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white border border-purple-300 rounded-lg px-3 py-2.5">
                <code className="text-sm text-neutral-900 font-mono">
                  {forwardingEmail}
                </code>
              </div>
              <button
                onClick={copyEmail}
                className="px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy
              </button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">How It Works</h3>
          <div className="space-y-2">
            {[
              { step: '1', text: 'Forward enrollment emails to the address above' },
              { step: '2', text: 'AI extracts patient info and attachments automatically' },
              { step: '3', text: 'Review extracted data and create case' },
              { step: '4', text: 'Original email is archived for audit trail' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3 text-sm">
                <div className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center flex-shrink-0 text-neutral-700 font-medium text-xs">
                  {item.step}
                </div>
                <p className="text-neutral-700 pt-0.5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Forwarded Emails */}
        <div>
          <h3 className="text-sm font-semibold text-neutral-900 mb-3">Recent Forwarded Emails</h3>
          {recentEmails.length > 0 ? (
            <div className="space-y-2">
              {recentEmails.map((email) => (
                <div
                  key={email.id}
                  className="bg-white border border-neutral-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {email.subject}
                      </p>
                      <p className="text-xs text-neutral-600 mt-0.5">
                        From: {email.from}
                      </p>
                    </div>
                    {email.status === 'pending' ? (
                      <span className="px-2 py-1 bg-amber-50 text-amber-700 border border-amber-200 rounded text-xs font-medium flex items-center gap-1 whitespace-nowrap ml-3">
                        <Clock className="w-3 h-3" />
                        Pending
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs font-medium flex items-center gap-1 whitespace-nowrap ml-3">
                        <CheckCircle2 className="w-3 h-3" />
                        Processed
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-neutral-500">Received {email.received}</p>
                    {email.status === 'pending' && (
                      <button
                        onClick={() => handleProcessEmail(email.id)}
                        className="text-xs text-blue-700 hover:text-blue-800 font-medium"
                      >
                        Process Now →
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-8 text-center">
              <Inbox className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
              <p className="text-sm text-neutral-600">No forwarded emails yet</p>
              <p className="text-xs text-neutral-500 mt-1">
                Emails sent to the forwarding address will appear here
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="border-t border-neutral-200 p-6 bg-neutral-50 flex items-center justify-end">
        <button
          onClick={onComplete}
          className="px-4 py-2 text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

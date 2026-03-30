import { CaseStatus, ActionType } from '../types/case';

// Get human-readable status label
export function getStatusLabel(status: CaseStatus): string {
  const labels: Record<CaseStatus, string> = {
    'active': 'Active',
    'temp': 'Temp',
    'in_review': 'In Review',
    'enrolled': 'Enrolled',
    'stalled': 'Stalled',
    'approved': 'Approved',
    'denied': 'Denied',
    'closed': 'Closed'
  };
  return labels[status] || status;
}

// Get days open color coding
export function getDaysOpenColor(daysOpen: number): string {
  if (daysOpen >= 11) return 'text-[#ef4444]';
  if (daysOpen >= 8) return 'text-[#f59e0b]';
  return 'text-neutral-700';
}

// Get status display text
export function getStatusDisplay(status: CaseStatus): string {
  return getStatusLabel(status);
}

// Get status color styling (background + text)
export function getStatusColor(status: CaseStatus): string {
  const styles: Record<CaseStatus, string> = {
    'active': 'bg-[#3b82f6]/10 text-[#3b82f6]',
    'temp': 'bg-[#f59e0b]/10 text-[#f59e0b]',
    'in_review': 'bg-purple-50 text-purple-700',
    'enrolled': 'bg-[#10b981]/10 text-[#10b981]',
    'stalled': 'bg-[#ef4444]/10 text-[#ef4444]',
    'approved': 'bg-[#10b981]/10 text-[#10b981]',
    'denied': 'bg-[#ef4444]/10 text-[#ef4444]',
    'closed': 'bg-neutral-100 text-neutral-600'
  };
  return styles[status] || 'bg-neutral-100 text-neutral-600';
}

// Get program display text
export function getProgramDisplay(program: string): string {
  const labels: Record<string, string> = {
    'copay_assistance': 'Copay Assistance',
    'free_drug': 'Free Drug',
    'patient_support': 'Patient Support',
    'copay': 'Copay Assistance'
  };
  return labels[program] || program.replace(/_/g, ' ');
}

// Get status pill styling
export function getStatusPillStyle(status: CaseStatus): string {
  const styles: Record<CaseStatus, string> = {
    'active': 'bg-[#3b82f6]/10 text-[#3b82f6]',
    'temp': 'bg-[#f59e0b]/10 text-[#f59e0b]',
    'in_review': 'bg-purple-50 text-purple-700',
    'enrolled': 'bg-[#10b981]/10 text-[#10b981]',
    'stalled': 'bg-[#ef4444]/10 text-[#ef4444]',
    'approved': 'bg-[#10b981]/10 text-[#10b981]',
    'denied': 'bg-[#ef4444]/10 text-[#ef4444]',
    'closed': 'bg-neutral-100 text-neutral-600'
  };
  return styles[status] || 'bg-neutral-100 text-neutral-600';
}

// Get NBA chip styling
export function getNBAChipStyle(actionType: ActionType): string {
  const styles: Record<ActionType, string> = {
    'outreach': 'bg-[#f59e0b] text-white',
    'confirm': 'bg-[#10b981] text-white',
    'review': 'bg-purple-600 text-white',
    'follow_up': 'bg-[#f59e0b] text-white'
  };
  return styles[actionType] || 'bg-neutral-500 text-white';
}

// Get NBA chip label
export function getNBAChipLabel(actionType: ActionType): string {
  const labels: Record<ActionType, string> = {
    'outreach': 'Outreach',
    'confirm': 'Confirm',
    'review': 'Review',
    'follow_up': 'Follow up'
  };
  return labels[actionType] || actionType;
}
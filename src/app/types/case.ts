// Core types for PSP Enrollment Workspace

export type CaseStatus = 'temp' | 'active' | 'approved' | 'denied' | 'closed';
export type ProgramType = 'copay' | 'pap' | 'bridge' | 'quick_start';
export type InsuranceType = 'commercial' | 'medicare' | 'medicaid' | 'uninsured';
export type Priority = 'urgent' | 'high' | 'medium' | 'low';
export type ActionType = 'outreach' | 'review' | 'confirm' | 'follow_up';

export interface NextBestAction {
  action: string;
  why: string;
  impact: string;
  actionType: ActionType;
  dueDate?: string;
}

export interface Blocker {
  type: 'missing_document' | 'missing_consent' | 'pending_verification' | 'stalled';
  description: string;
  severity: 'critical' | 'warning' | 'info';
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone?: string;
  email?: string;
}

export interface Case {
  id: string;
  patient: Patient;
  status: CaseStatus;
  program: ProgramType;
  insuranceType: InsuranceType;
  priority: Priority;
  daysOpen: number;
  nextBestAction: NextBestAction;
  blockers: Blocker[];
  assignedTo: string;
  createdAt: string;
  lastUpdated: string;
  
  // Intake data
  enrollmentSource: string;
  prescriber?: string;
  prescriberNPI?: string;
  
  // Verification
  insuranceVerified: boolean;
  priorAuthStatus?: 'pending' | 'approved' | 'denied';
  
  // Eligibility
  fplPercentage?: number;
  eligibilityScore?: number;
  
  // Consent & authorization
  hipaaAuthorized: boolean;
  enrollmentConsent: boolean;
  
  // Documents
  requiredDocuments: number;
  completedDocuments: number;
}

export interface PriorityActionCard {
  id: string;
  case: Case;
  action: string;
  reasoning: string;
  impact: string;
  actionButton: string;
}

export interface QueueMetrics {
  needsActionToday: number;
  stalledOrAtRisk: number;
  awaitingOutreach: number;
}

export type EventType = 'case_created' | 'record_update' | 'specialist_alert';
export type TaskType = 'specialist_review' | 'specialist_outreach';

export interface Event {
  id: string;
  type: EventType;
  caseId: string;
  description: string;
  timestamp: string;
  initiator: 'system' | 'specialist' | 'external';
}

export interface Task {
  id: string;
  type: TaskType;
  caseId: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

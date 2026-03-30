import { Case, PriorityActionCard, QueueMetrics } from '../types/case';

export const mockCases: Case[] = [
  {
    id: 'PSP-2024-1847',
    patient: {
      id: 'PT-8923',
      firstName: 'Maria',
      lastName: 'Rodriguez',
      dateOfBirth: '1967-08-15',
      phone: '(555) 234-9012',
      email: 'maria.r@email.com'
    },
    status: 'active',
    program: 'copay',
    insuranceType: 'commercial',
    priority: 'urgent',
    daysOpen: 8,
    nextBestAction: {
      action: 'Confirm prior authorization approval',
      why: 'PA was approved 2 days ago. Patient has been waiting for confirmation to fill prescription.',
      impact: 'Delaying confirmation means the patient cannot start therapy. Every day matters for this condition.',
      actionType: 'confirm',
      dueDate: '2024-03-30'
    },
    blockers: [],
    assignedTo: 'Sarah Mitchell',
    createdAt: '2024-03-22T09:14:00Z',
    lastUpdated: '2024-03-28T14:32:00Z',
    enrollmentSource: 'Provider Portal',
    prescriber: 'Dr. James Chen',
    prescriberNPI: '1234567890',
    insuranceVerified: true,
    priorAuthStatus: 'approved',
    fplPercentage: 185,
    eligibilityScore: 92,
    hipaaAuthorized: true,
    enrollmentConsent: true,
    requiredDocuments: 4,
    completedDocuments: 4
  },
  {
    id: 'PSP-2024-1891',
    patient: {
      id: 'PT-9145',
      firstName: 'Thomas',
      lastName: 'Anderson',
      dateOfBirth: '1982-03-22',
      phone: '(555) 876-4321'
    },
    status: 'temp',
    program: 'pap',
    insuranceType: 'uninsured',
    priority: 'high',
    daysOpen: 3,
    nextBestAction: {
      action: 'Send combined outreach for missing information',
      why: 'Patient record is incomplete. Missing HIPAA authorization and income verification documents.',
      impact: 'Case cannot be promoted to Active until these requirements are met. Patient cannot begin enrollment.',
      actionType: 'outreach',
      dueDate: '2024-03-30'
    },
    blockers: [
      {
        type: 'missing_consent',
        description: 'HIPAA authorization not received',
        severity: 'critical'
      },
      {
        type: 'missing_document',
        description: 'Income verification required for PAP eligibility',
        severity: 'critical'
      }
    ],
    assignedTo: 'Sarah Mitchell',
    createdAt: '2024-03-27T11:23:00Z',
    lastUpdated: '2024-03-29T16:45:00Z',
    enrollmentSource: 'Fax',
    prescriber: 'Dr. Lisa Wong',
    prescriberNPI: '2345678901',
    insuranceVerified: false,
    hipaaAuthorized: false,
    enrollmentConsent: true,
    requiredDocuments: 5,
    completedDocuments: 2
  },
  {
    id: 'PSP-2024-1823',
    patient: {
      id: 'PT-8756',
      firstName: 'Jennifer',
      lastName: 'Kim',
      dateOfBirth: '1975-11-08',
      phone: '(555) 123-7890',
      email: 'j.kim@email.com'
    },
    status: 'active',
    program: 'copay',
    insuranceType: 'commercial',
    priority: 'medium',
    daysOpen: 12,
    nextBestAction: {
      action: 'Follow up on pending prior authorization',
      why: 'Prior authorization has been pending with UnitedHealthcare for 9 days. Average approval time is 7 days.',
      impact: 'Patient is waiting to start therapy. Delays increase risk of disease progression.',
      actionType: 'follow_up',
      dueDate: '2024-03-31'
    },
    blockers: [
      {
        type: 'pending_verification',
        description: 'Prior authorization pending - Day 9',
        severity: 'warning'
      }
    ],
    assignedTo: 'Sarah Mitchell',
    createdAt: '2024-03-18T08:45:00Z',
    lastUpdated: '2024-03-29T10:12:00Z',
    enrollmentSource: 'Provider Portal',
    prescriber: 'Dr. Michael Torres',
    prescriberNPI: '3456789012',
    insuranceVerified: true,
    priorAuthStatus: 'pending',
    fplPercentage: 220,
    eligibilityScore: 88,
    hipaaAuthorized: true,
    enrollmentConsent: true,
    requiredDocuments: 4,
    completedDocuments: 4
  },
  {
    id: 'PSP-2024-1902',
    patient: {
      id: 'PT-9234',
      firstName: 'Robert',
      lastName: 'Williams',
      dateOfBirth: '1959-06-14',
      phone: '(555) 345-6789'
    },
    status: 'active',
    program: 'bridge',
    insuranceType: 'medicare',
    priority: 'urgent',
    daysOpen: 15,
    nextBestAction: {
      action: 'Review appeal path for denied prior authorization',
      why: 'Medicare Part D denied prior auth citing step therapy requirement. Patient has documented failure of first-line therapy.',
      impact: 'Without appeal, patient cannot access medication. Bridge supply available as interim solution.',
      actionType: 'review',
      dueDate: '2024-03-30'
    },
    blockers: [
      {
        type: 'pending_verification',
        description: 'Prior authorization denied - appeal path available',
        severity: 'critical'
      }
    ],
    assignedTo: 'Sarah Mitchell',
    createdAt: '2024-03-15T13:20:00Z',
    lastUpdated: '2024-03-29T09:05:00Z',
    enrollmentSource: 'Call Center',
    prescriber: 'Dr. Patricia Johnson',
    prescriberNPI: '4567890123',
    insuranceVerified: true,
    priorAuthStatus: 'denied',
    fplPercentage: 165,
    eligibilityScore: 85,
    hipaaAuthorized: true,
    enrollmentConsent: true,
    requiredDocuments: 6,
    completedDocuments: 5
  },
  {
    id: 'PSP-2024-1876',
    patient: {
      id: 'PT-9001',
      firstName: 'Angela',
      lastName: 'Martinez',
      dateOfBirth: '1990-02-28',
      phone: '(555) 567-8901',
      email: 'a.martinez90@email.com'
    },
    status: 'active',
    program: 'copay',
    insuranceType: 'commercial',
    priority: 'low',
    daysOpen: 5,
    nextBestAction: {
      action: 'Confirm specialty pharmacy enrollment',
      why: 'Patient has been approved for copay assistance. Specialty pharmacy reported enrollment complete.',
      impact: 'Verification needed before first fill can be dispensed.',
      actionType: 'confirm',
      dueDate: '2024-04-01'
    },
    blockers: [],
    assignedTo: 'Sarah Mitchell',
    createdAt: '2024-03-25T10:30:00Z',
    lastUpdated: '2024-03-29T15:18:00Z',
    enrollmentSource: 'Email',
    prescriber: 'Dr. David Lee',
    prescriberNPI: '5678901234',
    insuranceVerified: true,
    priorAuthStatus: 'approved',
    fplPercentage: 310,
    eligibilityScore: 95,
    hipaaAuthorized: true,
    enrollmentConsent: true,
    requiredDocuments: 3,
    completedDocuments: 3
  },
  {
    id: 'PSP-2024-1845',
    patient: {
      id: 'PT-8891',
      firstName: 'Michael',
      lastName: 'Chen',
      dateOfBirth: '1972-09-19',
      phone: '(555) 789-0123'
    },
    status: 'active',
    program: 'pap',
    insuranceType: 'uninsured',
    priority: 'medium',
    daysOpen: 10,
    nextBestAction: {
      action: 'Review AI eligibility recommendation',
      why: 'System calculated 142% FPL based on submitted income documentation. Recommends PAP approval with 94% confidence.',
      impact: 'Patient is waiting for eligibility determination to access free medication.',
      actionType: 'review',
      dueDate: '2024-03-31'
    },
    blockers: [],
    assignedTo: 'Sarah Mitchell',
    createdAt: '2024-03-20T14:15:00Z',
    lastUpdated: '2024-03-29T11:40:00Z',
    enrollmentSource: 'Fax',
    prescriber: 'Dr. Sarah Patel',
    prescriberNPI: '6789012345',
    insuranceVerified: false,
    fplPercentage: 142,
    eligibilityScore: 94,
    hipaaAuthorized: true,
    enrollmentConsent: true,
    requiredDocuments: 5,
    completedDocuments: 5
  },
  // Eligibility Determination Cases
  {
    id: 'PSP-2024-1920',
    patient: {
      id: 'PT-9234',
      firstName: 'Jennifer',
      lastName: 'Martinez',
      dateOfBirth: '1985-06-12',
      phone: '(555) 321-7890',
      email: 'jmartinez@email.com'
    },
    status: 'in_review',
    program: 'pap',
    insuranceType: 'uninsured',
    priority: 'medium',
    daysOpen: 3,
    nextBestAction: {
      action: 'Review income verification',
      why: 'Income documents uploaded, requires PSP verification for eligibility determination.',
      impact: 'Patient is awaiting approval to receive free medication.',
      actionType: 'review',
      dueDate: '2024-04-02'
    },
    blockers: [
      {
        type: 'pending_verification',
        description: 'Income docs pending',
        severity: 'warning'
      }
    ],
    assignedTo: 'Sarah Mitchell',
    createdAt: '2024-03-27T10:20:00Z',
    lastUpdated: '2024-03-30T09:15:00Z',
    enrollmentSource: 'Provider Portal',
    prescriber: 'Dr. Amanda Lee',
    prescriberNPI: '7890123456',
    insuranceVerified: false,
    fplPercentage: 165,
    eligibilityScore: 88,
    hipaaAuthorized: true,
    enrollmentConsent: true,
    requiredDocuments: 4,
    completedDocuments: 4
  },
  {
    id: 'PSP-2024-1918',
    patient: {
      id: 'PT-9210',
      firstName: 'Robert',
      lastName: 'Williams',
      dateOfBirth: '1968-11-30',
      phone: '(555) 654-3210'
    },
    status: 'in_review',
    program: 'copay',
    insuranceType: 'commercial',
    priority: 'medium',
    daysOpen: 5,
    nextBestAction: {
      action: 'Verify insurance coverage',
      why: 'Insurance information received, pending benefits verification.',
      impact: 'Patient needs copay assistance approval to afford treatment.',
      actionType: 'review',
      dueDate: '2024-04-01'
    },
    blockers: [
      {
        type: 'pending_verification',
        description: 'Benefit verification in progress',
        severity: 'warning'
      }
    ],
    assignedTo: 'Sarah Mitchell',
    createdAt: '2024-03-25T13:45:00Z',
    lastUpdated: '2024-03-29T16:30:00Z',
    enrollmentSource: 'Phone',
    prescriber: 'Dr. Michael Johnson',
    prescriberNPI: '8901234567',
    insuranceVerified: false,
    priorAuthStatus: 'pending',
    fplPercentage: 280,
    eligibilityScore: 91,
    hipaaAuthorized: true,
    enrollmentConsent: true,
    requiredDocuments: 3,
    completedDocuments: 3
  },
  {
    id: 'PSP-2024-1915',
    patient: {
      id: 'PT-9185',
      firstName: 'Lisa',
      lastName: 'Thompson',
      dateOfBirth: '1979-04-18',
      phone: '(555) 987-6543',
      email: 'lthompson@email.com'
    },
    status: 'in_review',
    program: 'bridge',
    insuranceType: 'medicare',
    priority: 'medium',
    daysOpen: 2,
    nextBestAction: {
      action: 'Review bridge eligibility',
      why: 'Prior authorization submitted to insurance, patient requesting bridge supply during review period.',
      impact: 'Patient needs medication to continue therapy without interruption.',
      actionType: 'review',
      dueDate: '2024-04-01'
    },
    blockers: [],
    assignedTo: 'Sarah Mitchell',
    createdAt: '2024-03-28T08:30:00Z',
    lastUpdated: '2024-03-30T10:45:00Z',
    enrollmentSource: 'Provider Portal',
    prescriber: 'Dr. Rachel Kim',
    prescriberNPI: '9012345678',
    insuranceVerified: true,
    priorAuthStatus: 'pending',
    fplPercentage: 220,
    eligibilityScore: 85,
    hipaaAuthorized: true,
    enrollmentConsent: true,
    requiredDocuments: 2,
    completedDocuments: 2
  }
];

export const priorityActions: PriorityActionCard[] = [
  {
    id: '1',
    case: mockCases[0],
    action: 'Confirm prior authorization approval for Maria Rodriguez',
    reasoning: 'PA was approved 2 days ago. Patient has been waiting for confirmation to fill prescription at specialty pharmacy.',
    impact: 'Delaying confirmation means the patient cannot start therapy. Every day matters for this condition.',
    actionButton: 'Confirm & Notify'
  },
  {
    id: '2',
    case: mockCases[3],
    action: 'Review appeal path for Robert Williams',
    reasoning: 'Medicare denied PA citing step therapy. Patient has documented failure of first-line therapy. AI identified viable appeal path.',
    impact: 'Without appeal, patient cannot access medication. Bridge supply can provide interim coverage while appeal processes.',
    actionButton: 'Review Appeal'
  },
  {
    id: '3',
    case: mockCases[1],
    action: 'Send combined outreach to Thomas Anderson',
    reasoning: 'Temp case needs HIPAA authorization and income verification to promote to Active. Outreach draft is ready.',
    impact: 'Case cannot proceed until requirements are met. Patient enrollment is blocked.',
    actionButton: 'Approve & Send'
  }
];

export const queueMetrics: QueueMetrics = {
  needsActionToday: 4,
  stalledOrAtRisk: 2,
  awaitingOutreach: 1
};
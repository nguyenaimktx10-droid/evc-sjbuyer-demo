export interface LeadSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  targetLocation: string;
  preApproved: 'yes' | 'no_credit_ok' | 'dont_know' | 'cash';
  downPayment: 'under_200' | '200_400' | 'above_400';
  timestamp: string;
  status: 'pending' | 'qualified' | 'vip' | 'not_qualified' | 'contacted';
  notes?: string;
}

export interface VslSlide {
  id: string;
  timeStart: number; // in seconds
  title: string;
  contentLines: string[];
  subtitleVietnamese: string; // the caption spoken in the video
  graphicType: 'chart' | 'stats' | 'map' | 'checklist' | 'quote' | 'avatar';
  graphicData: any;
}

export interface VslChapter {
  id: string;
  title: string;
  timeStart: number; // in seconds
  duration: number; // in seconds
}

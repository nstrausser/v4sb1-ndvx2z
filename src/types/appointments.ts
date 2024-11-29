export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
export type ServiceType = 'Full Body' | 'Partial Body' | 'Custom' | 'Touch Up';

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string | null;
  vehicleInfo: string;
  date: string;
  time: string;
  estimatedDuration: number;
  installerId: string;
  status: AppointmentStatus;
  serviceType: ServiceType;
  estimatedSquareFeet: number;
  quotedPrice: number;
  deposit?: number;
  notes?: string;
}

export interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment?: Appointment;
  onSave: (appointment: Appointment) => void;
}

export interface AppointmentFormData {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleInfo: string;
  date: string;
  time: string;
  estimatedDuration: number;
  installerId: string;
  serviceType: ServiceType;
  estimatedSquareFeet: number;
  quotedPrice: number;
  deposit?: number;
  notes?: string;
}
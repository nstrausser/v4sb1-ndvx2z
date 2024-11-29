import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { AppointmentDialogProps, AppointmentFormData, ServiceType } from '@/types/appointments';

const DEFAULT_FORM_DATA: AppointmentFormData = {
  customerName: '',
  customerPhone: '',
  customerEmail: '',
  vehicleInfo: '',
  date: new Date().toISOString().split('T')[0],
  time: '09:00',
  estimatedDuration: 240,
  installerId: '',
  serviceType: 'Full Body',
  estimatedSquareFeet: 0,
  quotedPrice: 0,
  notes: '',
};

export default function AppointmentDialog({
  open,
  onOpenChange,
  appointment,
  onSave,
}: AppointmentDialogProps) {
  const [formData, setFormData] = useState<AppointmentFormData>(
    appointment
      ? {
          customerName: appointment.customerName,
          customerPhone: appointment.customerPhone,
          customerEmail: appointment.customerEmail || '',
          vehicleInfo: appointment.vehicleInfo,
          date: appointment.date,
          time: appointment.time,
          estimatedDuration: appointment.estimatedDuration,
          installerId: appointment.installerId,
          serviceType: appointment.serviceType,
          estimatedSquareFeet: appointment.estimatedSquareFeet,
          quotedPrice: appointment.quotedPrice,
          deposit: appointment.deposit,
          notes: appointment.notes || '',
        }
      : DEFAULT_FORM_DATA
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    onSave({
      id: appointment?.id || Math.random().toString(36).slice(2),
      ...formData,
      status: appointment?.status || 'scheduled',
      customerEmail: formData.customerEmail || null,
    });

    onOpenChange(false);
    setFormData(DEFAULT_FORM_DATA);
  };

  const serviceTypes: ServiceType[] = [
    'Full Body',
    'Partial Body',
    'Custom',
    'Touch Up',
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {appointment ? 'Edit Appointment' : 'New Appointment'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Customer Name</Label>
            <Input
              id="customerName"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerPhone">Phone</Label>
              <Input
                id="customerPhone"
                type="tel"
                value={formData.customerPhone}
                onChange={(e) =>
                  setFormData({ ...formData, customerPhone: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerEmail">Email</Label>
              <Input
                id="customerEmail"
                type="email"
                value={formData.customerEmail}
                onChange={(e) =>
                  setFormData({ ...formData, customerEmail: e.target.value })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vehicleInfo">Vehicle Information</Label>
            <Input
              id="vehicleInfo"
              value={formData.vehicleInfo}
              onChange={(e) =>
                setFormData({ ...formData, vehicleInfo: e.target.value })
              }
              placeholder="Year Make Model"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceType">Service Type</Label>
            <Select
              value={formData.serviceType}
              onValueChange={(value: ServiceType) =>
                setFormData({ ...formData, serviceType: value })
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="estimatedSquareFeet">Est. Square Feet</Label>
              <Input
                id="estimatedSquareFeet"
                type="number"
                min="0"
                step="0.1"
                value={formData.estimatedSquareFeet}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedSquareFeet: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimatedDuration">Est. Duration (min)</Label>
              <Input
                id="estimatedDuration"
                type="number"
                min="0"
                step="30"
                value={formData.estimatedDuration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    estimatedDuration: parseInt(e.target.value, 10),
                  })
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quotedPrice">Quoted Price</Label>
              <Input
                id="quotedPrice"
                type="number"
                min="0"
                step="0.01"
                value={formData.quotedPrice}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    quotedPrice: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="deposit">Deposit</Label>
              <Input
                id="deposit"
                type="number"
                min="0"
                step="0.01"
                value={formData.deposit || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    deposit: parseFloat(e.target.value),
                  })
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
              placeholder="Additional notes about the appointment..."
            />
          </div>

          <DialogFooter>
            <Button type="submit">
              {appointment ? 'Update' : 'Create'} Appointment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
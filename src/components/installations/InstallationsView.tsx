import { useState } from 'react';
import { Plus, Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getStatusColor } from '@/lib/utils';
import InstallationDialog from './InstallationDialog';
import QualityCheckDialog from '../quality/QualityCheckDialog';
import DefectReportDialog from '../quality/DefectReportDialog';
import type { Installation } from '@/types';

export default function InstallationsView() {
  const [installations, setInstallations] = useState<Installation[]>([
    {
      id: '1',
      customerName: 'John Doe',
      vehicleInfo: '2023 Tesla Model 3',
      installer: {
        id: '1',
        name: 'Matt Anderson',
      },
      status: 'completed',
      totalArea: 125.5,
      notes: 'Clean installation, customer very satisfied',
      createdAt: '2024-03-15T09:00:00Z',
      updatedAt: '2024-03-15T14:00:00Z',
    },
  ]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedInstallation, setSelectedInstallation] = useState<Installation | undefined>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isQualityCheckDialogOpen, setIsQualityCheckDialogOpen] = useState(false);
  const [isDefectReportDialogOpen, setIsDefectReportDialogOpen] = useState(false);

  const filteredInstallations = installations.filter(
    (installation) =>
      (filterStatus === 'all' || installation.status === filterStatus) &&
      (installation.customerName.toLowerCase().includes(search.toLowerCase()) ||
        installation.vehicleInfo.toLowerCase().includes(search.toLowerCase()))
  );

  const handleSave = (installation: Installation) => {
    if (selectedInstallation) {
      setInstallations(installations.map(inst => 
        inst.id === installation.id ? installation : inst
      ));
    } else {
      setInstallations([installation, ...installations]);
    }
    setIsDialogOpen(false);
    setSelectedInstallation(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Installations</h1>
          <p className="text-muted-foreground">
            Track and manage PPF installations
          </p>
        </div>
        <Button onClick={() => setIsDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          New Installation
        </Button>
      </div>

      <div className="flex items-center space-x-4">
        <Input
          placeholder="Search installations..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="needs-recut">Needs Recut</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Installer</TableHead>
              <TableHead>Area</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredInstallations.map((installation) => (
              <TableRow
                key={installation.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => {
                  setSelectedInstallation(installation);
                  setIsDialogOpen(true);
                }}
              >
                <TableCell>
                  {new Date(installation.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{installation.customerName}</TableCell>
                <TableCell>{installation.vehicleInfo}</TableCell>
                <TableCell>{installation.installer.name}</TableCell>
                <TableCell>{installation.totalArea.toFixed(1)} ft²</TableCell>
                <TableCell>
                  <div className={getStatusColor(installation.status)}>
                    {installation.status === 'needs-recut'
                      ? 'Needs Recut'
                      : installation.status === 'in-progress'
                      ? 'In Progress'
                      : 'Completed'}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div
                      className="cursor-pointer p-2 rounded-md hover:bg-accent/50 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInstallation(installation);
                        setIsQualityCheckDialogOpen(true);
                      }}
                    >
                      <Shield className="h-4 w-4" />
                    </div>
                    <div
                      className="cursor-pointer p-2 rounded-md hover:bg-accent/50 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedInstallation(installation);
                        setIsDefectReportDialogOpen(true);
                      }}
                    >
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <InstallationDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        installation={selectedInstallation}
        onSave={handleSave}
      />

      {selectedInstallation && (
        <>
          <QualityCheckDialog
            open={isQualityCheckDialogOpen}
            onOpenChange={setIsQualityCheckDialogOpen}
            installationId={selectedInstallation.id}
            onSave={() => {
              setIsQualityCheckDialogOpen(false);
            }}
          />

          <DefectReportDialog
            open={isDefectReportDialogOpen}
            onOpenChange={setIsDefectReportDialogOpen}
            installationId={selectedInstallation.id}
            onSave={() => {
              setIsDefectReportDialogOpen(false);
            }}
          />
        </>
      )}
    </div>
  );
}
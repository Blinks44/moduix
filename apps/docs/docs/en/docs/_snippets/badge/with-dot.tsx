import { Badge } from '@moduix/react';

const statuses = [
  { label: 'Online', variant: 'default' },
  { label: 'Draft', variant: 'secondary' },
  { label: 'Failed', variant: 'destructive' },
] as const;

export default function BadgeWithDotDemo() {
  return (
    <div className="badge-demo-row">
      {statuses.map((status) => (
        <Badge key={status.label} variant={status.variant}>
          <Badge.Dot />
          {status.label}
        </Badge>
      ))}
    </div>
  );
}
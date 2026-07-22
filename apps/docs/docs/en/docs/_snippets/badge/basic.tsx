import { Badge } from '@moduix/react';

const label = 'New';

export default function BadgeDemo() {
  return (
    <div className="badge-demo-basic">
      <Badge>{label}</Badge>
    </div>
  );
}
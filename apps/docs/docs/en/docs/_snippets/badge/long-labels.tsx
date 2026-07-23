import { Badge } from '@moduix/react';

const label = 'Ready for stakeholder review after legal approval for production release';

export default function BadgeTruncatedDemo() {
  return (
    <Badge className="badge-demo-constrained" title={label}>
      {label}
    </Badge>
  );
}
import { Badge } from '@moduix/react';

export default function BadgeCustomStylingDemo() {
  return (
    <div className="badge-demo-row">
      <Badge className="badge-demo-small">Small</Badge>
      <Badge>Default</Badge>
      <Badge className="badge-demo-large">Large</Badge>
      <Badge className="badge-demo-priority">
        <Badge.Dot />
        Priority
      </Badge>
    </div>
  );
}
//#region demo
import { Badge } from '@moduix/react';

const labels = {
  small: 'Small',
  default: 'Default',
  large: 'Large',
  custom: 'Priority',
};

export function CustomBadgeDemo() {
  return (
    <div className="badge-demo-row">
      <Badge className="badge-demo-small">{labels.small}</Badge>
      <Badge>{labels.default}</Badge>
      <Badge className="badge-demo-large">{labels.large}</Badge>
      <Badge className="badge-demo-custom">
        <Badge.Dot />
        {labels.custom}
      </Badge>
    </div>
  );
}
//#endregion
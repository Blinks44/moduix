//#region demo
import { Badge, ChevronRightIcon } from '@moduix/react';

const labels = {
  release: 'Release',
  details: 'Details',
  more: 'Read more',
};

export function BadgeWithIconDemo() {
  return (
    <div className="badge-demo-row">
      <Badge variant="default">
        {labels.release}
        <ChevronRightIcon />
      </Badge>
      <Badge variant="secondary">
        {labels.details}
        <ChevronRightIcon />
      </Badge>
      <Badge variant="outline">
        {labels.more}
        <ChevronRightIcon />
      </Badge>
    </div>
  );
}
//#endregion
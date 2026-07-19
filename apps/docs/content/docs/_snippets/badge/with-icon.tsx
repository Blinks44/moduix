//#region demo
import { Badge } from '@moduix/react';
import { ChevronRight as ChevronRightIcon } from 'lucide-react';

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
      <Badge asChild variant="link">
        <a href="#styling">
          {labels.more}
          <ChevronRightIcon />
        </a>
      </Badge>
    </div>
  );
}
//#endregion
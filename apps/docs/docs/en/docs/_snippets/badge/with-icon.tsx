import { Badge } from '@moduix/react/badge';
import { ChevronRight as ChevronRightIcon } from 'lucide-react';

const labels = {
  release: 'Release',
  details: 'Details',
  more: 'Read more',
};

export default function BadgeWithIconDemo() {
  return (
    <div className="badge-demo-row">
      <Badge variant="default">
        <Badge.Label>{labels.release}</Badge.Label>
        <ChevronRightIcon />
      </Badge>
      <Badge variant="secondary">
        <Badge.Label>{labels.details}</Badge.Label>
        <ChevronRightIcon />
      </Badge>
      <Badge asChild variant="link">
        <a href="#styling">
          <Badge.Label>{labels.more}</Badge.Label>
          <ChevronRightIcon />
        </a>
      </Badge>
    </div>
  );
}
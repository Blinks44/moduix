import { Badge, BadgeLabel } from '@moduix/react/badge';
import { ChevronRight as ChevronRightIcon } from 'lucide-react';
import styles from '@/components/examples/badge/badge-with-icon.module.css';

const labels = {
  release: 'Release',
  details: 'Details',
  more: 'Read more',
};

export default function BadgeWithIconDemo() {
  return (
    <div className={styles.root}>
      <Badge variant="default">
        <BadgeLabel>{labels.release}</BadgeLabel>
        <ChevronRightIcon />
      </Badge>
      <Badge variant="secondary">
        <BadgeLabel>{labels.details}</BadgeLabel>
        <ChevronRightIcon />
      </Badge>
      <Badge asChild variant="link">
        <a href="#styling">
          <BadgeLabel>{labels.more}</BadgeLabel>
          <ChevronRightIcon />
        </a>
      </Badge>
    </div>
  );
}
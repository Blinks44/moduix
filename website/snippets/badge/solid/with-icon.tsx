import { Badge } from '@moduix/solid/badge';
import { ChevronRight as ChevronRightIcon } from 'lucide-solid';
import styles from '@/components/examples/badge/badge-with-icon.module.css';

const labels = {
  release: 'Release',
  details: 'Details',
  more: 'Read more',
};

export default function BadgeWithIconDemo() {
  return (
    <div class={styles.root}>
      <Badge variant="default">
        <Badge.Label>{labels.release}</Badge.Label>
        <ChevronRightIcon />
      </Badge>
      <Badge variant="secondary">
        <Badge.Label>{labels.details}</Badge.Label>
        <ChevronRightIcon />
      </Badge>
      <Badge
        variant="link"
        asChild={(props) => (
          <a {...props()} href="#styling">
            <Badge.Label>{labels.more}</Badge.Label>
            <ChevronRightIcon />
          </a>
        )}
      />
    </div>
  );
}
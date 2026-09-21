import { Badge, BadgeLabel } from '@moduix/solid/badge';
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
        <BadgeLabel>{labels.release}</BadgeLabel>
        <ChevronRightIcon />
      </Badge>
      <Badge variant="secondary">
        <BadgeLabel>{labels.details}</BadgeLabel>
        <ChevronRightIcon />
      </Badge>
      <Badge
        variant="link"
        asChild={(props) => (
          <a {...props()} href="#styling">
            <BadgeLabel>{labels.more}</BadgeLabel>
            <ChevronRightIcon />
          </a>
        )}
      />
    </div>
  );
}
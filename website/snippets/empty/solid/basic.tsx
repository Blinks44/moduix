import { Button } from '@moduix/solid/button';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from '@moduix/solid/empty';
import { Computer as ComputerIcon } from 'lucide-solid';
import styles from '@/components/examples/empty/empty-basic.module.css';

const emptyState = {
  title: 'No deployments yet',
  description: 'Connect a repository to start tracking release status and deployment history.',
  primaryAction: 'Connect repository',
  secondaryAction: 'Read setup guide',
};

export default function EmptyDemo() {
  return (
    <Empty class={styles.root}>
      <EmptyIcon>
        <ComputerIcon aria-hidden />
      </EmptyIcon>
      <EmptyContent>
        <EmptyTitle>{emptyState.title}</EmptyTitle>
        <EmptyDescription>{emptyState.description}</EmptyDescription>
      </EmptyContent>
      <EmptyActions>
        <Button>{emptyState.primaryAction}</Button>
        <Button variant="outline">{emptyState.secondaryAction}</Button>
      </EmptyActions>
    </Empty>
  );
}

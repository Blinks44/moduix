import { Button } from '@moduix/react/button';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from '@moduix/react/empty';
import { Computer as ComputerIcon } from 'lucide-react';
import styles from '@/components/examples/empty/empty-basic.module.css';

const emptyState = {
  title: 'No deployments yet',
  description: 'Connect a repository to start tracking release status and deployment history.',
  primaryAction: 'Connect repository',
  secondaryAction: 'Read setup guide',
};
export default function EmptyDemo() {
  return (
    <Empty className={styles.root}>
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
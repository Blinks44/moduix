import { Button } from '@moduix/solid/button';
import { Empty } from '@moduix/solid/empty';
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
      <Empty.Icon>
        <ComputerIcon aria-hidden />
      </Empty.Icon>
      <Empty.Content>
        <Empty.Title>{emptyState.title}</Empty.Title>
        <Empty.Description>{emptyState.description}</Empty.Description>
      </Empty.Content>
      <Empty.Actions>
        <Button>{emptyState.primaryAction}</Button>
        <Button variant="outline">{emptyState.secondaryAction}</Button>
      </Empty.Actions>
    </Empty>
  );
}
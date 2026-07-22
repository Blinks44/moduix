import { Button, Empty } from '@moduix/react';
import { Computer as ComputerIcon } from 'lucide-react';

const emptyState = {
  title: 'No deployments yet',
  description: 'Connect a repository to start tracking release status and deployment history.',
  primaryAction: 'Connect repository',
  secondaryAction: 'Read setup guide',
};
export default function EmptyDemo() {
  return (
    <Empty className="empty">
      <Empty.Icon>
        <ComputerIcon />
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
import { Button, Empty } from '@moduix/react';

const emptyState = {
  title: 'No results found',
  description: 'Try changing the search query or clearing one of the active filters.',
  action: 'Clear filters',
};
export default function SearchResultsEmptyState() {
  return (
    <Empty className="empty">
      <Empty.Content>
        <Empty.Title>{emptyState.title}</Empty.Title>
        <Empty.Description>{emptyState.description}</Empty.Description>
      </Empty.Content>
      <Empty.Actions>
        <Button variant="outline">{emptyState.action}</Button>
      </Empty.Actions>
    </Empty>
  );
}
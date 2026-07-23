import { Empty } from '@moduix/react';
import { Map as MapIcon } from 'lucide-react';

const emptyState = {
  title: 'No saved places',
  description: 'Save frequently used destinations to keep them close to your workspace.',
};
export default function SavedPlacesEmptyState() {
  return (
    <Empty>
      <Empty.Icon>
        <MapIcon />
      </Empty.Icon>
      <Empty.Content>
        <Empty.Title>{emptyState.title}</Empty.Title>
        <Empty.Description>{emptyState.description}</Empty.Description>
      </Empty.Content>
    </Empty>
  );
}
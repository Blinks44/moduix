import { Empty } from '@moduix/react/empty';
import { Map as MapIcon } from 'lucide-react';
import styles from '@/components/examples/empty/empty-without-actions.module.css';

const emptyState = {
  title: 'No saved places',
  description: 'Save frequently used destinations to keep them close to your workspace.',
};
export default function SavedPlacesEmptyState() {
  return (
    <Empty className={styles.root}>
      <Empty.Icon>
        <MapIcon aria-hidden />
      </Empty.Icon>
      <Empty.Content>
        <Empty.Title>{emptyState.title}</Empty.Title>
        <Empty.Description>{emptyState.description}</Empty.Description>
      </Empty.Content>
    </Empty>
  );
}
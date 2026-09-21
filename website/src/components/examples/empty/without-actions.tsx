import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from '@moduix/react/empty';
import { Map as MapIcon } from 'lucide-react';
import styles from '@/components/examples/empty/empty-without-actions.module.css';

const emptyState = {
  title: 'No saved places',
  description: 'Save frequently used destinations to keep them close to your workspace.',
};
export default function SavedPlacesEmptyState() {
  return (
    <Empty className={styles.root}>
      <EmptyIcon>
        <MapIcon aria-hidden />
      </EmptyIcon>
      <EmptyContent>
        <EmptyTitle>{emptyState.title}</EmptyTitle>
        <EmptyDescription>{emptyState.description}</EmptyDescription>
      </EmptyContent>
    </Empty>
  );
}

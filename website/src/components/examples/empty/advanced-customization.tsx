import { Button } from '@moduix/react/button';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
} from '@moduix/react/empty';
import styles from '@/components/examples/empty/empty-advanced-customization.module.css';

const emptyState = {
  title: 'Create your first project',
  action: 'Create project',
};

export default function ProjectEmptyState() {
  return (
    <Empty asChild className={styles.root}>
      <section aria-labelledby="projects-empty-title">
        <EmptyContent>
          <EmptyTitle asChild>
            <h2 id="projects-empty-title">{emptyState.title}</h2>
          </EmptyTitle>
          <EmptyDescription>
            <p>
              Start from a template or <strong>build a workspace from scratch</strong> for your
              team.
            </p>
          </EmptyDescription>
        </EmptyContent>
        <EmptyActions>
          <Button>{emptyState.action}</Button>
        </EmptyActions>
      </section>
    </Empty>
  );
}

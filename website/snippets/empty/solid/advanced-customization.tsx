import { Button } from '@moduix/solid/button';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyTitle,
} from '@moduix/solid/empty';
import styles from '@/components/examples/empty/empty-advanced-customization.module.css';

const emptyState = {
  title: 'Create your first project',
  action: 'Create project',
};

export default function ProjectEmptyState() {
  return (
    <Empty
      asChild={(props) => (
        <section {...props()} class={styles.root} aria-labelledby="projects-empty-title">
          <EmptyContent>
            <EmptyTitle
              asChild={(titleProps) => (
                <h2 {...titleProps()} id="projects-empty-title">
                  {emptyState.title}
                </h2>
              )}
            />
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
      )}
    />
  );
}
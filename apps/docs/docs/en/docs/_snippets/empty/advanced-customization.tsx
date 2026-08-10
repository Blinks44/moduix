import { Button } from '@moduix/react/button';
import { Empty } from '@moduix/react/empty';

const emptyState = {
  title: 'Create your first project',
  action: 'Create project',
};

export default function ProjectEmptyState() {
  return (
    <Empty asChild>
      <section aria-labelledby="projects-empty-title">
        <Empty.Content>
          <Empty.Title asChild>
            <h2 id="projects-empty-title">{emptyState.title}</h2>
          </Empty.Title>
          <Empty.Description>
            <p>
              Start from a template or <strong>build a workspace from scratch</strong> for your
              team.
            </p>
          </Empty.Description>
        </Empty.Content>
        <Empty.Actions>
          <Button>{emptyState.action}</Button>
        </Empty.Actions>
      </section>
    </Empty>
  );
}
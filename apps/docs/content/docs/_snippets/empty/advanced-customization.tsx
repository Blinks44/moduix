/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Empty } from '@moduix/react';

const emptyState = {
  title: 'Create your first project',
  action: 'Create project',
};

export function ProjectEmptyState() {
  return (
    <Empty className="empty">
      <Empty.Content>
        <Empty.Title asChild>
          <h2>{emptyState.title}</h2>
        </Empty.Title>
        <Empty.Description>
          <p>
            Start from a template or <strong>build a workspace from scratch</strong> for your team.
          </p>
        </Empty.Description>
      </Empty.Content>
      <Empty.Actions>
        <Button>{emptyState.action}</Button>
      </Empty.Actions>
    </Empty>
  );
}

//#endregion
/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Empty } from '@moduix/react';
import { Computer as ComputerIcon } from 'lucide-react';

const emptyState = {
  title: 'Invite your team',
  description:
    'Shared projects, comments, and approvals appear here after the first teammate joins.',
  action: 'Send invite',
};
export function TeamInviteEmptyState() {
  return (
    <Empty className="custom-empty">
      <Empty.Icon className="custom-icon">
        <ComputerIcon />
      </Empty.Icon>
      <Empty.Content>
        <Empty.Title>{emptyState.title}</Empty.Title>
        <Empty.Description>{emptyState.description}</Empty.Description>
      </Empty.Content>
      <Empty.Actions>
        <Button>{emptyState.action}</Button>
      </Empty.Actions>
    </Empty>
  );
}

//#endregion
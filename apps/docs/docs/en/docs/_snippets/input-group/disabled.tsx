import { InputGroup } from '@moduix/react/input-group';

const workspaceHandle = 'maps';

export default function DisabledInputGroupDemo() {
  return (
    <InputGroup role="group" aria-label="Workspace handle">
      <InputGroup.Addon>@</InputGroup.Addon>
      <InputGroup.Input disabled value={workspaceHandle} />
      <InputGroup.Button disabled>Copy</InputGroup.Button>
    </InputGroup>
  );
}
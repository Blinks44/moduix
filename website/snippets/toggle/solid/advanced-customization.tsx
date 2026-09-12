import { Toggle, useToggleContext } from '@moduix/solid/toggle';
import { Bell as BellIcon } from 'lucide-solid';

function ToggleStateLabel() {
  const toggle = useToggleContext();

  return <span>{toggle().pressed ? 'Notifications on' : 'Notifications off'}</span>;
}

export default function AdvancedToggleCustomizationDemo() {
  return (
    <Toggle defaultPressed>
      <BellIcon />
      <ToggleStateLabel />
    </Toggle>
  );
}
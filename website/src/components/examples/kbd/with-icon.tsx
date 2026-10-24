import { Kbd, KbdGroup } from '@moduix/react/kbd';
import { Command as CommandIcon, CornerDownLeft as EnterIcon } from 'lucide-react';

const shortcut = {
  label: 'Command Enter',
  key: 'Enter',
};

export default function KbdWithIconDemo() {
  return (
    <KbdGroup aria-label={shortcut.label}>
      <Kbd>
        <CommandIcon />
      </Kbd>
      +
      <Kbd>
        <EnterIcon />
        {shortcut.key}
      </Kbd>
    </KbdGroup>
  );
}
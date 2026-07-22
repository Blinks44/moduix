import { Kbd } from '@moduix/react';
import { Fragment } from 'react';

const shortcuts = [
  {
    label: 'Command K',
    keys: ['Cmd', 'K'],
    description: 'Open command menu',
  },
  {
    label: 'Shift question mark',
    keys: ['Shift', '?'],
    description: 'Show shortcuts',
  },
  {
    label: 'Escape',
    keys: ['Esc'],
    description: 'Close overlay',
  },
];

export default function KbdShortcutListDemo() {
  return (
    <div className="kbd-demo-shortcut-list">
      {shortcuts.map((shortcut) => (
        <div key={shortcut.label} className="kbd-demo-shortcut-row">
          <Kbd.Group aria-label={shortcut.label}>
            {shortcut.keys.map((key, index) => (
              <Fragment key={key}>
                {index > 0 && '+'}
                <Kbd>{key}</Kbd>
              </Fragment>
            ))}
          </Kbd.Group>
          {shortcut.description}
        </div>
      ))}
    </div>
  );
}
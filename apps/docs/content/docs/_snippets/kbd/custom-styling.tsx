/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Kbd } from '@moduix/react';
import { Fragment } from 'react';

const shortcut = {
  label: 'Command K',
  keys: ['Cmd', 'K'],
};

export function CustomKbdDemo() {
  return (
    <Kbd.Group aria-label={shortcut.label} className="kbd-demo-custom-group">
      {shortcut.keys.map((key, index) => (
        <Fragment key={key}>
          {index > 0 && '+'}
          <Kbd className="kbd-demo-custom-key">{key}</Kbd>
        </Fragment>
      ))}
    </Kbd.Group>
  );
}

//#endregion
/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Kbd } from '@moduix/react';
import { Fragment } from 'react';

const shortcut = {
  label: 'Command K',
  keys: ['Cmd', 'K'],
};

export function KbdDemo() {
  return (
    <div className="kbd-demo-shortcut">
      <Kbd.Group aria-label={shortcut.label}>
        {shortcut.keys.map((key, index) => (
          <Fragment key={key}>
            {index > 0 && '+'}
            <Kbd>{key}</Kbd>
          </Fragment>
        ))}
      </Kbd.Group>
    </div>
  );
}

//#endregion
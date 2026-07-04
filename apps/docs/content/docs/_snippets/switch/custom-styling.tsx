/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const icon = {
  decorative: true,
  viewBox: '0 0 16 16',
};

import type { ComponentProps } from 'react';
import { Switch } from '@moduix/react';
import styles from './switch-demo.module.css';

function PowerIcon(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M8 2.5V7M5.1 4.3A5 5 0 1 0 10.9 4.3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CustomIconSwitchDemo() {
  return (
    <Switch defaultChecked>
      <Switch.Control>
        <Switch.Thumb className={styles.customIconThumb}>
          <PowerIcon />
        </Switch.Thumb>
      </Switch.Control>
      <Switch.Label>Use custom thumb icon</Switch.Label>
      <Switch.HiddenInput />
    </Switch>
  );
}

//#endregion
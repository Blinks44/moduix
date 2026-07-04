/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CheckIcon, Toggle } from '@moduix/react';
import styles from './toggle.module.css';

export function CustomStylesToggleDemo() {
  return (
    <Toggle className={styles.customToggle} variant="outline" defaultPressed>
      <CheckIcon />
      Styled with className
    </Toggle>
  );
}

//#endregion
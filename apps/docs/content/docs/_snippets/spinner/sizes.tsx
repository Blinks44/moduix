/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Spinner } from '@moduix/react';
import styles from './spinner.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export function SpinnerSizesDemo() {
  return (
    <div className={styles.row}>
      {sizes.map((size) => (
        <Spinner key={size} decorative size={size} />
      ))}
    </div>
  );
}

//#endregion
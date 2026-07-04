/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Spinner } from '@moduix/react';
import styles from './spinner.module.css';

export function SpinnerAsChildDemo() {
  return (
    <Spinner asChild size="lg" aria-label="Loading report">
      <span className={styles.customSpinnerHost}>
        <span data-scope="spinner" data-part="indicator" data-slot="spinner-indicator">
          <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
        </span>
      </span>
    </Spinner>
  );
}

//#endregion
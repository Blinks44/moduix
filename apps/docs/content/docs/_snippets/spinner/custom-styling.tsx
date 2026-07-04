/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Spinner } from '@moduix/react';
import styles from './spinner.module.css';

const size = 'lg';

export function SpinnerStylingDemo() {
  return <Spinner decorative size="lg" className={styles.brandSpinner} />;
}

//#endregion
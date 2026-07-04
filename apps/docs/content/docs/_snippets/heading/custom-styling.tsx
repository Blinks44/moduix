/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Heading } from '@moduix/react';
import styles from './heading.module.css';

const headingText = 'Customized heading';

export function CustomHeadingDemo() {
  return (
    <Heading as="h2" className={styles.custom}>
      {headingText}
    </Heading>
  );
}

//#endregion
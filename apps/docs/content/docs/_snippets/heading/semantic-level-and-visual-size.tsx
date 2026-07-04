/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Heading } from '@moduix/react';
import styles from './heading.module.css';

const headingText = 'Page title rendered as h2';

export function SemanticHeadingDemo() {
  return (
    <Heading as="h2" size="2xl" className={styles.demo}>
      {headingText}
    </Heading>
  );
}

//#endregion
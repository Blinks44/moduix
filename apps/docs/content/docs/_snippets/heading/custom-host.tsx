/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Heading } from '@moduix/react';
import styles from './heading.module.css';

const headingText = 'Factory-composed heading';

export function CustomHostHeadingDemo() {
  return (
    <Heading asChild size="xl" className={styles.customHost}>
      <h2>{headingText}</h2>
    </Heading>
  );
}

//#endregion
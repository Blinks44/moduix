/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Heading } from '@moduix/react';
import styles from './heading.module.css';

const headingText = 'Build reliable interfaces';

export function HeadingDemo() {
  return <Heading className={styles.demo}>{headingText}</Heading>;
}

//#endregion
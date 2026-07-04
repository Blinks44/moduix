/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Heading } from '@moduix/react';
import styles from './heading.module.css';

const headingLevels = [
  {
    level: 1,
    label: 'Heading level 1',
  },
  {
    level: 2,
    label: 'Heading level 2',
  },
  {
    level: 3,
    label: 'Heading level 3',
  },
  {
    level: 4,
    label: 'Heading level 4',
  },
  {
    level: 5,
    label: 'Heading level 5',
  },
  {
    level: 6,
    label: 'Heading level 6',
  },
];

export function HeadingLevelsDemo() {
  return (
    <div className={styles.stack}>
      <Heading>{headingLevels[0].label}</Heading>
      <Heading as="h2">{headingLevels[1].label}</Heading>
      <Heading as="h3">{headingLevels[2].label}</Heading>
      <Heading as="h4">{headingLevels[3].label}</Heading>
      <Heading as="h5">{headingLevels[4].label}</Heading>
      <Heading as="h6">{headingLevels[5].label}</Heading>
    </div>
  );
}

//#endregion
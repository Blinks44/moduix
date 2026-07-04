/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Heading } from '@moduix/react';
import styles from './heading.module.css';

const headingWeights = [
  {
    weight: 'regular',
    label: 'Regular weight',
  },
  {
    weight: 'medium',
    label: 'Medium weight',
  },
  {
    weight: 'semibold',
    label: 'Semibold weight',
  },
  {
    weight: 'bold',
    label: 'Bold weight',
  },
];

export function HeadingWeightsDemo() {
  return (
    <div className={styles.stack}>
      {headingWeights.map((item) => (
        <Heading key={item.weight} as="h2" weight={item.weight}>
          {item.label}
        </Heading>
      ))}
    </div>
  );
}

//#endregion
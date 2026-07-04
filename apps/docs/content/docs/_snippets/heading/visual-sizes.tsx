/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Heading } from '@moduix/react';
import styles from './heading.module.css';

const headingSizes = [
  {
    size: '2xl',
    label: 'Extra-large heading',
  },
  {
    size: 'xl',
    label: 'Large heading',
  },
  {
    size: 'lg',
    label: 'Medium-large heading',
  },
  {
    size: 'md',
    label: 'Medium heading',
  },
  {
    size: 'sm',
    label: 'Small heading',
  },
  {
    size: 'xs',
    label: 'Extra-small heading',
  },
];

export function HeadingSizesDemo() {
  return (
    <div className={styles.stack}>
      {headingSizes.map((item) => (
        <Heading key={item.size} as="h2" size={item.size}>
          {item.label}
        </Heading>
      ))}
    </div>
  );
}

//#endregion
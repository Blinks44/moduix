/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Skeleton } from '@moduix/react';
import styles from './skeleton-as-child-demo.module.css';

const loadingRegion = {
  label: 'Loading summary',
};

export function SkeletonAsChildDemo() {
  return (
    <Skeleton asChild height={72} borderRadius="var(--radius-lg)" className={styles.asChild}>
      <section aria-label={loadingRegion.label} />
    </Skeleton>
  );
}

//#endregion
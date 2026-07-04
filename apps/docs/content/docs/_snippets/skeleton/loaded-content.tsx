/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Skeleton } from '@moduix/react';
import styles from './loaded-skeleton-demo.module.css';

const profile = {
  name: 'Ada Lovelace',
  role: 'Analytical engine notes',
};

export function LoadedSkeletonDemo() {
  return (
    <div className={styles.loadedGrid}>
      <Skeleton loading className={styles.loadedContent}>
        <strong>{profile.name}</strong>
        <span>{profile.role}</span>
      </Skeleton>
      <Skeleton loading={false} className={styles.loadedContent}>
        <strong>{profile.name}</strong>
        <span>{profile.role}</span>
      </Skeleton>
    </div>
  );
}

//#endregion
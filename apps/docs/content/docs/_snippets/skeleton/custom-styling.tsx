/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Skeleton, Stack } from '@moduix/react';
import styles from './custom-skeleton-demo.module.css';

const customLines = ['100%', '78%', '52%'];

export function CustomSkeletonDemo() {
  return (
    <Stack gap={10} className={styles.customBlock}>
      {customLines.map((width) => (
        <Skeleton key={width} className={styles.customSkeleton} width={width} height={18} />
      ))}
    </Stack>
  );
}

//#endregion
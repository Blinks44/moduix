/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Skeleton, Stack } from '@moduix/react';
import styles from './skeleton-variants-demo.module.css';

const variants = ['pulse', 'none'] as const;

export function SkeletonVariantsDemo() {
  return (
    <Stack gap={12} className={styles.stack}>
      {variants.map((variant) => (
        <Skeleton key={variant} height={18} variant={variant} />
      ))}
    </Stack>
  );
}

//#endregion
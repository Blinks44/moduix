/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Skeleton, Stack } from '@moduix/react';
import styles from './skeleton-layout-demo.module.css';

const announcements = [
  {
    titleWidth: '62%',
  },
  {
    titleWidth: '48%',
  },
];

export function SkeletonCompositionDemo() {
  return (
    <Stack gap={12} className={styles.layoutExample}>
      {announcements.map((item) => (
        <Stack
          key={item.titleWidth}
          direction={{
            mobile: 'column',
            desktop: 'row',
          }}
          gap={12}
        >
          <Skeleton width={72} height={48} />
          <Stack gap={8} fill>
            <Skeleton width={item.titleWidth} height={14} />
            <Skeleton height={14} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}

//#endregion
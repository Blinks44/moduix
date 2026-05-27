import type * as React from 'react';
import { Heading, Skeleton, Stack, Text } from 'moduix';
import styles from './stack.module.css';

export function StackExample(props: React.ComponentProps<typeof Stack>) {
  return (
    <Stack gap={12} className={styles.panel} {...props}>
      <Heading as="h3" size="md">
        Project updates
      </Heading>
      <Text tone="muted">
        Use Stack when the layout intent is just flex direction, spacing, and alignment.
      </Text>
      <Text tone="muted">Keep custom layout rules in local CSS.</Text>
    </Stack>
  );
}

export function StackRowExample() {
  return (
    <Stack direction="row" align="center" justify="space-between" gap={12} className={styles.row}>
      <Text weight="semibold">Status</Text>
      <Text tone="muted">Ready to publish</Text>
    </Stack>
  );
}

export function StackWrapExample() {
  return (
    <Stack direction="row" gap={8} wrap="wrap" className={styles.wrap}>
      <div className={styles.pill}>Design</div>
      <div className={styles.pill}>Engineering</div>
      <div className={styles.pill}>Docs</div>
      <div className={styles.pill}>Release</div>
    </Stack>
  );
}

export function StackSemanticExample() {
  return (
    <Stack as="section" gap={12} className={styles.panel}>
      <Heading as="h3" size="md">
        Rendered as section
      </Heading>
      <Text tone="muted">
        Use `as` when the layout wrapper should also carry document semantics.
      </Text>
    </Stack>
  );
}

export function StackSkeletonExample() {
  return (
    <Stack gap={16} className={styles.skeletonCard}>
      <Skeleton height={144} radius="var(--radius-lg)" />
      <Stack gap={12}>
        <Skeleton width="62%" height={18} />
        <Skeleton height={14} />
        <Skeleton width="78%" height={14} />
      </Stack>
    </Stack>
  );
}
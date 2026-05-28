import type { ComponentProps } from 'react';
import { Heading, Skeleton, Stack, Text } from 'moduix';
import styles from './stack.module.css';

export function StackExample(props: ComponentProps<typeof Stack>) {
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

export function StackFillExample() {
  return (
    <Stack direction="row" align="center" gap={12} className={styles.row}>
      <Skeleton size={40} shape="circle" />
      <Stack gap={8} fill>
        <Skeleton width="48%" height={16} />
        <Skeleton height={14} />
      </Stack>
    </Stack>
  );
}

export function StackResponsiveDirectionExample() {
  return (
    <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12} className={styles.row}>
      <Text weight="semibold">Adaptive layout</Text>
      <Text tone="muted">Column on mobile, row from desktop width.</Text>
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
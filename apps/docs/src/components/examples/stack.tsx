import type { ComponentProps } from 'react';
import { Heading, Separator, Skeleton, Stack, Text } from '@moduix/react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './stack.module.css';

const stackOverrideCssProperties = [
  {
    name: '--stack-direction-mobile',
    defaultValue: 'column',
    description:
      'Controls the root `flex-direction` below `640px`. The `direction` prop writes an inline override.',
  },
  {
    name: '--stack-direction-desktop',
    defaultValue: 'column',
    description:
      'Controls the root `flex-direction` from `640px` up. The `direction` prop writes an inline override.',
  },
  {
    name: '--stack-flex',
    defaultValue: 'initial',
    description: 'Controls the root `flex` value. The `fill` prop writes an inline override.',
  },
] satisfies CssPropertyInput[];

export function StackCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={stackOverrideCssProperties} />;
}

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

export function StackSeparatorExample() {
  return (
    <Stack direction="row" align="center" gap={10} className={styles.row}>
      <Text weight="semibold">Design</Text>
      <Separator orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Engineering</Text>
      <Separator orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Docs</Text>
    </Stack>
  );
}

export function StackFillExample() {
  return (
    <Stack direction="row" align="center" gap={12} className={styles.row}>
      <Skeleton boxSize={40} borderRadius="var(--radius-full)" />
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
    <Stack asChild gap={12} className={styles.panel}>
      <section>
        <Heading as="h3" size="md">
          Rendered as section
        </Heading>
        <Text tone="muted">
          Use asChild when the layout wrapper should also carry document semantics.
        </Text>
      </section>
    </Stack>
  );
}

export function StackSkeletonExample() {
  return (
    <Stack gap={16} className={styles.skeletonCard}>
      <Skeleton height={144} borderRadius="var(--radius-lg)" />
      <Stack gap={12}>
        <Skeleton width="62%" height={18} />
        <Skeleton height={14} />
        <Skeleton width="78%" height={14} />
      </Stack>
    </Stack>
  );
}
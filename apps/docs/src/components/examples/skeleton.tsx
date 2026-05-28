import type { ComponentProps } from 'react';
import { Skeleton, Stack } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './skeleton.module.css';

const skeletonCssProperties: CssPropertyInput[] = [
  [
    '--skeleton-animation',
    'var(--animation-pulse)',
    'Controls skeleton loading animation (`moduix-pulse 2s ease-in-out infinite` by default).',
  ],
  [
    '--skeleton-bg',
    'color-mix(in oklab, var(--color-muted-foreground) 18%, var(--color-background))',
    'Controls skeleton background color.',
  ],
  ['--skeleton-radius', 'var(--radius-md)', 'Controls default skeleton border radius.'],
];
export const skeletonOverrideCssProperties = skeletonCssProperties;
export const skeletonPlaygroundCssProperties = skeletonCssProperties;

export function SkeletonCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={skeletonOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function SkeletonCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={skeletonPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function SkeletonExample(props: ComponentProps<typeof Skeleton>) {
  return (
    <Stack gap={10} className={styles.stack}>
      <Skeleton height={18} {...props} />
      <Skeleton width="86%" height={18} {...props} />
      <Skeleton width="64%" height={18} {...props} />
    </Stack>
  );
}

export function SkeletonCardExample() {
  return (
    <Stack gap={16} className={styles.card}>
      <Skeleton height={148} radius="var(--radius-lg)" />
      <Stack gap={12}>
        <Skeleton width="70%" height={20} />
        <Skeleton height={14} />
        <Skeleton width="82%" height={14} />
      </Stack>
    </Stack>
  );
}

export function SkeletonMediaObjectExample() {
  return (
    <Stack direction="row" align="center" gap={12} className={styles.mediaObject}>
      <Skeleton size={48} shape="circle" />
      <Stack gap={8} fill>
        <Skeleton width="46%" height={16} />
        <Skeleton height={14} />
        <Skeleton width="72%" height={14} />
      </Stack>
    </Stack>
  );
}

export function SkeletonCompositionExample() {
  return (
    <Stack gap={12} className={styles.layoutExample}>
      <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
        <Skeleton width={72} height={48} />
        <Stack gap={8} fill>
          <Skeleton width="62%" height={14} />
          <Skeleton height={14} />
        </Stack>
      </Stack>
      <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
        <Skeleton width={72} height={48} />
        <Stack gap={8} fill>
          <Skeleton width="48%" height={14} />
          <Skeleton height={14} />
        </Stack>
      </Stack>
    </Stack>
  );
}

export function SkeletonStaticExample() {
  return <Skeleton width={320} height={72} animated={false} />;
}

export function SkeletonClassNameExample() {
  return (
    <Stack gap={10} className={styles.customBlock}>
      <Skeleton className={styles.customSkeleton} height={18} />
      <Skeleton className={styles.customSkeleton} width="78%" height={18} />
      <Skeleton className={styles.customSkeleton} width="52%" height={18} />
    </Stack>
  );
}
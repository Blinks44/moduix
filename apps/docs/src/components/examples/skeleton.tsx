import type { ComponentProps } from 'react';
import { Skeleton, Stack } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './skeleton.module.css';

const skeletonCssProperties: CssPropertyInput[] = [
  ['--skeleton-animation', 'var(--animation-pulse)', 'Controls the pulse loading animation.'],
  ['--skeleton-border-radius', 'var(--radius-md)', 'Controls default skeleton border radius.'],
  [
    '--skeleton-bg',
    'color-mix(in oklab, var(--color-muted-foreground) 18%, var(--color-background))',
    'Controls skeleton background color.',
  ],
];
export const skeletonOverrideCssProperties = skeletonCssProperties;

export const skeletonExampleData = `const lines = [
  { width: '100%', height: 18 },
  { width: '86%', height: 18 },
  { width: '64%', height: 18 },
];`;

export const skeletonCardData = `const cardSkeleton = {
  mediaHeight: 148,
  titleWidth: '70%',
  bodyWidth: '82%',
};`;

export const skeletonMediaObjectData = `const userRowSkeleton = {
  avatarSize: 48,
  titleWidth: '46%',
  bodyWidth: '72%',
};`;

export const skeletonCompositionData = `const announcements = [
  { titleWidth: '62%' },
  { titleWidth: '48%' },
];`;

export const skeletonVariantsData = `const variants = ['pulse', 'none'] as const;`;

export const skeletonStaticData = `const staticSkeleton = {
  width: 320,
  height: 72,
  variant: 'none',
} as const;`;

export const skeletonAsChildData = `const loadingRegion = {
  label: 'Loading summary',
};`;

export const skeletonLoadedData = `const profile = {
  name: 'Ada Lovelace',
  role: 'Analytical engine notes',
};

const states = {
  loading: true,
  loaded: false,
};`;

export const skeletonCustomStylingCss = `
  .customBlock {
    width: min(20rem, calc(100vw - var(--spacing-8)));
    --skeleton-bg: var(--color-primary);
    --skeleton-border-radius: var(--radius-full);
    --skeleton-animation: none;
  }

  .customSkeleton {
    opacity: 0.28;
  }
`;

export function SkeletonCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={skeletonOverrideCssProperties.map(normalizeCssProperty)}
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
      <Skeleton height={148} borderRadius="var(--radius-lg)" />
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
      <Skeleton boxSize={48} borderRadius="var(--radius-full)" />
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
  return <Skeleton width={320} height={72} variant="none" className={styles.staticSkeleton} />;
}

export function SkeletonVariantsExample() {
  return (
    <Stack gap={12} className={styles.stack}>
      <Skeleton height={18} variant="pulse" />
      <Skeleton height={18} variant="none" />
    </Stack>
  );
}

export function SkeletonAsChildExample() {
  return (
    <Skeleton asChild height={72} borderRadius="var(--radius-lg)" className={styles.asChild}>
      <section aria-label="Loading summary" />
    </Skeleton>
  );
}

export function SkeletonLoadedExample() {
  return (
    <div className={styles.loadedGrid}>
      <Skeleton loading className={styles.loadedContent}>
        <strong>Ada Lovelace</strong>
        <span>Analytical engine notes</span>
      </Skeleton>
      <Skeleton loading={false} className={styles.loadedContent}>
        <strong>Ada Lovelace</strong>
        <span>Analytical engine notes</span>
      </Skeleton>
    </div>
  );
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
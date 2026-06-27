import type { ComponentProps } from 'react';
import { Skeleton, Stack } from '@moduix/react';
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

const lines = [
  { width: '100%', height: 18 },
  { width: '86%', height: 18 },
  { width: '64%', height: 18 },
];

export const skeletonExampleData = `const lines = [
  { width: '100%', height: 18 },
  { width: '86%', height: 18 },
  { width: '64%', height: 18 },
];`;

const cardSkeleton = {
  mediaHeight: 148,
  titleWidth: '70%',
  bodyWidth: '82%',
};

export const skeletonCardData = `const cardSkeleton = {
  mediaHeight: 148,
  titleWidth: '70%',
  bodyWidth: '82%',
};`;

const userRowSkeleton = {
  avatarSize: 48,
  titleWidth: '46%',
  bodyWidth: '72%',
};

export const skeletonMediaObjectData = `const userRowSkeleton = {
  avatarSize: 48,
  titleWidth: '46%',
  bodyWidth: '72%',
};`;

const announcements = [{ titleWidth: '62%' }, { titleWidth: '48%' }];

export const skeletonCompositionData = `const announcements = [
  { titleWidth: '62%' },
  { titleWidth: '48%' },
];`;

const variants = ['pulse', 'none'] as const;

export const skeletonVariantsData = `const variants = ['pulse', 'none'] as const;`;

const staticSkeleton = {
  width: 320,
  height: 72,
  variant: 'none',
} as const;

export const skeletonStaticData = `const staticSkeleton = {
  width: 320,
  height: 72,
  variant: 'none',
} as const;`;

const loadingRegion = {
  label: 'Loading summary',
};

export const skeletonAsChildData = `const loadingRegion = {
  label: 'Loading summary',
};`;

const profile = {
  name: 'Ada Lovelace',
  role: 'Analytical engine notes',
};

export const skeletonLoadedData = `const profile = {
  name: 'Ada Lovelace',
  role: 'Analytical engine notes',
};`;

const customLines = ['100%', '78%', '52%'];

export const skeletonCustomStylingData = `const customLines = ['100%', '78%', '52%'];`;

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
      {lines.map((line) => (
        <Skeleton key={line.width} width={line.width} height={line.height} {...props} />
      ))}
    </Stack>
  );
}

export function SkeletonCardExample() {
  return (
    <Stack gap={16} className={styles.card}>
      <Skeleton height={cardSkeleton.mediaHeight} borderRadius="var(--radius-lg)" />
      <Stack gap={12}>
        <Skeleton width={cardSkeleton.titleWidth} height={20} />
        <Skeleton height={14} />
        <Skeleton width={cardSkeleton.bodyWidth} height={14} />
      </Stack>
    </Stack>
  );
}

export function SkeletonMediaObjectExample() {
  return (
    <Stack direction="row" align="center" gap={12} className={styles.mediaObject}>
      <Skeleton boxSize={userRowSkeleton.avatarSize} borderRadius="var(--radius-full)" />
      <Stack gap={8} fill>
        <Skeleton width={userRowSkeleton.titleWidth} height={16} />
        <Skeleton height={14} />
        <Skeleton width={userRowSkeleton.bodyWidth} height={14} />
      </Stack>
    </Stack>
  );
}

export function SkeletonCompositionExample() {
  return (
    <Stack gap={12} className={styles.layoutExample}>
      {announcements.map((item) => (
        <Stack key={item.titleWidth} direction={{ mobile: 'column', desktop: 'row' }} gap={12}>
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

export function SkeletonStaticExample() {
  return (
    <Skeleton
      width={staticSkeleton.width}
      height={staticSkeleton.height}
      variant={staticSkeleton.variant}
      className={styles.staticSkeleton}
    />
  );
}

export function SkeletonVariantsExample() {
  return (
    <Stack gap={12} className={styles.stack}>
      {variants.map((variant) => (
        <Skeleton key={variant} height={18} variant={variant} />
      ))}
    </Stack>
  );
}

export function SkeletonAsChildExample() {
  return (
    <Skeleton asChild height={72} borderRadius="var(--radius-lg)" className={styles.asChild}>
      <section aria-label={loadingRegion.label} />
    </Skeleton>
  );
}

export function SkeletonLoadedExample() {
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

export function SkeletonClassNameExample() {
  return (
    <Stack gap={10} className={styles.customBlock}>
      {customLines.map((width) => (
        <Skeleton key={width} className={styles.customSkeleton} width={width} height={18} />
      ))}
    </Stack>
  );
}
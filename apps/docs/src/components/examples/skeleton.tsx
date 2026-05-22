import {
  Skeleton,
  SkeletonCircle,
  SkeletonColumn,
  SkeletonRect,
  SkeletonRow,
  type SkeletonProps,
} from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './skeleton.module.css';

export const skeletonOverrideCssProperties: CssPropertyInput[] = [
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
export const skeletonPlaygroundCssProperties: CssPropertyInput[] = [
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

export function SkeletonExample(props: SkeletonProps) {
  return (
    <SkeletonColumn className={styles.textBlock} gap={10}>
      <Skeleton height={18} {...props} />
      <Skeleton height={18} width="86%" {...props} />
      <Skeleton height={18} width="64%" {...props} />
    </SkeletonColumn>
  );
}

export function SkeletonCardExample() {
  return (
    <div className={styles.card}>
      <SkeletonRect height={148} radius="var(--radius-lg)" />
      <SkeletonColumn gap={12}>
        <Skeleton height={20} width="70%" />
        <Skeleton height={14} />
        <Skeleton height={14} width="82%" />
      </SkeletonColumn>
    </div>
  );
}

export function SkeletonMediaObjectExample() {
  return (
    <SkeletonRow className={styles.mediaObject} gap={12}>
      <SkeletonCircle size={48} />
      <SkeletonColumn grow gap={8}>
        <Skeleton height={16} width="46%" />
        <Skeleton height={14} />
        <Skeleton height={14} width="72%" />
      </SkeletonColumn>
    </SkeletonRow>
  );
}

export function SkeletonLayoutPropsExample() {
  return (
    <SkeletonColumn className={styles.layoutProps} gap={12} pt={4} pb={4}>
      <SkeletonRow gap={12} mobileStack={false}>
        <Skeleton width={72} height={48} />
        <SkeletonColumn grow gap={8}>
          <Skeleton height={14} width="62%" />
          <Skeleton height={14} />
        </SkeletonColumn>
      </SkeletonRow>
      <SkeletonRow gap={12} mobileStack={false}>
        <Skeleton width={72} height={48} />
        <SkeletonColumn grow gap={8}>
          <Skeleton height={14} width="48%" />
          <Skeleton height={14} />
        </SkeletonColumn>
      </SkeletonRow>
    </SkeletonColumn>
  );
}

export function SkeletonStaticExample() {
  return <SkeletonRect width={320} height={72} animated={false} />;
}

export function SkeletonClassNameExample() {
  return (
    <SkeletonColumn className={styles.customBlock} gap={10}>
      <Skeleton className={styles.customSkeleton} height={18} />
      <Skeleton className={styles.customSkeleton} height={18} width="78%" />
      <Skeleton className={styles.customSkeleton} height={18} width="52%" />
    </SkeletonColumn>
  );
}
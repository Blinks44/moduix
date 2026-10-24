import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Skeleton.module.css';

type SkeletonVariant = 'pulse' | 'none';

type SkeletonRootProps = HTMLArkProps<'div'> & {
  loading?: boolean;
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  boxSize?: number | string;
  borderRadius?: number | string;
};

const toCssValue = (value: number | string) => (typeof value === 'number' ? `${value}px` : value);

function Skeleton(props: SkeletonRootProps) {
  const [local, others] = splitProps(props, [
    'aria-hidden',
    'borderRadius',
    'boxSize',
    'class',
    'height',
    'loading',
    'style',
    'variant',
    'width',
  ]);
  const loading = () => local.loading ?? true;
  const variant = () => local.variant ?? 'pulse';
  const style = (): JSX.CSSProperties | string => {
    const sizeStyle: JSX.CSSProperties = {};
    const width = local.width ?? local.boxSize;
    const height = local.height ?? local.boxSize;
    if (width != null) sizeStyle.width = toCssValue(width);
    if (height != null) sizeStyle.height = toCssValue(height);
    if (local.borderRadius != null) sizeStyle['border-radius'] = toCssValue(local.borderRadius);

    if (typeof local.style !== 'string') {
      return { ...sizeStyle, ...local.style };
    }

    // A string style keeps its native form and stays last, so it overrides the generated sizes.
    const sizeStyleText = Object.entries(sizeStyle)
      .map(([property, value]) => `${property}:${value};`)
      .join('');
    return sizeStyleText + local.style;
  };

  return (
    <ark.div
      {...others}
      data-scope="skeleton"
      data-part="root"
      data-slot="skeleton-root"
      data-state={loading() ? 'loading' : 'loaded'}
      data-loading={loading() ? '' : undefined}
      data-variant={variant()}
      aria-hidden={local['aria-hidden'] ?? (loading() ? true : undefined)}
      class={clsx(styles.root, local.class)}
      style={style()}
    />
  );
}

export { Skeleton };
export type { SkeletonRootProps, SkeletonVariant };
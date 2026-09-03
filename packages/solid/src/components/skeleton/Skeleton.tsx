import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Skeleton.module.css';

type SkeletonProps = HTMLArkProps<'div'> & {
  loading?: boolean;
  variant?: 'pulse' | 'none';
  width?: number | string;
  height?: number | string;
  boxSize?: number | string;
  borderRadius?: number | string;
};

const toCssValue = (value: number | string | undefined) =>
  typeof value === 'number' ? `${value}px` : value;

function SkeletonRoot(props: SkeletonProps) {
  const [local, others] = splitProps(props, [
    'aria-hidden',
    'asChild',
    'borderRadius',
    'boxSize',
    'children',
    'class',
    'height',
    'loading',
    'style',
    'variant',
    'width',
  ]);
  const loading = () => local.loading ?? true;
  const variant = () => local.variant ?? 'pulse';
  const skeletonStyle = (): JSX.CSSProperties | string => {
    const width = toCssValue(local.width ?? local.boxSize);
    const height = toCssValue(local.height ?? local.boxSize);
    const borderRadius = toCssValue(local.borderRadius);

    if (typeof local.style === 'string') {
      const generatedStyle = [
        width === undefined ? undefined : `width: ${width}`,
        height === undefined ? undefined : `height: ${height}`,
        borderRadius === undefined ? undefined : `border-radius: ${borderRadius}`,
      ]
        .filter(Boolean)
        .join(';');

      return `${generatedStyle}${generatedStyle && local.style ? ';' : ''}${local.style}`;
    }

    const generatedStyle: JSX.CSSProperties = {
      width,
      height,
      'border-radius': borderRadius,
    };

    return local.style === undefined ? generatedStyle : Object.assign(generatedStyle, local.style);
  };

  return (
    <ark.div
      {...others}
      asChild={local.asChild}
      data-scope="skeleton"
      data-part="root"
      data-slot="skeleton-root"
      data-state={loading() ? 'loading' : 'loaded'}
      data-loading={loading() ? '' : undefined}
      data-variant={variant()}
      aria-hidden={local['aria-hidden'] ?? (loading() ? true : undefined)}
      class={clsx(styles.root, local.class)}
      style={skeletonStyle()}
    >
      {local.children}
    </ark.div>
  );
}

const Skeleton = Object.assign(SkeletonRoot, {
  Root: SkeletonRoot,
});

export { Skeleton };
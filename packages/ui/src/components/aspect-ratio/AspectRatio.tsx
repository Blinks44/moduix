import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import styles from './AspectRatio.module.css';

type RatioPreset = 'square' | 'video' | 'portrait' | 'photo';

const PRESETS: Record<RatioPreset, number> = {
  square: 1,
  video: 16 / 9,
  portrait: 9 / 16,
  photo: 4 / 3,
};

function AspectRatio({
  ratio,
  className,
  style,
  ...props
}: ComponentPropsWithoutRef<'div'> & {
  ratio: number | RatioPreset;
}) {
  const resolvedRatio = typeof ratio === 'string' ? PRESETS[ratio] : ratio;

  return (
    <div
      data-slot="aspect-ratio-root"
      className={clsx(styles.root, className)}
      style={{ aspectRatio: resolvedRatio, ...style }}
      {...props}
    />
  );
}

export { AspectRatio };
export type { RatioPreset };
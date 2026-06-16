import type { ComponentPropsWithoutRef } from 'react';
import { clsx } from 'clsx';
import styles from './AspectRatio.module.css';

type RatioPreset = 'square' | 'video' | 'portrait' | 'photo';
type AspectRatioProps = ComponentPropsWithoutRef<'div'> & {
  ratio: number | RatioPreset;
};

const presetRatios: Record<RatioPreset, number> = {
  square: 1,
  video: 16 / 9,
  portrait: 9 / 16,
  photo: 4 / 3,
};

function AspectRatio({ ratio, className, style, ...props }: AspectRatioProps) {
  const aspectRatio = typeof ratio === 'number' ? ratio : presetRatios[ratio];

  return (
    <div
      data-slot="aspect-ratio-root"
      className={clsx(styles.root, className)}
      style={{ aspectRatio, ...style }}
      {...props}
    />
  );
}

export { AspectRatio };
export type { RatioPreset };
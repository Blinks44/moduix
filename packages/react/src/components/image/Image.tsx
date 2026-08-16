import type { ImageProps as UnpicImageProps, SourceProps as UnpicSourceProps } from '@unpic/react';
import { Image as ImagePrimitive, Source as ImageSourcePrimitive } from '@unpic/react';
import { clsx } from 'clsx';
import { forwardRef, type CSSProperties } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Image.module.css';

type ImageProps = UnpicImageProps & { style?: CSSProperties };

const ImageRoot = forwardRef<HTMLImageElement, ImageProps>(function ImageRoot(
  { className, fetchPriority, fetchpriority, ...props },
  ref,
) {
  return (
    <ImagePrimitive
      ref={ref}
      {...(props as UnpicImageProps)}
      fetchpriority={(fetchPriority ?? fetchpriority) as 'high' | 'low' | undefined}
      data-slot="image-root"
      className={clsx(styles.root, normalizeClassName(className))}
    />
  );
});

const ImageSource = forwardRef<HTMLSourceElement, UnpicSourceProps>(
  function ImageSource(props, ref) {
    return <ImageSourcePrimitive ref={ref} {...props} data-slot="image-source" />;
  },
);

const Image = Object.assign(ImageRoot, {
  Root: ImageRoot,
  Source: ImageSource,
});

export { Image };
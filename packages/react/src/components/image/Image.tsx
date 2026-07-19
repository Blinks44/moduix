import type { ImageProps as UnpicImageProps, SourceProps as UnpicSourceProps } from '@unpic/react';
import { Image as ImagePrimitive, Source as ImageSourcePrimitive } from '@unpic/react';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Image.module.css';

type ImageSourceProps = UnpicSourceProps & {
  'data-slot'?: string;
};

const ImageRoot = forwardRef<HTMLImageElement, UnpicImageProps>(function ImageRoot(
  { className, ...props },
  ref,
) {
  return (
    <ImagePrimitive
      ref={ref}
      data-slot="image-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const ImageSource = forwardRef<HTMLSourceElement, ImageSourceProps>(
  function ImageSource(props, ref) {
    return <ImageSourcePrimitive ref={ref} data-slot="image-source" {...props} />;
  },
);

const Image = Object.assign(ImageRoot, {
  Root: ImageRoot,
  Source: ImageSource,
});

export { Image };
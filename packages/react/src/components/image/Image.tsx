import type { ImageProps as UnpicImageProps, SourceProps as UnpicSourceProps } from '@unpic/react';
import { Image as ImagePrimitive, Source as ImageSourcePrimitive } from '@unpic/react';
import { clsx } from 'clsx';
import { forwardRef, type CSSProperties } from 'react';
import styles from './Image.module.css';

type ImageProps = UnpicImageProps & { style?: CSSProperties };

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { className, fetchPriority, fetchpriority, ...props },
  ref,
) {
  return (
    <ImagePrimitive
      ref={ref}
      {...(props as UnpicImageProps)}
      loading={props.loading ?? (props.priority ? 'eager' : 'lazy')}
      decoding={props.decoding ?? (props.priority ? undefined : 'async')}
      fetchpriority={
        (fetchPriority ?? fetchpriority ?? (props.priority ? 'high' : undefined)) as
          | 'high'
          | 'low'
          | undefined
      }
      data-slot="image-root"
      className={clsx(styles.root, className)}
    />
  );
});

const ImageSource = forwardRef<HTMLSourceElement, UnpicSourceProps>(
  function ImageSource(props, ref) {
    return <ImageSourcePrimitive ref={ref} {...props} data-slot="image-source" />;
  },
);

export { Image, ImageSource };
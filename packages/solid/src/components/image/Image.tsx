import type { UnpicImageProps, UnpicSourceProps } from '@unpic/core';
import { transformProps, transformSourceProps } from '@unpic/core';
import { clsx } from 'clsx';
import { createMemo, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import styles from './Image.module.css';

type ImageProps = Omit<
  UnpicImageProps<JSX.ImgHTMLAttributes<HTMLImageElement>>,
  'fetchpriority'
> & {
  fetchpriority?: JSX.ImgHTMLAttributes<HTMLImageElement>['fetchpriority'];
  style?: JSX.ImgHTMLAttributes<HTMLImageElement>['style'];
};

type ImageTransformProps = UnpicImageProps<JSX.ImgHTMLAttributes<HTMLImageElement>> & {
  style?: JSX.ImgHTMLAttributes<HTMLImageElement>['style'];
};

type ImageSourceProps = UnpicSourceProps &
  Omit<
    JSX.SourceHTMLAttributes<HTMLSourceElement>,
    'height' | 'media' | 'sizes' | 'src' | 'srcset' | 'type' | 'width'
  >;

function Image(props: ImageProps) {
  const [local, others] = splitProps(props, ['class', 'fetchpriority']);
  const imageProps = createMemo(() => {
    const transformed = transformProps<JSX.ImgHTMLAttributes<HTMLImageElement>>({
      ...others,
    } as ImageTransformProps);

    return local.fetchpriority === undefined
      ? transformed
      : { ...transformed, fetchpriority: local.fetchpriority };
  });

  return <img {...imageProps()} data-slot="image-root" class={clsx(styles.root, local.class)} />;
}

function ImageSource(props: ImageSourceProps) {
  const [local, others] = splitProps(props, ['class']);
  const sourceProps = createMemo(() =>
    transformSourceProps<JSX.SourceHTMLAttributes<HTMLSourceElement>>({ ...others }),
  );

  return <source {...sourceProps()} data-slot="image-source" class={local.class} />;
}

export { Image, ImageSource };
import type { UnpicImageProps, UnpicSourceProps } from '@unpic/core';
import { transformProps, transformSourceProps } from '@unpic/core';
import { createMemo, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

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
    return transformProps<JSX.ImgHTMLAttributes<HTMLImageElement>>({
      ...others,
      loading: others.loading ?? (others.priority ? 'eager' : 'lazy'),
      decoding: others.decoding ?? (others.priority ? undefined : 'async'),
      fetchpriority: local.fetchpriority ?? (others.priority ? 'high' : undefined),
    } as ImageTransformProps);
  });

  return <img {...imageProps()} data-slot="image-root" class={cn('rounded-md', local.class)} />;
}

function ImageSource(props: ImageSourceProps) {
  const [local, others] = splitProps(props, ['class']);
  const sourceProps = createMemo(() =>
    transformSourceProps<JSX.SourceHTMLAttributes<HTMLSourceElement>>({ ...others }),
  );

  return <source {...sourceProps()} data-slot="image-source" class={local.class} />;
}

export { Image, ImageSource };
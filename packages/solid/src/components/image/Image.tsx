import type { UnpicImageProps, UnpicSourceProps } from '@unpic/core';
import { transformProps, transformSourceProps } from '@unpic/core';
import { transformBaseImageProps } from '@unpic/core/base';
import { clsx } from 'clsx';
import { createMemo, splitProps } from 'solid-js';
import type { JSX } from 'solid-js';
import { getProviderForUrl } from 'unpic';
import styles from './Image.module.css';

type ImageAttributes = JSX.ImgHTMLAttributes<HTMLImageElement>;

type ImageRootProps = Omit<UnpicImageProps<ImageAttributes>, 'fetchpriority'> & {
  fetchpriority?: ImageAttributes['fetchpriority'];
  style?: ImageAttributes['style'];
};

type ImageSourceProps = UnpicSourceProps &
  Omit<
    JSX.SourceHTMLAttributes<HTMLSourceElement>,
    'height' | 'media' | 'sizes' | 'src' | 'srcset' | 'type' | 'width'
  >;

function Image(props: ImageRootProps) {
  const [local, others] = splitProps(props, ['class']);
  const imageProps = createMemo(() => {
    const input = { ...others } as UnpicImageProps<ImageAttributes>;
    // Without a CDN, Unpic returns props unchanged; the base transform still applies its loading
    // defaults and layout styles and drops Unpic-only props such as `layout` and `priority`.
    const hasCdn = input.cdn ?? (getProviderForUrl(input.src) || input.fallback);
    return hasCdn
      ? transformProps<ImageAttributes>(input)
      : transformBaseImageProps<never, never, ImageAttributes>(input as never);
  });

  // oxlint-disable-next-line jsx-a11y/alt-text -- `alt` arrives through the transformed props.
  return <img {...imageProps()} data-slot="image-root" class={clsx(styles.root, local.class)} />;
}

function ImageSource(props: ImageSourceProps) {
  const sourceProps = createMemo(() =>
    transformSourceProps<JSX.SourceHTMLAttributes<HTMLSourceElement>>({ ...props }),
  );

  return <source {...sourceProps()} data-slot="image-source" />;
}

export { Image, ImageSource };
export type { ImageRootProps, ImageSourceProps };
import { Image as UnpicImage, Source as UnpicSource } from '@unpic/solid';
import type { ImageProps as UnpicImageProps, SourceProps as UnpicSourceProps } from '@unpic/solid';
import { clsx } from 'clsx';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import styles from './Image.module.css';

type ImageProps = Omit<UnpicImageProps, 'fetchpriority' | 'style'> & {
  fetchpriority?: JSX.ImgHTMLAttributes<HTMLImageElement>['fetchpriority'];
  style?: JSX.ImgHTMLAttributes<HTMLImageElement>['style'];
  class?: string;
  ref?: (element: HTMLImageElement) => void;
};

type ImageSourceProps = Omit<UnpicSourceProps, 'class'> & {
  class?: string;
  ref?: (element: HTMLSourceElement) => void;
};

function Image(props: ImageProps) {
  const [local, others] = splitProps(props, ['class', 'fetchpriority', 'style']);

  return (
    <UnpicImage
      {...(others as UnpicImageProps)}
      {...(local.fetchpriority !== undefined
        ? { fetchpriority: local.fetchpriority as never }
        : {})}
      {...(local.style !== undefined ? { style: local.style as never } : {})}
      data-slot="image-root"
      class={clsx(styles.root, local.class)}
    />
  );
}

function ImageSource(props: ImageSourceProps) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <UnpicSource
      {...(others as UnpicSourceProps)}
      {...(local.class !== undefined ? { class: local.class as never } : {})}
      data-slot="image-source"
    />
  );
}

export { Image, ImageSource };
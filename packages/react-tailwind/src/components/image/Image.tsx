import { transformBaseImageProps } from '@unpic/core/base';
import type { ImageProps as UnpicImageProps, SourceProps as UnpicSourceProps } from '@unpic/react';
import { Image as ImagePrimitive, Source as ImageSourcePrimitive } from '@unpic/react';
import { forwardRef, type CSSProperties } from 'react';
import { getProviderForUrl } from 'unpic';
import { cn } from '@/lib/moduix/cn';

type ImageRootProps = UnpicImageProps & { style?: CSSProperties };

type ImageSourceProps = UnpicSourceProps;

const Image = forwardRef<HTMLImageElement, ImageRootProps>(function Image(
  { className, fetchPriority, ...props },
  ref,
) {
  // Unpic writes its priority default to the lowercase attribute, so merge React's spelling first.
  const input = {
    ...props,
    fetchpriority: fetchPriority ?? props.fetchpriority,
  } as UnpicImageProps;
  // Without a CDN, Unpic returns props unchanged; the base transform still applies its loading
  // defaults and layout styles and drops Unpic-only props such as `layout` and `priority`.
  const hasCdn = Boolean(input.cdn ?? (getProviderForUrl(input.src) || input.fallback));

  return (
    <ImagePrimitive
      ref={ref}
      {...(hasCdn ? input : (transformBaseImageProps(input as never) as UnpicImageProps))}
      data-slot="image-root"
      className={cn('rounded-md', className)}
    />
  );
});

const ImageSource = forwardRef<HTMLSourceElement, ImageSourceProps>(
  function ImageSource(props, ref) {
    return <ImageSourcePrimitive ref={ref} {...props} data-slot="image-source" />;
  },
);

export { Image, ImageSource };
export type { ImageRootProps, ImageSourceProps };
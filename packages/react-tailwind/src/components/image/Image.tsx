import type { ImageProps as UnpicImageProps, SourceProps as UnpicSourceProps } from '@unpic/react';
import { Image as ImagePrimitive, Source as ImageSourcePrimitive } from '@unpic/react';
import {
  forwardRef,
  type CSSProperties,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from 'react';
import { cn } from '@/lib/moduix/cn';

type ImageProps = UnpicImageProps & { style?: CSSProperties };

const Image = forwardRef<HTMLImageElement, ImageProps>(function Image(
  { className, fetchPriority, fetchpriority, ...props },
  ref,
) {
  return (
    <ImagePrimitive
      ref={ref}
      {...(props as UnpicImageProps)}
      fetchpriority={(fetchPriority ?? fetchpriority) as 'high' | 'low' | undefined}
      data-slot="image-root"
      className={cn('rounded-md', className)}
    />
  );
});

const ImageSource: ForwardRefExoticComponent<UnpicSourceProps & RefAttributes<HTMLSourceElement>> =
  forwardRef<HTMLSourceElement, UnpicSourceProps>(function ImageSource(props, ref) {
    return <ImageSourcePrimitive ref={ref} {...props} data-slot="image-source" />;
  });

export { Image, ImageSource };
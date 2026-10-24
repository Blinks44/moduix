import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';

const containerVariants = cva(
  'mx-auto w-full min-w-0 max-w-[calc(var(--_container-max-width)_+_var(--_container-gutter)*2)] px-(--_container-gutter)',
  {
    variants: {
      size: {
        xs: '[--_container-max-width:40rem]',
        sm: '[--_container-max-width:48rem]',
        md: '[--_container-max-width:64rem]',
        lg: '[--_container-max-width:72rem]',
        xl: '[--_container-max-width:90rem]',
        full: 'max-w-none',
      },
      gutter: {
        none: '[--_container-gutter:0px]',
        sm: '[--_container-gutter:clamp(var(--moduix-spacing-3),3vw,var(--moduix-spacing-6))]',
        md: '[--_container-gutter:clamp(var(--moduix-spacing-4),4vw,var(--moduix-spacing-8))]',
        lg: '[--_container-gutter:clamp(var(--moduix-spacing-6),5vw,3rem)]',
      },
    },
    defaultVariants: {
      size: 'lg',
      gutter: 'md',
    },
  },
);

type ContainerRootProps = HTMLArkProps<'div'> & {
  size?: ContainerSize;
  gutter?: ContainerGutter;
};

const Container = forwardRef<HTMLDivElement, ContainerRootProps>(function Container(
  { size = 'lg', gutter = 'md', className, ...props },
  ref,
) {
  return (
    <ark.div
      {...props}
      ref={ref}
      data-scope="container"
      data-part="root"
      data-slot="container-root"
      data-size={size}
      data-gutter={gutter}
      className={cn(containerVariants({ size, gutter }), className)}
    />
  );
});

export { Container };
export type { ContainerGutter, ContainerRootProps, ContainerSize };
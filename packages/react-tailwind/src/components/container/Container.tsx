import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type ContainerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type ContainerGutter = 'none' | 'sm' | 'md' | 'lg';

const containerVariants = cva('w-full min-w-0 mx-auto', {
  variants: {
    size: {
      xs: 'max-w-[calc(40rem_+_(clamp(1rem,4vw,2rem)*2))]',
      sm: 'max-w-[calc(48rem_+_(clamp(1rem,4vw,2rem)*2))]',
      md: 'max-w-[calc(64rem_+_(clamp(1rem,4vw,2rem)*2))]',
      lg: 'max-w-[calc(72rem_+_(clamp(1rem,4vw,2rem)*2))]',
      xl: 'max-w-[calc(90rem_+_(clamp(1rem,4vw,2rem)*2))]',
      full: 'max-w-none',
    },
    gutter: {
      none: 'px-0',
      sm: 'px-[clamp(0.75rem,3vw,1.5rem)]',
      md: 'px-[clamp(1rem,4vw,2rem)]',
      lg: 'px-[clamp(1.5rem,5vw,3rem)]',
    },
  },
  compoundVariants: [
    { size: 'xs', gutter: 'none', class: 'max-w-[40rem]' },
    { size: 'xs', gutter: 'sm', class: 'max-w-[calc(40rem_+_(clamp(0.75rem,3vw,1.5rem)*2))]' },
    { size: 'xs', gutter: 'lg', class: 'max-w-[calc(40rem_+_(clamp(1.5rem,5vw,3rem)*2))]' },
    { size: 'sm', gutter: 'none', class: 'max-w-[48rem]' },
    { size: 'sm', gutter: 'sm', class: 'max-w-[calc(48rem_+_(clamp(0.75rem,3vw,1.5rem)*2))]' },
    { size: 'sm', gutter: 'lg', class: 'max-w-[calc(48rem_+_(clamp(1.5rem,5vw,3rem)*2))]' },
    { size: 'md', gutter: 'none', class: 'max-w-[64rem]' },
    { size: 'md', gutter: 'sm', class: 'max-w-[calc(64rem_+_(clamp(0.75rem,3vw,1.5rem)*2))]' },
    { size: 'md', gutter: 'lg', class: 'max-w-[calc(64rem_+_(clamp(1.5rem,5vw,3rem)*2))]' },
    { size: 'lg', gutter: 'none', class: 'max-w-[72rem]' },
    { size: 'lg', gutter: 'sm', class: 'max-w-[calc(72rem_+_(clamp(0.75rem,3vw,1.5rem)*2))]' },
    { size: 'lg', gutter: 'lg', class: 'max-w-[calc(72rem_+_(clamp(1.5rem,5vw,3rem)*2))]' },
    { size: 'xl', gutter: 'none', class: 'max-w-[90rem]' },
    { size: 'xl', gutter: 'sm', class: 'max-w-[calc(90rem_+_(clamp(0.75rem,3vw,1.5rem)*2))]' },
    { size: 'xl', gutter: 'lg', class: 'max-w-[calc(90rem_+_(clamp(1.5rem,5vw,3rem)*2))]' },
  ],
  defaultVariants: {
    size: 'lg',
    gutter: 'md',
  },
});

type ContainerProps = HTMLArkProps<'div'> & {
  size?: ContainerSize;
  gutter?: ContainerGutter;
};

const Container = forwardRef<ComponentRef<typeof ark.div>, ContainerProps>(function Container(
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
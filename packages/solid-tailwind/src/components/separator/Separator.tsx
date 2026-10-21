import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type SeparatorOrientation = 'horizontal' | 'vertical';
type SeparatorSize = 'xs' | 'sm' | 'md' | 'lg';
type SeparatorVariant = 'solid' | 'dashed' | 'dotted';

type SeparatorRootProps = HTMLArkProps<'span'> & {
  orientation?: SeparatorOrientation;
  size?: SeparatorSize;
  variant?: SeparatorVariant;
};

const separatorVariants = cva('block shrink-0 m-0 border-border', {
  variants: {
    orientation: {
      horizontal: 'h-0 w-full',
      vertical: 'h-[1em] w-0',
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
    },
    variant: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'xs', class: 'border-t-[0.5px]' },
    { orientation: 'horizontal', size: 'sm', class: 'border-t' },
    { orientation: 'horizontal', size: 'md', class: 'border-t-2' },
    { orientation: 'horizontal', size: 'lg', class: 'border-t-[3px]' },
    { orientation: 'vertical', size: 'xs', class: 'border-s-[0.5px]' },
    { orientation: 'vertical', size: 'sm', class: 'border-s' },
    { orientation: 'vertical', size: 'md', class: 'border-s-2' },
    { orientation: 'vertical', size: 'lg', class: 'border-s-[3px]' },
  ],
});

function Separator(props: SeparatorRootProps) {
  const [local, others] = splitProps(props, [
    'aria-orientation',
    'class',
    'orientation',
    'role',
    'size',
    'variant',
  ]);
  const orientation = () => local.orientation ?? 'horizontal';
  const role = () => local.role ?? 'separator';
  const size = () => local.size ?? 'sm';
  const variant = () => local.variant ?? 'solid';

  return (
    <ark.span
      {...others}
      role={role()}
      aria-orientation={role() === 'separator' ? orientation() : undefined}
      data-scope="separator"
      data-part="root"
      data-slot="separator-root"
      data-orientation={orientation()}
      data-size={size()}
      data-variant={variant()}
      class={cn(
        separatorVariants({ orientation: orientation(), size: size(), variant: variant() }),
        local.class,
      )}
    />
  );
}

export { Separator };
export type { SeparatorOrientation, SeparatorRootProps, SeparatorSize, SeparatorVariant };
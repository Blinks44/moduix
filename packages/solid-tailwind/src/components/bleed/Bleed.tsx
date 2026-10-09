import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type BleedAmount = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedInline = BleedAmount | 'full';

const bleedVariants = cva('', {
  variants: {
    inline: {
      none: null,
      xs: '-mx-1',
      sm: '-mx-2',
      md: '-mx-3',
      lg: '-mx-4',
      xl: '-mx-6',
      full: 'mx-[calc(50%_-_50vi)] [inline-size:100vi]',
    },
    block: {
      none: null,
      xs: '-my-1',
      sm: '-my-2',
      md: '-my-3',
      lg: '-my-4',
      xl: '-my-6',
    },
  },
  defaultVariants: {
    inline: 'full',
    block: 'none',
  },
});

type BleedRootProps = HTMLArkProps<'div'> & {
  inline?: BleedInline;
  block?: BleedAmount;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
  'data-inline'?: string;
  'data-block'?: string;
};

function Bleed(props: BleedRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'block',
    'class',
    'inline',
    'data-scope',
    'data-part',
    'data-slot',
    'data-inline',
    'data-block',
  ]);

  return (
    <ark.div
      asChild={local.asChild}
      {...others}
      data-scope="bleed"
      data-part="root"
      data-slot="bleed-root"
      data-inline={local.inline ?? 'full'}
      data-block={local.block ?? 'none'}
      class={cn(bleedVariants({ inline: local.inline, block: local.block }), local.class)}
    />
  );
}

export { Bleed };
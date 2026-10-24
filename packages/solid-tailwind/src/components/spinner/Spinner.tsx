import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';

type SpinnerSize = 'inherit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const spinnerVariants = cva('inline-flex shrink-0 items-center justify-center align-middle', {
  variants: {
    size: {
      inherit: 'size-[1em]',
      xs: 'size-3',
      sm: 'size-4',
      md: 'size-5',
      lg: 'size-7',
      xl: 'size-control-md',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type SpinnerRootProps = HTMLArkProps<'span'> & {
  size?: SpinnerSize;
  decorative?: boolean;
};

function Spinner(props: SpinnerRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'decorative',
    'aria-label',
    'size',
  ]);
  const size = () => local.size ?? 'md';

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="spinner"
      data-part="root"
      data-slot="spinner-root"
      data-size={size()}
      role={local.decorative ? undefined : 'status'}
      aria-hidden={local.decorative || undefined}
      aria-label={
        local['aria-label'] ??
        (local.decorative || others['aria-labelledby'] ? undefined : a11yLabels.loading)
      }
      class={cn(spinnerVariants({ size: size() }), local.class)}
    >
      <span
        data-scope="spinner"
        data-part="indicator"
        data-slot="spinner-indicator"
        class="inline-flex size-full animate-(--moduix-animation-spin) items-center justify-center [&_svg]:size-full"
        aria-hidden="true"
      >
        {local.children ?? (
          <span
            data-scope="spinner"
            data-part="ring"
            data-slot="spinner-ring"
            class="box-border block size-full rounded-full border-2 border-solid border-current/[22%] [border-block-start-color:currentColor]"
          />
        )}
      </span>
    </ark.span>
  );
}

export { Spinner };
export type { SpinnerRootProps, SpinnerSize };
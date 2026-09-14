import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
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

type SpinnerProps = HTMLArkProps<'span'> & {
  size?: SpinnerSize;
  decorative?: boolean;
};

function SpinnerRoot(props: SpinnerProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'children',
    'class',
    'decorative',
    'aria-label',
    'aria-labelledby',
    'size',
  ]);
  const decorative = () => local.decorative ?? false;
  const size = () => local.size ?? 'md';
  const accessibleLabel = () =>
    decorative()
      ? undefined
      : (local['aria-label'] ?? (local['aria-labelledby'] ? undefined : 'Loading'));

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="spinner"
      data-part="root"
      data-slot="spinner-root"
      data-size={size()}
      role={decorative() && !local.asChild ? 'presentation' : decorative() ? undefined : 'status'}
      aria-hidden={decorative() && !local.asChild ? true : undefined}
      aria-label={accessibleLabel()}
      aria-labelledby={decorative() ? undefined : local['aria-labelledby']}
      class={cn(spinnerVariants({ size: size() }), local.class)}
    >
      <span
        data-scope="spinner"
        data-part="indicator"
        data-slot="spinner-indicator"
        class="inline-flex size-full animate-[var(--moduix-animation-spin)] items-center justify-center motion-reduce:animate-none [&_svg]:size-full"
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

const Spinner = Object.assign(SpinnerRoot, {
  Root: SpinnerRoot,
});

export { Spinner };
import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import type { FieldInputProps } from '@ark-ui/solid/field';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type InputRootProps = Omit<FieldInputProps, 'size'> & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  htmlSize?: FieldInputProps['size'];
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

const inputVariants = cva(
  'w-full max-w-none rounded-md border border-border bg-background px-3 py-1 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:focus-visible:outline-destructive aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive motion-reduce:transition-none file:me-3 file:rounded-md file:border file:border-primary file:bg-primary file:px-2 file:py-0.5 file:font-medium file:text-primary-foreground file:transition-colors file:duration-200 file:ease-in-out file:cursor-pointer [@media(hover:hover)]:file:hover:bg-foreground',
  {
    variants: {
      size: {
        xs: 'min-h-control-xs px-2 py-0.5 text-xs leading-4',
        sm: 'min-h-control-sm px-2 py-1 text-sm leading-5',
        md: 'min-h-control-md',
        lg: 'min-h-control-lg px-4 py-1 text-lg leading-7',
        xl: 'min-h-control-xl px-4 py-2 text-lg leading-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

function InputRoot(props: InputRootProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'size',
    'htmlSize',
    'data-scope',
    'data-part',
    'data-slot',
  ]);

  return (
    <FieldPrimitive.Input
      asChild={local.asChild}
      {...others}
      data-scope="field"
      data-part="input"
      data-slot="input-root"
      data-size={local.size ?? 'md'}
      data-html-size={local.htmlSize === undefined ? undefined : ''}
      class={cn(
        inputVariants({ size: local.size }),
        local.htmlSize === undefined ? undefined : 'w-auto',
        local.class,
      )}
      size={local.htmlSize}
    />
  );
}

const Input = Object.assign(InputRoot, {
  Root: InputRoot,
});

export { Input };
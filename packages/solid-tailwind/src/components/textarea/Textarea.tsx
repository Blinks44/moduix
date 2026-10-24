import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import type { FieldTextareaProps } from '@ark-ui/solid/field';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type TextareaRootProps = FieldTextareaProps & {
  defaultValue?: string | number | readonly string[];
  size?: TextareaSize;
};

const textareaVariants = cva(
  'w-full resize-y rounded-md border border-border bg-background text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive data-invalid:border-destructive data-invalid:focus-visible:outline-destructive',
  {
    variants: {
      size: {
        xs: 'px-2 py-1 text-xs leading-4',
        sm: 'px-2 py-1.5 text-sm leading-5',
        md: 'px-3 py-2 text-md leading-6',
        lg: 'px-4 py-2.5 text-lg leading-7',
        xl: 'px-4 py-3 text-lg leading-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

function Textarea(props: TextareaRootProps) {
  const [local, others] = splitProps(props, ['class', 'defaultValue', 'size']);

  return (
    <FieldPrimitive.Textarea
      {...others}
      {...{ 'prop:defaultValue': local.defaultValue }}
      data-scope="field"
      data-part="textarea"
      data-slot="textarea-root"
      data-size={local.size ?? 'md'}
      class={cn(textareaVariants({ size: local.size }), local.class)}
    />
  );
}

export { Textarea };
export type { TextareaRootProps, TextareaSize };
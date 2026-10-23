import { Field as FieldPrimitive } from '@ark-ui/react/field';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type TextareaRootProps = ComponentProps<typeof FieldPrimitive.Textarea> & {
  size?: TextareaSize;
};

const textareaVariants = cva(
  'w-full resize-y rounded-md border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive data-invalid:border-destructive data-invalid:focus-visible:outline-destructive',
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

const Textarea = forwardRef<HTMLTextAreaElement, TextareaRootProps>(function Textarea(
  { className, size = 'md', ...props },
  ref,
) {
  return (
    <FieldPrimitive.Textarea
      {...props}
      ref={ref}
      data-scope="field"
      data-part="textarea"
      data-slot="textarea-root"
      data-size={size}
      className={cn(textareaVariants({ size }), className)}
    />
  );
});

export { Textarea };
export type { TextareaRootProps, TextareaSize };
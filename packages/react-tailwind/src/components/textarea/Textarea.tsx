import { Field as FieldPrimitive } from '@ark-ui/react/field';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const Textarea = forwardRef<
  ComponentRef<typeof FieldPrimitive.Textarea>,
  ComponentProps<typeof FieldPrimitive.Textarea>
>(function Textarea({ autoresize, className, ...props }, ref) {
  return (
    <FieldPrimitive.Textarea
      ref={ref}
      {...props}
      data-scope="field"
      data-part="textarea"
      data-slot="textarea-root"
      data-autoresize={autoresize ? '' : undefined}
      className={cn(
        'min-h-24 w-full max-w-none resize-y rounded-md border border-border bg-background px-3.5 py-2 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive data-autoresize:overflow-y-hidden data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        className,
      )}
      autoresize={autoresize}
    />
  );
});

export { Textarea };
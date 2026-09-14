import { Field as FieldPrimitive } from '@ark-ui/solid/field';
import type { FieldTextareaProps } from '@ark-ui/solid/field';
import { createEffect, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type TextareaProps = FieldTextareaProps & {
  defaultValue?: string | number | readonly string[];
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

function Textarea(props: TextareaProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'autoresize',
    'class',
    'defaultValue',
    'data-scope',
    'data-part',
    'data-slot',
    'ref',
  ]);
  let textareaRef: HTMLTextAreaElement | undefined;

  createEffect(() => {
    if (textareaRef) textareaRef.defaultValue = String(local.defaultValue ?? '');
  });

  return (
    <FieldPrimitive.Textarea
      asChild={local.asChild}
      {...others}
      {...(local.asChild ? { 'prop:defaultValue': local.defaultValue } : {})}
      data-scope="field"
      data-part="textarea"
      data-slot="textarea-root"
      data-autoresize={local.autoresize ? '' : undefined}
      class={cn(
        'min-h-24 w-full max-w-none resize-y rounded-md border border-border bg-background px-3.5 py-2 text-md leading-6 text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive data-autoresize:overflow-y-hidden data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:focus-visible:outline-destructive motion-reduce:transition-none',
        local.class,
      )}
      autoresize={local.autoresize}
      ref={(element) => {
        textareaRef = element;
        if (typeof local.ref === 'function') local.ref(element);
      }}
    />
  );
}

export { Textarea };
<script module lang="ts">
  import type { FieldTextareaProps as ArkFieldTextareaProps } from '@ark-ui/svelte/field';

  export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface TextareaRootProps extends ArkFieldTextareaProps {
    size?: TextareaSize;
  }
</script>

<script lang="ts">
  import { FieldTextarea } from '@ark-ui/svelte/field';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const textareaVariants = cva(
    'w-full resize-y rounded-md border border-input bg-background text-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring/50 focus-visible:border-ring disabled:pointer-events-none disabled:opacity-disabled data-disabled:pointer-events-none data-disabled:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive/20 data-invalid:border-destructive data-invalid:focus-visible:outline-destructive/20',
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

  let {
    class: className,
    ref = $bindable(null),
    size = 'md',
    value = $bindable(),
    ...props
  }: TextareaRootProps = $props();
</script>

<FieldTextarea
  {...props}
  bind:ref
  bind:value
  class={cn(textareaVariants({ size }), className)}
  data-scope="field"
  data-part="textarea"
  data-slot="textarea-root"
  data-size={size}
/>
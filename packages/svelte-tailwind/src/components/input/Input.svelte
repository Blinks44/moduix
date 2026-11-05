<script module lang="ts">
  import type { FieldInputProps as ArkFieldInputProps } from '@ark-ui/svelte/field';

  export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  export interface InputRootProps extends Omit<ArkFieldInputProps, 'size'> {
    htmlSize?: ArkFieldInputProps['size'];
    size?: InputSize;
  }
</script>

<script lang="ts">
  import { FieldInput } from '@ark-ui/svelte/field';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const inputVariants = cva(
    'w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-md leading-6 text-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring/50 focus-visible:border-ring disabled:pointer-events-none disabled:opacity-disabled [[data-slot=input-group-root]:has([data-slot=input-root]:is([data-disabled],:disabled))_&]:opacity-100 [:is([data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100 data-disabled:pointer-events-none data-disabled:opacity-disabled data-invalid:border-destructive data-invalid:focus-visible:outline-destructive/20 aria-invalid:border-destructive aria-invalid:focus-visible:outline-destructive/20 file:me-3 file:rounded-md file:border file:border-primary file:bg-primary file:px-2 file:py-0.5 file:font-medium file:text-primary-foreground file:transition-colors file:duration-normal file:ease-in-out file:cursor-pointer [@media(hover:hover)]:file:hover:bg-foreground [[data-slot=field-root][data-disabled]_&]:opacity-100 [[data-slot=field-root-provider][data-disabled]_&]:opacity-100',
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

  let {
    class: className,
    htmlSize,
    ref = $bindable(null),
    size = 'md',
    value = $bindable(),
    ...props
  }: InputRootProps = $props();
</script>

<FieldInput
  {...props}
  bind:ref
  bind:value
  size={htmlSize}
  class={cn(inputVariants({ size }), htmlSize !== undefined && 'w-auto', className)}
  data-scope="field"
  data-part="input"
  data-slot="input-root"
  data-size={size}
/>
<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type TableSize = 'sm' | 'md' | 'lg';

  export interface TableRootProps
    extends HTMLProps<'table'>, PolymorphicProps<'table'>, RefAttribute {
    interactive?: boolean;
    showColumnBorder?: boolean;
    size?: TableSize;
    stickyHeader?: boolean;
    striped?: boolean;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const tableVariants = cva(
    'group/table isolate w-full border-collapse text-start text-foreground',
    {
      variants: {
        size: {
          sm: 'text-xs leading-4',
          md: 'text-sm leading-5',
          lg: 'text-md leading-6',
        },
      },
      defaultVariants: {
        size: 'md',
      },
    },
  );

  let {
    class: className,
    interactive = false,
    ref = $bindable(null),
    showColumnBorder = false,
    size = 'md',
    stickyHeader = false,
    striped = false,
    ...props
  }: TableRootProps = $props();
</script>

<Ark
  as="table"
  {...props}
  bind:ref
  class={cn(tableVariants({ size }), className)}
  data-scope="table"
  data-part="root"
  data-interactive={interactive || undefined}
  data-show-column-border={showColumnBorder || undefined}
  data-size={size}
  data-sticky-header={stickyHeader || undefined}
  data-striped={striped || undefined}
  data-slot="table-root"
/>
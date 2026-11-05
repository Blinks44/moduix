<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

  export interface AlertRootProps extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    status?: AlertStatus;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const alertVariants = cva(
    'flex w-full min-w-0 items-start gap-3 rounded-lg border bg-card p-3 text-card-foreground',
    {
      variants: {
        status: {
          info: 'border-border [--_alert-indicator-color:var(--color-muted-foreground)]',
          success:
            'border-success/34 bg-[color-mix(in_oklab,var(--color-success)_10%,var(--color-background))] text-foreground [--_alert-indicator-color:color-mix(in_oklab,var(--color-success)_70%,var(--color-foreground))]',
          warning:
            'border-warning/38 bg-[color-mix(in_oklab,var(--color-warning)_13%,var(--color-background))] text-foreground [--_alert-indicator-color:color-mix(in_oklab,var(--color-warning)_70%,var(--color-foreground))]',
          error:
            'border-destructive/35 bg-[color-mix(in_oklab,var(--color-destructive)_9%,var(--color-background))] text-foreground [--_alert-indicator-color:var(--color-destructive)]',
        },
      },
      defaultVariants: {
        status: 'info',
      },
    },
  );

  let {
    class: className,
    ref = $bindable(null),
    status = 'info',
    ...props
  }: AlertRootProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(alertVariants({ status }), className)}
  data-scope="alert"
  data-part="root"
  data-status={status}
  data-slot="alert-root"
/>
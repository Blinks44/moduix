<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

  export interface AlertRootProps extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {
    status?: AlertStatus;
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Alert.module.css';
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
  class={clsx(styles.root, className)}
  data-scope="alert"
  data-part="root"
  data-status={status}
  data-slot="alert-root"
/>
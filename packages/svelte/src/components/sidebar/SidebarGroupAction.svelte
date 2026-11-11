<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarGroupActionProps
    extends HTMLProps<'button'>, PolymorphicProps<'button'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import styles from './Sidebar.module.css';

  let {
    class: className,
    ref = $bindable(null),
    type = 'button',
    ...props
  }: SidebarGroupActionProps = $props();
</script>

<Ark
  as="button"
  {...props}
  bind:ref
  {type}
  class={clsx(styles.groupAction, className)}
  data-scope="sidebar"
  data-part="group-action"
  data-slot="sidebar-group-action"
/>
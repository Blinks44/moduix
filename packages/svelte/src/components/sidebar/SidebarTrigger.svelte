<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarTriggerProps
    extends HTMLProps<'button'>, PolymorphicProps<'button'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
  import { useSidebar } from './context';
  import styles from './Sidebar.module.css';

  let {
    children,
    class: className,
    onclick,
    ref = $bindable(null),
    type = 'button',
    'aria-label': ariaLabel,
    ...props
  }: SidebarTriggerProps = $props();

  const sidebar = useSidebar();

  const handleClick: SidebarTriggerProps['onclick'] = (event) => {
    onclick?.(event);
    if (!event.defaultPrevented) sidebar.toggleSidebar();
  };
</script>

<Ark
  as="button"
  {...props}
  bind:ref
  {type}
  aria-label={typeof ariaLabel === 'string' ? ariaLabel : a11yLabels.toggleSidebar}
  aria-expanded={!sidebar.collapsed}
  class={clsx(styles.trigger, className)}
  onclick={handleClick}
  data-side={sidebar.side}
  data-state={sidebar.state}
  data-scope="sidebar"
  data-part="trigger"
  data-slot="sidebar-trigger"
>
  {#if children}
    {@render children()}
  {:else}
    <ChevronLeftIcon />
  {/if}
</Ark>
<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { useFloatingPanelContext } from '@ark-ui/svelte/floating-panel';
  import { clsx } from 'clsx';
  import styles from './FloatingPanel.module.css';

  type Props = HTMLProps<'div'> & PolymorphicProps<'div'> & RefAttribute;

  let { class: className, ref = $bindable(null), ...props }: Props = $props();

  const floatingPanel = useFloatingPanelContext();
  const dataMinimized = $derived(
    (floatingPanel().getContentProps() as { 'data-minimized'?: string })['data-minimized'],
  );
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={clsx(styles.footer, className)}
  data-minimized={dataMinimized}
  data-slot="floating-panel-footer"
/>
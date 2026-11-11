<script lang="ts">
  import { HoverCardContent, type HoverCardContentProps } from '@ark-ui/svelte/hover-card';
  import { clsx } from 'clsx';
  import styles from './HoverCard.module.css';

  let { class: className, ref = $bindable(null), ...props }: HoverCardContentProps = $props();
</script>

<HoverCardContent
  {...props}
  bind:ref
  class={clsx(styles.content, className)}
  data-slot="hover-card-content"
/>
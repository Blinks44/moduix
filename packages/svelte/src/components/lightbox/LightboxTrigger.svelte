<script lang="ts">
  import { Trigger as DialogTrigger, type DialogTriggerProps } from '@ark-ui/svelte/dialog';
  import { clsx } from 'clsx';
  import styles from './Lightbox.module.css';

  let { class: className, ref = $bindable(null), ...props }: DialogTriggerProps = $props();
</script>

<DialogTrigger
  {...props}
  bind:ref
  class={clsx(styles.trigger, className)}
  data-slot="lightbox-trigger"
/>
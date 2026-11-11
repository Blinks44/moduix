<script lang="ts">
  import { TourCloseTrigger, type TourCloseTriggerProps } from '@ark-ui/svelte/tour';

  let { class: className, ref = $bindable(null), ...props }: TourCloseTriggerProps = $props();
</script>

<TourCloseTrigger {...props} bind:ref class={className} data-slot="tour-close-trigger" />
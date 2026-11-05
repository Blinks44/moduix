<script lang="ts">
  import {
    SegmentGroupItemText,
    type SegmentGroupItemTextProps,
  } from '@ark-ui/svelte/segment-group';

  let { ref = $bindable(null), ...props }: SegmentGroupItemTextProps = $props();
</script>

<SegmentGroupItemText {...props} bind:ref data-slot="segment-group-item-text" />
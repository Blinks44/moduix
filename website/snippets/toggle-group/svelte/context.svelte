<script lang="ts">
  import { ToggleGroup } from '@moduix/svelte/toggle-group';
  import AlignmentItem from './AlignmentItem.svelte';
</script>

<ToggleGroup defaultValue={['left']} aria-label="Text alignment">
  <AlignmentItem value="left">Left</AlignmentItem>
  <AlignmentItem value="center">Center</AlignmentItem>
  <AlignmentItem value="right">Right</AlignmentItem>
</ToggleGroup>
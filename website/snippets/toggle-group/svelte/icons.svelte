<script lang="ts">
  import {
    AlignCenter as AlignCenterIcon,
    AlignLeft as AlignLeftIcon,
    AlignRight as AlignRightIcon,
  } from '@lucide/svelte';
  import { ToggleGroup, ToggleGroupItem } from '@moduix/svelte/toggle-group';
</script>

<ToggleGroup defaultValue={['left']} aria-label="Text alignment" size="icon-md">
  <ToggleGroupItem value="left" aria-label="Align left">
    <AlignLeftIcon aria-hidden="true" />
  </ToggleGroupItem>
  <ToggleGroupItem value="center" aria-label="Align center">
    <AlignCenterIcon aria-hidden="true" />
  </ToggleGroupItem>
  <ToggleGroupItem value="right" aria-label="Align right">
    <AlignRightIcon aria-hidden="true" />
  </ToggleGroupItem>
</ToggleGroup>
<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@/components/toggle-group';

  let { defaultValue = ['left'] }: { defaultValue?: string[] } = $props();

  let focus = $state<{ loopFocus?: boolean; orientation: 'horizontal' | 'vertical' }>({
    loopFocus: undefined,
    orientation: 'horizontal',
  });

  export const setFocus = (next: { loopFocus?: boolean; orientation: 'horizontal' | 'vertical' }) =>
    (focus = next);
</script>

<button type="button">Before</button>
<ToggleGroup
  {defaultValue}
  loopFocus={focus.loopFocus}
  orientation={focus.orientation}
  aria-label="Navigation"
>
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="disabled" disabled>Disabled</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>
<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from '@moduix/svelte/toggle-group';
</script>

<ToggleGroup multiple defaultValue={['bold', 'italic']} aria-label="Text formatting" size="md">
  <ToggleGroupItem value="bold" aria-label="Bold"><strong>B</strong></ToggleGroupItem>
  <ToggleGroupItem value="italic" aria-label="Italic"><em>I</em></ToggleGroupItem>
  <ToggleGroupItem value="underline" aria-label="Underline"><u>U</u></ToggleGroupItem>
</ToggleGroup>
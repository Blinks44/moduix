<script module lang="ts">
  import type { ComboboxContentProps } from '@ark-ui/svelte/combobox';

  export type ComboboxDropdownProps = ComboboxContentProps;
</script>

<script lang="ts">
  import ComboboxContent from './ComboboxContent.svelte';
  import ComboboxPositioner from './ComboboxPositioner.svelte';

  let { ref = $bindable(null), ...props }: ComboboxDropdownProps = $props();
</script>

<ComboboxPositioner>
  <ComboboxContent {...props} bind:ref />
</ComboboxPositioner>
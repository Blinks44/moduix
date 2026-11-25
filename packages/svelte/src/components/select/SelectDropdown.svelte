<script module lang="ts">
  import type { SelectContentProps } from '@ark-ui/svelte/select';

  export type SelectDropdownProps = SelectContentProps;
</script>

<script lang="ts">
  import SelectContent from './SelectContent.svelte';
  import SelectPositioner from './SelectPositioner.svelte';

  let { ref = $bindable(null), ...props }: SelectDropdownProps = $props();
</script>

<SelectPositioner>
  <SelectContent {...props} bind:ref />
</SelectPositioner>
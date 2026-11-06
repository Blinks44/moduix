<script lang="ts">
  import { Popover, PopoverTrigger } from '@/components/popover';
  import PopoverSurface from './PopoverSurface.svelte';

  let value = $state('');
</script>

<Popover portalled={false} onTriggerValueChange={(details) => (value = details.value ?? '')}>
  <PopoverTrigger value="first">First</PopoverTrigger>
  <PopoverTrigger value="second">Second</PopoverTrigger>
  <PopoverSurface />
</Popover>
<output>{value}</output>
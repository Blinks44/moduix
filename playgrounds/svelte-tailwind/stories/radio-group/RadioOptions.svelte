<script lang="ts">
  import { RadioGroupOption } from '@/components/radio-group';

  let { items = ['React', 'Solid', 'Vue'] }: { items?: readonly string[] } = $props();
</script>

{#each items as item (item)}
  <RadioGroupOption value={item}>{item}</RadioGroupOption>
{/each}
<script lang="ts">
  import {
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
  } from '@/components/radio-group';

  let { items = ['React', 'Solid', 'Vue'] }: { items?: readonly string[] } = $props();
</script>

{#each items as item (item)}
  <RadioGroupItem value={item}>
    <RadioGroupItemControl />
    <RadioGroupItemText>{item}</RadioGroupItemText>
    <RadioGroupItemHiddenInput />
  </RadioGroupItem>
{/each}
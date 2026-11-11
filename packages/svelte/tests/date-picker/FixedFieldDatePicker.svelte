<script lang="ts">
  import { parseDate } from '@ark-ui/svelte/date-picker';
  import {
    DatePicker,
    DatePickerField,
    DatePickerLabel,
    DatePickerRangeField,
  } from '@/components/date-picker';
  import { translations } from './translations';

  let { component }: { component: 'field' | 'range' } = $props();
</script>

{#snippet ignored(props: () => Record<string, unknown>)}
  <button {...props()}>Ignored content</button>
{/snippet}

<DatePicker defaultValue={[parseDate('2026-06-22')]} {translations}>
  <DatePickerLabel>Fixed date</DatePickerLabel>
  <!-- The convenience fields own their tree, so a JavaScript-only asChild is ignored. -->
  {#if component === 'field'}
    <DatePickerField {...{ asChild: ignored }} data-testid="fixed-control" />
  {:else}
    <DatePickerRangeField {...{ asChild: ignored }} data-testid="fixed-control" />
  {/if}
</DatePicker>
<script lang="ts">
  import { SegmentGroup, SegmentGroupItems } from '@/components/segment-group';

  let { details }: { details: Array<string | null> } = $props();
  let value: string | null = $state('React');
</script>

<SegmentGroup
  bind:value
  aria-label="Framework"
  onValueChange={(event) => details.push(event.value)}
>
  <SegmentGroupItems
    items={[
      { value: 'React', label: 'React' },
      { value: 'Solid', label: 'Solid' },
    ]}
  />
</SegmentGroup>
<output>Current value: {value}</output>
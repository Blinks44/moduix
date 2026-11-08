<script lang="ts">
  import { ProgressLinear, ProgressLinearValueText } from '@/components/progress-linear';

  let text = $state('Uploaded');
  let valueRef: Element | null = $state(null);

  export const setText = (next: string) => (text = next);
  export const getRefs = () => ({ valueRef });
</script>

<ProgressLinear>
  <ProgressLinearValueText
    bind:ref={valueRef}
    class="consumer-value"
    title="Upload progress"
    data-testid="value"
  >
    {#snippet asChild(props)}
      <output {...props()}>{text}</output>
    {/snippet}
  </ProgressLinearValueText>
</ProgressLinear>
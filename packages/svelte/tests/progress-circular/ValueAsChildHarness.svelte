<script lang="ts">
  import { ProgressCircular, ProgressCircularValueText } from '@/components/progress-circular';

  let text = $state('Uploaded');
  let valueRef: Element | null = $state(null);

  export const setText = (next: string) => (text = next);
  export const getRefs = () => ({ valueRef });
</script>

<ProgressCircular>
  <ProgressCircularValueText
    bind:ref={valueRef}
    class="consumer-value"
    title="Upload progress"
    data-testid="value"
  >
    {#snippet asChild(props)}
      <output {...props()}>{text}</output>
    {/snippet}
  </ProgressCircularValueText>
</ProgressCircular>
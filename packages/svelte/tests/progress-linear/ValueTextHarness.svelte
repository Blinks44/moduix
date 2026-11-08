<script lang="ts">
  import { ProgressLinear, ProgressLinearValueText } from '@/components/progress-linear';

  let { onclick }: { onclick: (event: MouseEvent) => void } = $props();
  let value: number | null = $state(42);
  let custom = $state(false);
  let text = $state('Uploaded');
  let valueRef: Element | null = $state(null);

  export const setValue = (next: number | null) => (value = next);
  export const setCustom = (next: boolean) => (custom = next);
  export const setText = (next: string) => (text = next);
  export const getRefs = () => ({ valueRef });
</script>

{#snippet customText()}
  <strong>{text}</strong>
{/snippet}

<ProgressLinear {value}>
  <ProgressLinearValueText
    bind:ref={valueRef}
    class="consumer-value"
    style="color:red"
    title="Upload progress"
    data-testid="value"
    {onclick}
    children={custom ? customText : undefined}
  />
</ProgressLinear>
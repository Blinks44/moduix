<script lang="ts">
  import { InputGroup, InputGroupInput } from '@/components/input-group';

  let { asChild = false, changes }: { asChild?: boolean; changes: string[] } = $props();
  let value = $state('initial');

  export const setValue = (next: string) => (value = next);
</script>

<InputGroup>
  {#if asChild}
    <InputGroupInput bind:value oninput={(event) => changes.push(event.currentTarget.value)}>
      {#snippet asChild(props)}
        <input {...props()} aria-label="Project key" />
      {/snippet}
    </InputGroupInput>
  {:else}
    <InputGroupInput
      bind:value
      oninput={(event) => changes.push(event.currentTarget.value)}
      aria-label="Project key"
    />
  {/if}
</InputGroup>
<output>{value}</output>
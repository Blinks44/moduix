<script lang="ts">
  import { NativeSelect } from '@/components/native-select';

  let { asChild = false, changes }: { asChild?: boolean; changes: string[] } = $props();
  let selectRef: Element | null = $state(null);
  let value = $state('react');

  export const getRef = () => selectRef;
  export const getValue = () => value;
  export const setValue = (next: string) => (value = next);
</script>

{#if asChild}
  <NativeSelect
    bind:ref={selectRef}
    bind:value
    onchange={(event) => changes.push(event.currentTarget.value)}
  >
    {#snippet asChild(props)}
      <select {...props()} aria-label="Framework">
        <option value="react">React</option>
        <option value="vue">Vue</option>
      </select>
    {/snippet}
  </NativeSelect>
{:else}
  <NativeSelect
    bind:ref={selectRef}
    bind:value
    aria-label="Framework"
    onchange={(event) => changes.push(event.currentTarget.value)}
  >
    <option value="react">React</option>
    <option value="vue">Vue</option>
  </NativeSelect>
{/if}
<script lang="ts">
  import { InputGroup, InputGroupClearTrigger, InputGroupInput } from '@/components/input-group';

  let value = $state('moduix');
  let input: Element | null = $state(null);

  export const getValue = () => value;
</script>

<InputGroup>
  <InputGroupInput bind:ref={input} aria-label="Search" bind:value />
  {#if value}
    <InputGroupClearTrigger
      onclick={() => {
        value = '';
        (input as HTMLInputElement).focus();
      }}
    />
  {/if}
</InputGroup>
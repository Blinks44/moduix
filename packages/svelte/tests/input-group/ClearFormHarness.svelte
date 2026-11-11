<script lang="ts">
  import { InputGroup, InputGroupClearTrigger, InputGroupInput } from '@/components/input-group';

  let { clear, submit }: { clear: () => void; submit: () => void } = $props();
  let value = $state('moduix');
</script>

<form
  onsubmit={(event) => {
    event.preventDefault();
    submit();
  }}
>
  <InputGroup size="lg">
    <InputGroupInput aria-label="Search" bind:value />
    <InputGroupClearTrigger class="consumer-clear" data-slot="override" onclick={clear} />
  </InputGroup>
</form>
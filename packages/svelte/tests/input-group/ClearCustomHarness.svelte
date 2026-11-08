<script lang="ts">
  import { InputGroupClearTrigger } from '@/components/input-group';

  let { clear }: { clear: () => void } = $props();
  let trigger: Element | null = $state(null);

  export const getRefs = () => ({ trigger });
</script>

<span id="clear-label">Erase query</span>
<InputGroupClearTrigger bind:ref={trigger} aria-labelledby="clear-label" size="sm" onclick={clear}>
  {#snippet asChild(props)}
    <button {...props()} type="button">Custom icon</button>
  {/snippet}
</InputGroupClearTrigger>
<InputGroupClearTrigger aria-label="Disabled clear" disabled onclick={clear} />
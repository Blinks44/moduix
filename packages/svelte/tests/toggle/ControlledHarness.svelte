<script lang="ts">
  import { Toggle } from '@/components/toggle';
  import ToggleStateLabel from './ToggleStateLabel.svelte';

  let { changes }: { changes: boolean[] } = $props();
  let pressed = $state(false);
  let rootRef: Element | null = $state(null);

  export const getPressed = () => pressed;
  export const getRefs = () => ({ rootRef });
</script>

<Toggle bind:pressed onPressedChange={(pressed) => changes.push(pressed)}>
  <ToggleStateLabel />
</Toggle>
<Toggle disabled>Disabled toggle</Toggle>
<Toggle bind:ref={rootRef} defaultPressed>
  {#snippet asChild(props)}
    <button {...props()} type="button">Custom toggle</button>
  {/snippet}
</Toggle>
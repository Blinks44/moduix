<script lang="ts">
  import { Toggle, ToggleContext, ToggleIndicator } from '@/components/toggle';

  let rootRef: Element | null = $state(null);
  let indicatorRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, indicatorRef });
</script>

<Toggle bind:ref={rootRef} defaultPressed data-testid="toggle">
  <svg aria-hidden="true"></svg>
  Favorite
  <ToggleIndicator bind:ref={indicatorRef}>
    <svg aria-label="On icon"></svg>
    {#snippet fallback()}<svg aria-label="Off icon"></svg>{/snippet}
  </ToggleIndicator>
  <ToggleContext>
    {#snippet render(context)}
      <span data-testid="context-state">{context().pressed ? 'On' : 'Off'}</span>
    {/snippet}
  </ToggleContext>
</Toggle>
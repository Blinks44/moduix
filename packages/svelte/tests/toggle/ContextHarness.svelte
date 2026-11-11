<script lang="ts">
  import { Toggle, ToggleContext } from '@/components/toggle';

  let { changes }: { changes: (pressed: boolean) => void } = $props();
  let pressed = $state(false);

  export const setPressed = (value: boolean) => (pressed = value);
</script>

<Toggle {pressed} onPressedChange={changes}>
  <ToggleContext>
    {#snippet render(context)}
      <span
        role="presentation"
        onclick={(event) => {
          event.stopPropagation();
          context().setPressed(true);
        }}
      >
        Enable
      </span>
    {/snippet}
  </ToggleContext>
</Toggle>
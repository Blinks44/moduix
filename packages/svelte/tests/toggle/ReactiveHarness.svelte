<script lang="ts">
  import {
    Toggle,
    ToggleIndicator,
    type ToggleSize,
    type ToggleVariant,
  } from '@/components/toggle';

  let {
    clicks,
    changes,
    submit,
  }: {
    clicks: (event: MouseEvent) => void;
    changes: (pressed: boolean) => void;
    submit: () => void;
  } = $props();
  let pressed = $state(false);
  let disabled = $state(false);
  let size: ToggleSize = $state('md');
  let variant: ToggleVariant = $state('default');
  let label = $state('Favorite');
  let consumerClass = $state('consumer-toggle');

  export const getPressed = () => pressed;
  export const update = () => {
    size = 'icon-lg';
    variant = 'ghost';
    label = 'Saved';
    consumerClass = 'updated-toggle';
    disabled = true;
  };
  export const setPressed = (value: boolean) => (pressed = value);
</script>

<form
  onsubmit={(event) => {
    event.preventDefault();
    submit();
  }}
>
  <Toggle
    bind:pressed
    {disabled}
    {size}
    {variant}
    aria-label={label}
    class={[consumerClass, { 'conditional-class': true }]}
    style="color: red; margin-top: 7px"
    data-slot="consumer-slot"
    data-size="consumer-size"
    onclick={clicks}
    onPressedChange={changes}
  >
    <ToggleIndicator class="consumer-indicator">
      <span>On</span>
      {#snippet fallback()}<span>Off</span>{/snippet}
    </ToggleIndicator>
  </Toggle>
</form>
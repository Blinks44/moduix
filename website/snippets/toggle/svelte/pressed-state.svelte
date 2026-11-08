<script lang="ts">
  import { Bell as BellIcon } from '@lucide/svelte';
  import { Toggle, ToggleContext } from '@moduix/svelte/toggle';
</script>

<Toggle defaultPressed>
  <BellIcon aria-hidden="true" focusable="false" />
  <ToggleContext>
    {#snippet render(context)}
      <span>{context().pressed ? 'Notifications on' : 'Notifications off'}</span>
    {/snippet}
  </ToggleContext>
</Toggle>
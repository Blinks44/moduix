<script lang="ts">
  import { Check as CheckIcon, Star as StarIcon } from '@lucide/svelte';
  import { Toggle, ToggleIndicator } from '@moduix/svelte/toggle';
</script>

<Toggle aria-label="Favorite" size="icon-md" variant="outline">
  <ToggleIndicator>
    <CheckIcon aria-hidden="true" focusable="false" />
    {#snippet fallback()}<StarIcon aria-hidden="true" focusable="false" />{/snippet}
  </ToggleIndicator>
</Toggle>
<script lang="ts">
  import { Check as CheckIcon } from '@lucide/svelte';
  import { Toggle } from '@moduix/svelte/toggle';
</script>

<Toggle variant="outline" defaultPressed>
  {#snippet asChild(props)}
    <button {...props()} type="button">
      <CheckIcon aria-hidden="true" focusable="false" />
      Save to favorites
    </button>
  {/snippet}
</Toggle>
<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Spinner } from '@moduix/svelte/spinner';

  let saving = $state(false);
  const toggleSaving = () => (saving = !saving);
</script>

<Button aria-busy={saving} type="button" onclick={toggleSaving}>
  {#if saving}
    <Spinner decorative size="sm" />
    Saving changes
  {:else}
    Save changes
  {/if}
</Button>
<output>State: {saving ? 'Saving' : 'Ready'}</output>
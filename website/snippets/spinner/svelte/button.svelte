<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Spinner } from '@moduix/svelte/spinner';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/spinner/spinner-button.module.css';

  let saving = $state(false);
  const toggleSaving = () => (saving = !saving);
</script>

<Stack align="center" gap="3">
  <Button aria-busy={saving} type="button" onclick={toggleSaving}>
    {#if saving}
      <Spinner decorative size="sm" />
      Saving changes
    {:else}
      Save changes
    {/if}
  </Button>
  <div data-preview-meta class={styles.meta}>
    <output>State: {saving ? 'Saving' : 'Ready'}</output>
  </div>
</Stack>
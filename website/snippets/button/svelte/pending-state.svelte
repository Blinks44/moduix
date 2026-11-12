<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Spinner } from '@moduix/svelte/spinner';

  const delay = 1800;
  const labels = {
    idle: 'Save Changes',
    pending: 'Saving',
  };
  let pending = $state(false);

  const save = () => {
    pending = true;
    setTimeout(() => (pending = false), delay);
  };
</script>

<Button loading={pending} onclick={save}>
  {#if pending}
    <Spinner decorative size="sm" />
    {labels.pending}
  {:else}
    {labels.idle}
  {/if}
</Button>
<script lang="ts">
  import { Button } from '@moduix/svelte/button';

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
  {pending ? labels.pending : labels.idle}
</Button>
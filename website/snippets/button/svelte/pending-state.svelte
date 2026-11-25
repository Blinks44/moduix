<script lang="ts">
  import { Button } from '@moduix/svelte/button';

  const delay = 1800;
  let pending = $state(false);

  const save = () => {
    pending = true;
    setTimeout(() => (pending = false), delay);
  };
</script>

<Button loading={pending} loadingText="Saving" onclick={save}>Save Changes</Button>
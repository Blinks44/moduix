<script lang="ts">
  import TestNavigationMenu from './TestNavigationMenu.svelte';

  let value: string | undefined = $state('');
</script>

<button type="button">Before menu</button>
<TestNavigationMenu bind:value />
<output data-testid="controlled-value">{value || 'none'}</output>
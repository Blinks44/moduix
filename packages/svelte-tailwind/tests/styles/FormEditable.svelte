<script lang="ts">
  // The shared harness resolves `@/` to this package's source.
  import TestEditable from '../../../svelte/tests/editable/TestEditable.svelte';
</script>

<form><TestEditable defaultValue="Layer name" name="title" /></form>
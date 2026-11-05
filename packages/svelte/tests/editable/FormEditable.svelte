<script lang="ts">
  import TestEditable from './TestEditable.svelte';
</script>

<div>
  <form id="editable-form"></form>
  <TestEditable defaultValue="Layer name" form="editable-form" name="title" />
</div>
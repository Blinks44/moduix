<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
</script>

<Checkbox checked="indeterminate">
  <CheckboxControl />
  <CheckboxLabel>Select all team members</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
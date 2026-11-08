<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
</script>

<Checkbox>
  <CheckboxControl />
  <CheckboxLabel>Enable notifications</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
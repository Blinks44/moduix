<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
</script>

<Checkbox defaultChecked>
  <CheckboxControl />
  <CheckboxLabel>Enable notifications</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
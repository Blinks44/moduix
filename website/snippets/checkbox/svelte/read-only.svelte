<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
</script>

<Checkbox readOnly defaultChecked>
  <CheckboxControl />
  <CheckboxLabel>Preserve existing setting</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
</script>

<Checkbox size="lg" defaultChecked>
  <CheckboxControl />
  <CheckboxLabel>Large</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
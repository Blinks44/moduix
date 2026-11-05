<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@/components/checkbox';

  let checked: boolean | 'indeterminate' = $state('indeterminate');
</script>

<Checkbox bind:checked>
  <CheckboxControl />
  <CheckboxHiddenInput />
  <CheckboxLabel>Select all</CheckboxLabel>
</Checkbox>
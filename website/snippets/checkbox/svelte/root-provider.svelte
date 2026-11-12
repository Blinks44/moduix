<script lang="ts">
  import {
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
    CheckboxRootProvider,
    useCheckbox,
  } from '@moduix/svelte/checkbox';
  import { Stack } from '@moduix/svelte/stack';

  const checkbox = useCheckbox({ defaultChecked: true });
</script>

<Stack align="center" gap="4">
  <CheckboxRootProvider value={checkbox}>
    <CheckboxControl />
    <CheckboxLabel>Managed outside the tree</CheckboxLabel>
    <CheckboxHiddenInput />
  </CheckboxRootProvider>
  <div data-preview-meta>
    <output>{checkbox().checked ? 'Checked' : 'Unchecked'}</output>
    <button type="button" onclick={() => checkbox().setChecked(!checkbox().checked)}>
      {checkbox().checked ? 'Uncheck' : 'Check'}
    </button>
  </div>
</Stack>
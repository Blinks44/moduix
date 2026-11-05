<script lang="ts">
  import {
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
    CheckboxRootProvider,
    useCheckbox,
  } from '@/components/checkbox';
  import ContextState from './ContextState.svelte';

  const checkbox = useCheckbox({ defaultChecked: true });
</script>

<CheckboxRootProvider value={checkbox}>
  <ContextState />
  <CheckboxControl />
  <CheckboxLabel>Provider checkbox</CheckboxLabel>
  <CheckboxHiddenInput />
</CheckboxRootProvider>
<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxLabel,
    CheckboxRootProvider,
    useCheckbox,
  } from '@/components/checkbox';

  const providerCheckbox = useCheckbox({ defaultChecked: true, name: 'provider-notifications' });
</script>

<form>
  <Checkbox defaultChecked name="notifications" value="email">
    <CheckboxControl />
    <CheckboxLabel>Email notifications</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
  <CheckboxRootProvider value={providerCheckbox}>
    <CheckboxControl />
    <CheckboxLabel>Provider notifications</CheckboxLabel>
    <CheckboxHiddenInput />
  </CheckboxRootProvider>
  <CheckboxGroup defaultValue={['react']} name="frameworks">
    <Checkbox value="react">
      <CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>React</CheckboxLabel>
    </Checkbox>
    <Checkbox value="svelte">
      <CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>Svelte</CheckboxLabel>
    </Checkbox>
  </CheckboxGroup>
</form>
<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@/components/checkbox';
</script>

<Checkbox disabled>
  <CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>Disabled option</CheckboxLabel>
</Checkbox>
<Checkbox readOnly>
  <CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>Read-only option</CheckboxLabel>
</Checkbox>
<Checkbox invalid required>
  <CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>Required option</CheckboxLabel>
</Checkbox>
<CheckboxGroup readOnly>
  <Checkbox value="group-option">
    <CheckboxControl /><CheckboxHiddenInput /><CheckboxLabel>Read-only group option</CheckboxLabel>
  </Checkbox>
</CheckboxGroup>
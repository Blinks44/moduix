<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxIndicator,
    CheckboxLabel,
  } from '@/components/checkbox';
</script>

<Checkbox defaultChecked>
  <CheckboxControl />
  <CheckboxLabel>Default icons</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
<Checkbox>
  <CheckboxControl>
    <CheckboxIndicator><span data-testid="custom-icon">+</span></CheckboxIndicator>
  </CheckboxControl>
  <CheckboxLabel>Custom icon</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@/components/checkbox';

  let { details }: { details: string[][] } = $props();
  let value = $state(['email']);
</script>

<CheckboxGroup bind:value name="channels" onValueChange={(next) => details.push(next)}>
  <Checkbox value="email">
    <CheckboxControl /><CheckboxLabel>Email</CheckboxLabel><CheckboxHiddenInput />
  </Checkbox>
  <Checkbox value="push">
    <CheckboxControl /><CheckboxLabel>Push</CheckboxLabel><CheckboxHiddenInput />
  </Checkbox>
</CheckboxGroup>
<output>Selected: {value.join(', ')}</output>
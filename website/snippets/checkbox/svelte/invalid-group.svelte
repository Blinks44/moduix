<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';

  const options = [
    { value: 'email', label: 'Email updates' },
    { value: 'push', label: 'Push notifications' },
    { value: 'sms', label: 'SMS alerts' },
  ];
  const defaultValue = ['email'];
</script>

<CheckboxGroup invalid {defaultValue} name="notifications">
  {#each options as option (option.value)}
    <Checkbox value={option.value}>
      <CheckboxControl />
      <CheckboxLabel>{option.label}</CheckboxLabel>
      <CheckboxHiddenInput />
    </Checkbox>
  {/each}
</CheckboxGroup>
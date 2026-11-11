<script lang="ts">
  import { Check as CheckIcon, Minus as MinusIcon } from '@lucide/svelte';
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxIndicator,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
</script>

<Checkbox>
  <CheckboxControl>
    <CheckboxIndicator>
      <CheckIcon strokeWidth={3} />
    </CheckboxIndicator>
    <CheckboxIndicator indeterminate>
      <MinusIcon strokeWidth={3} />
    </CheckboxIndicator>
  </CheckboxControl>
  <CheckboxLabel>Enable notifications</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
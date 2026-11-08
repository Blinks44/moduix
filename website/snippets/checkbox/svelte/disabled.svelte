<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
</script>

<Checkbox disabled>
  <CheckboxControl />
  <CheckboxLabel>Receive weekly summary</CheckboxLabel>
  <CheckboxHiddenInput />
</Checkbox>
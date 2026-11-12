<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
  import styles from '@/components/examples/checkbox/checkbox-controlled.module.css';

  let checked = $state(true);
</script>

<div class={styles.root}>
  <Checkbox {checked} onCheckedChange={(details) => (checked = details.checked === true)}>
    <CheckboxControl />
    <CheckboxLabel>{checked ? 'Enabled' : 'Disabled'}</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
  <div data-preview-meta>
    <output>Notifications: {checked ? 'enabled' : 'disabled'}</output>
  </div>
</div>
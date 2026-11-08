<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { Field, FieldErrorText, FieldHelperText } from '@moduix/svelte/field';
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/svelte/switch';
  import styles from '@/components/examples/switch/switch-form-integration.module.css';

  let checked = $state(false);
  let submitted = $state(false);

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    submitted = true;
  };
</script>

<form class={styles.form} novalidate onsubmit={handleSubmit}>
  <Field invalid={submitted && !checked} class={styles.formField}>
    <Switch bind:checked name="notifications" required>
      <SwitchControl />
      <SwitchLabel>Product updates</SwitchLabel>
      <SwitchHiddenInput />
    </Switch>
    <FieldHelperText>Choose whether to receive product updates.</FieldHelperText>
    <FieldErrorText>Choose a notification preference.</FieldErrorText>
  </Field>
  <div>
    <output>
      {submitted ? (checked ? 'Preference saved.' : 'Choose a preference.') : 'Not submitted.'}
    </output>
    <Button size="sm" type="submit">Save preference</Button>
  </div>
</form>
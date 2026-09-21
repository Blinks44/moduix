import { Button } from '@moduix/solid/button';
import { Field, FieldErrorText, FieldHelperText } from '@moduix/solid/field';
import { Switch } from '@moduix/solid/switch';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/switch/switch-form-integration.module.css';

export default function SwitchFormDemo() {
  const [checked, setChecked] = createSignal(false);
  const [submitted, setSubmitted] = createSignal(false);
  const invalid = () => submitted() && !checked();

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form class={styles.form} noValidate onSubmit={handleSubmit}>
      <Field invalid={invalid()} class={styles.formField}>
        <Switch
          checked={checked()}
          name="notifications"
          required
          onCheckedChange={(details) => setChecked(details.checked)}
        >
          <Switch.Control />
          <Switch.Label>Product updates</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
        <FieldHelperText>Choose whether to receive product updates.</FieldHelperText>
        <FieldErrorText>Choose a notification preference.</FieldErrorText>
      </Field>
      <div>
        <output>
          {submitted()
            ? checked()
              ? 'Preference saved.'
              : 'Choose a preference.'
            : 'Not submitted.'}
        </output>
        <Button size="sm" type="submit">
          Save preference
        </Button>
      </div>
    </form>
  );
}

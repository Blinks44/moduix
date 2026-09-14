import { Button } from '@moduix/solid/button';
import { Field } from '@moduix/solid/field';
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
        <Field.HelperText>Choose whether to receive product updates.</Field.HelperText>
        <Field.ErrorText>Choose a notification preference.</Field.ErrorText>
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
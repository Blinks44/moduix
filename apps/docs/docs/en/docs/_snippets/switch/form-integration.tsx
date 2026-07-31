import { Button, Field, Switch } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/switch.module.css';

export default function SwitchFormDemo() {
  const [checked, setChecked] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const invalid = submitted && !checked;

  return (
    <form
      className={styles.form}
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
    >
      <Field invalid={invalid} className={styles.formField}>
        <Switch
          checked={checked}
          name="notifications"
          required
          onCheckedChange={(details) => setChecked(details.checked)}
        >
          <Switch.Control />
          <Switch.Label>Product updates</Switch.Label>
        </Switch>
        <Field.HelperText>Choose whether to receive product updates.</Field.HelperText>
        <Field.ErrorText>Choose a notification preference.</Field.ErrorText>
      </Field>
      <PreviewMeta>
        <output>
          {submitted ? (checked ? 'Preference saved.' : 'Choose a preference.') : 'Not submitted.'}
        </output>
        <Button size="sm" type="submit">
          Save preference
        </Button>
      </PreviewMeta>
    </form>
  );
}
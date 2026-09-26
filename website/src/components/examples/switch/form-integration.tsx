import { Button } from '@moduix/react/button';
import { Field, FieldErrorText, FieldHelperText } from '@moduix/react/field';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/switch/switch-form-integration.module.css';

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
          <SwitchControl />
          <SwitchLabel>Product updates</SwitchLabel>
          <SwitchHiddenInput />
        </Switch>
        <FieldHelperText>Choose whether to receive product updates.</FieldHelperText>
        <FieldErrorText>Choose a notification preference.</FieldErrorText>
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
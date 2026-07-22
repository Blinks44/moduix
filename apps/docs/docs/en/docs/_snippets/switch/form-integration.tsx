import { Field, Switch } from '@moduix/react';
import styles from '@/components/examples/switch.module.css';

export default function SwitchFormDemo() {
  return (
    <Field invalid className={styles.formField}>
      <Switch defaultChecked name="notifications" required>
        <Switch.Control />
        <Switch.Label>Notifications</Switch.Label>
      </Switch>
      <Field.HelperText>Used for product and account updates.</Field.HelperText>
      <Field.ErrorText>Notification preference is required.</Field.ErrorText>
    </Field>
  );
}
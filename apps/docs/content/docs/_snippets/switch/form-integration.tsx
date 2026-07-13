/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const field = {
  name: 'notifications',
  required: true,
  invalid: true,
};

import { Field, Switch } from '@moduix/react';
import styles from './switch-demo.module.css';

export function SwitchFormDemo() {
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

//#endregion
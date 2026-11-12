import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { useState } from 'react';
import styles from '@/components/examples/checkbox/checkbox-controlled.module.css';

export default function ControlledCheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className={styles.root}>
      <Checkbox
        checked={checked}
        onCheckedChange={(details) => setChecked(details.checked === true)}
      >
        <CheckboxControl />
        <CheckboxLabel>{checked ? 'Enabled' : 'Disabled'}</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <div data-preview-meta>
        <output>Notifications: {checked ? 'enabled' : 'disabled'}</output>
      </div>
    </div>
  );
}
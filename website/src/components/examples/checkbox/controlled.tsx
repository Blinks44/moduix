import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
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
      <PreviewMeta>
        <output>Notifications: {checked ? 'enabled' : 'disabled'}</output>
      </PreviewMeta>
    </div>
  );
}
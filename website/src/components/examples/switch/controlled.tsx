import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/switch/switch-controlled.module.css';

export default function ControlledSwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className={styles.stack}>
      <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <SwitchControl />
        <SwitchLabel>{checked ? 'On' : 'Off'}</SwitchLabel>
        <SwitchHiddenInput />
      </Switch>
      <PreviewMeta>
        <output>Current value: {String(checked)}</output>
      </PreviewMeta>
    </div>
  );
}
import { Switch } from '@moduix/react/switch';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/switch.module.css';

export default function ControlledSwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className={styles.stack}>
      <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <Switch.Control />
        <Switch.Label>{checked ? 'On' : 'Off'}</Switch.Label>
      </Switch>
      <PreviewMeta>
        <output>Current value: {String(checked)}</output>
      </PreviewMeta>
    </div>
  );
}
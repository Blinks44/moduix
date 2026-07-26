import { Checkbox } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledCheckboxDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(details) => setChecked(details.checked === true)}
      >
        <Checkbox.Control />
        <Checkbox.Label>{checked ? 'Enabled' : 'Disabled'}</Checkbox.Label>
      </Checkbox>
      <PreviewMeta>
        <output>Notifications: {checked ? 'enabled' : 'disabled'}</output>
      </PreviewMeta>
    </div>
  );
}
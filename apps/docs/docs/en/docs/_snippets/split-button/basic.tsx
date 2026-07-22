import { Menu, SplitButton } from '@moduix/react';
import { useState } from 'react';

const items = [
  {
    value: 'save-draft',
    label: 'Save as Draft',
  },
  {
    value: 'duplicate',
    label: 'Duplicate',
  },
  {
    value: 'publish',
    label: 'Publish Now',
  },
];

export default function SplitButtonDemo() {
  const [status, setStatus] = useState('Ready to save.');

  return (
    <div>
      <SplitButton>
        <SplitButton.Action onClick={() => setStatus('Changes saved.')}>
          Save Changes
        </SplitButton.Action>
        <SplitButton.Trigger />
        <SplitButton.Positioner>
          <SplitButton.Content>
            {items.slice(0, 2).map((item) => (
              <Menu.Item key={item.value} value={item.value}>
                {item.label}
              </Menu.Item>
            ))}
            <Menu.Separator />
            <Menu.Item value={items[2].value}>{items[2].label}</Menu.Item>
          </SplitButton.Content>
        </SplitButton.Positioner>
      </SplitButton>
      <p aria-live="polite">{status}</p>
    </div>
  );
}
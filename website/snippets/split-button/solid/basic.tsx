import { MenuItem, MenuSeparator } from '@moduix/solid/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/solid/split-button';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

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
  const [status, setStatus] = createSignal('Ready to save.');

  return (
    <Stack align="center" gap="4">
      <SplitButton aria-label="Save actions">
        <SplitButtonAction onClick={() => setStatus('Changes saved.')}>
          Save Changes
        </SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonPositioner>
          <SplitButtonContent>
            {items.slice(0, 2).map((item) => (
              <MenuItem value={item.value}>{item.label}</MenuItem>
            ))}
            <MenuSeparator />
            <MenuItem value={items[2].value}>{items[2].label}</MenuItem>
          </SplitButtonContent>
        </SplitButtonPositioner>
      </SplitButton>
      <output aria-live="polite">{status()}</output>
    </Stack>
  );
}
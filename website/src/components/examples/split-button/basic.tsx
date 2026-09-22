import { MenuItem, MenuSeparator } from '@moduix/react/menu';
import {
  SplitButton,
  SplitButtonAction,
  SplitButtonContent,
  SplitButtonPositioner,
  SplitButtonTrigger,
} from '@moduix/react/split-button';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/split-button/split-button-basic.module.css';

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
    <div className={styles.stack}>
      <SplitButton aria-label="Save actions">
        <SplitButtonAction onClick={() => setStatus('Changes saved.')}>
          Save Changes
        </SplitButtonAction>
        <SplitButtonTrigger />
        <SplitButtonPositioner>
          <SplitButtonContent>
            {items.slice(0, 2).map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
            <MenuSeparator />
            <MenuItem value={items[2].value}>{items[2].label}</MenuItem>
          </SplitButtonContent>
        </SplitButtonPositioner>
      </SplitButton>
      <PreviewMeta>
        <output aria-live="polite">{status}</output>
      </PreviewMeta>
    </div>
  );
}
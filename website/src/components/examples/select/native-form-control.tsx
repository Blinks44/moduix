import { createListCollection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import {
  Select,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectClearTrigger,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
  SelectHiddenSelect,
} from '@moduix/react/select';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/select/select-native-form-control.module.css';

const themes = createListCollection({
  items: [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ],
});

export default function NativeFormControlSelectDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get('theme') ?? ''));
  };

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Select collection={themes} name="theme" required>
        <SelectLabel>Theme</SelectLabel>
        <SelectControl>
          <SelectTrigger>
            <SelectValueText placeholder="Select theme" />
          </SelectTrigger>
          <SelectIndicator />
          <SelectClearTrigger aria-label="Clear selection" />
        </SelectControl>
        <SelectPositioner>
          <SelectContent>
            {themes.items.map((item) => (
              <SelectItem key={item.value} item={item}>
                <SelectItemText>{item.label}</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPositioner>
        <SelectHiddenSelect />
      </Select>
      <PreviewMeta>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}

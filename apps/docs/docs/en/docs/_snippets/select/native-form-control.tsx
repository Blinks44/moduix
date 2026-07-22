import { createListCollection } from '@ark-ui/react/collection';
import { Button, Select } from '@moduix/react';
import type { FormEvent } from 'react';
import { useState } from 'react';

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
    <form className="select-form" onSubmit={handleSubmit}>
      <Select collection={themes} name="theme" nativeFormControl="input" required>
        <Select.Label>Theme</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select theme" />
            <Select.Indicator />
          </Select.Trigger>
          <Select.ClearTrigger aria-label="Clear selection" />
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {themes.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select>
      <div className="select-form-actions">
        <Button type="submit">Submit</Button>
        <output className="select-form-output">Submitted: {submitted}</output>
      </div>
    </form>
  );
}
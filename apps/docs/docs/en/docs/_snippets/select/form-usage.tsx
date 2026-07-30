import { createListCollection } from '@ark-ui/react/collection';
import { Button, Select } from '@moduix/react';
import type { FormEvent } from 'react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

const themes = createListCollection({
  items: [
    {
      label: 'System',
      value: 'system',
    },
    {
      label: 'Light',
      value: 'light',
    },
    {
      label: 'Dark',
      value: 'dark',
    },
  ],
});

export default function SelectFormUsageDemo() {
  const [submitted, setSubmitted] = useState('Nothing submitted');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setSubmitted(String(data.get('theme') ?? ''));
  };

  return (
    <form className="select-preview-stack" onSubmit={handleSubmit}>
      <Select collection={themes} name="theme" required>
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
      <PreviewMeta>
        <output>Submitted: {submitted}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </PreviewMeta>
    </form>
  );
}
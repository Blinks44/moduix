import { createListCollection } from '@ark-ui/react/collection';
import {
  Select,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectOption,
} from '@moduix/react/select';
import { useState } from 'react';

const languages = [
  { label: 'C#', value: 'csharp' },
  { label: 'Go', value: 'go' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Python', value: 'python' },
  { label: 'Rust', value: 'rust' },
  { label: 'TypeScript', value: 'typescript' },
];

export default function SelectMaxSelectionDemo() {
  const [value, setValue] = useState<string[]>(['javascript']);
  const collection = createListCollection({
    items: languages.map((item) => ({
      ...item,
      disabled: value.length >= 3 && !value.includes(item.value),
    })),
  });

  return (
    <Select
      collection={collection}
      multiple
      value={value}
      onValueChange={(details) => {
        if (details.value.length <= 3) setValue(details.value);
      }}
    >
      <SelectLabel>Languages</SelectLabel>
      <SelectField placeholder="Select up to 3" clearLabel="Clear selection" />
      <SelectPositioner>
        <SelectContent>
          {collection.items.map((item) => (
            <SelectOption key={item.value} item={item}>
              {item.label}
            </SelectOption>
          ))}
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}
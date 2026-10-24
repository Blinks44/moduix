import { createListCollection } from '@ark-ui/react/collection';
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
  SelectOption,
} from '@moduix/react/select';

const languages = createListCollection({
  items: [
    {
      label: 'C#',
      value: 'csharp',
    },
    {
      label: 'Go',
      value: 'go',
    },
    {
      label: 'JavaScript',
      value: 'javascript',
    },
    {
      label: 'Python',
      value: 'python',
    },
    {
      label: 'Rust',
      value: 'rust',
    },
    {
      label: 'TypeScript',
      value: 'typescript',
    },
  ],
});

export default function SelectMultipleDemo() {
  return (
    <Select collection={languages} multiple defaultValue={['javascript', 'typescript']}>
      <SelectLabel>Languages</SelectLabel>
      <SelectControl>
        <SelectTrigger>
          <SelectValueText placeholder="Select languages" />
        </SelectTrigger>
        <SelectIndicator />
        <SelectClearTrigger aria-label="Clear selection" />
      </SelectControl>
      <SelectPositioner>
        <SelectContent>
          {languages.items.map((item) => (
            <SelectOption key={item.value} item={item}>
              {item.label}
            </SelectOption>
          ))}
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}
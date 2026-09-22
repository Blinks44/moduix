import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
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
} from '@moduix/solid/select';
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/select/select-form-usage.module.css';

const themes = createListCollection({
  items: [
    { label: 'System', value: 'system' },
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' },
  ],
});

export default function SelectFormUsageDemo() {
  const [submitted, setSubmitted] = createSignal('Nothing submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setSubmitted(String(new FormData(form).get('theme') ?? ''));
  };

  return (
    <form class={styles.root} onSubmit={handleSubmit}>
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
            <For each={themes.items}>
              {(item) => (
                <SelectItem item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              )}
            </For>
          </SelectContent>
        </SelectPositioner>
        <SelectHiddenSelect />
      </Select>
      <div>
        <output>Submitted: {submitted()}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
}

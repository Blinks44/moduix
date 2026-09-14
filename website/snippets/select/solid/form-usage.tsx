import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import { Select } from '@moduix/solid/select';
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
        <Select.Label>Theme</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select theme" />
          </Select.Trigger>
          <Select.Indicator />
          <Select.ClearTrigger aria-label="Clear selection" />
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            <For each={themes.items}>
              {(item) => (
                <Select.Item item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
        <Select.HiddenSelect />
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
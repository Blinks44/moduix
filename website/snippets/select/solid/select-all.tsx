import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import { Select } from '@moduix/solid/select';
import { For } from 'solid-js';
import styles from '@/components/examples/select/select-select-all.module.css';

const languages = createListCollection({
  items: [
    { label: 'C#', value: 'csharp' },
    { label: 'Go', value: 'go' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'Rust', value: 'rust' },
    { label: 'TypeScript', value: 'typescript' },
  ],
});

export default function SelectSelectAllDemo() {
  const select = Select.useSelect({
    collection: languages,
    multiple: true,
  });

  return (
    <div class={styles.root}>
      <Select.RootProvider value={select}>
        <Select.Label>Languages</Select.Label>
        <Select.Field placeholder="Select languages" clearLabel="Clear selection" />
        <Select.Positioner>
          <Select.Content>
            <For each={languages.items}>
              {(item) => (
                <Select.Item item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              )}
            </For>
          </Select.Content>
        </Select.Positioner>
      </Select.RootProvider>
      <div>
        <output>Selected: {select().value.length}</output>
        <Button
          type="button"
          size="sm"
          onClick={() => {
            select().selectAll();
            select().setOpen(false);
          }}
        >
          Select all
        </Button>
      </div>
    </div>
  );
}
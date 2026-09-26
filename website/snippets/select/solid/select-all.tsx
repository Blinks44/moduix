import { createListCollection } from '@ark-ui/solid/collection';
import { Button } from '@moduix/solid/button';
import {
  useSelect,
  SelectRootProvider,
  SelectLabel,
  SelectField,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/solid/select';
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
  const select = useSelect({
    collection: languages,
    multiple: true,
  });

  return (
    <div class={styles.root}>
      <SelectRootProvider value={select}>
        <SelectLabel>Languages</SelectLabel>
        <SelectField placeholder="Select languages" clearLabel="Clear selection" />
        <SelectPositioner>
          <SelectContent>
            <For each={languages.items}>
              {(item) => (
                <SelectItem item={item}>
                  <SelectItemText>{item.label}</SelectItemText>
                  <SelectItemIndicator />
                </SelectItem>
              )}
            </For>
          </SelectContent>
        </SelectPositioner>
      </SelectRootProvider>
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
import { createListCollection } from '@ark-ui/react/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
} from '@moduix/react/listbox';
import styles from '@/components/examples/listbox/listbox-extended-selection.module.css';

const frameworks = createListCollection({
  items: [
    {
      label: 'React',
      value: 'react',
    },
    {
      label: 'Vue',
      value: 'vue',
    },
    {
      label: 'Angular',
      value: 'angular',
    },
    {
      label: 'Svelte',
      value: 'svelte',
    },
    {
      label: 'Solid',
      value: 'solid',
    },
    {
      label: 'Preact',
      value: 'preact',
    },
  ],
});

export default function ExtendedListboxDemo() {
  return (
    <Listbox collection={frameworks} className={styles.root} selectionMode="extended">
      <ListboxLabel>Hold Cmd or Ctrl to select multiple</ListboxLabel>
      <ListboxContent>
        {frameworks.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}
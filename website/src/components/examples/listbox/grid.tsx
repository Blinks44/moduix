import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemText,
  ListboxLabel,
  createGridCollection,
} from '@moduix/react/listbox';
const colors = createGridCollection({
  items: [
    {
      label: 'Red',
      value: 'red',
    },
    {
      label: 'Green',
      value: 'green',
    },
    {
      label: 'Blue',
      value: 'blue',
    },
  ],
  columnCount: 3,
});

export default function GridListboxDemo() {
  return (
    <Listbox collection={colors}>
      <ListboxLabel>Pick a color</ListboxLabel>
      <ListboxContent>
        {colors.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}
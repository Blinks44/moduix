import { createListCollection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import {
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  ListboxRootProvider,
  useListbox,
} from '@moduix/react/listbox';
import { Stack } from '@moduix/react/stack';
import { PreviewMeta } from '@/components/mdx/Components';

const priorities = createListCollection({
  items: [
    {
      label: 'Low',
      value: 'low',
    },
    {
      label: 'Medium',
      value: 'medium',
    },
    {
      label: 'High',
      value: 'high',
    },
    {
      label: 'Critical',
      value: 'critical',
    },
  ],
});

export default function RootProviderListboxDemo() {
  const listbox = useListbox({
    collection: priorities,
  });
  return (
    <Stack gap="3">
      <ListboxRootProvider value={listbox}>
        <ListboxLabel>Select priority</ListboxLabel>
        <ListboxContent>
          {priorities.items.map((item) => (
            <ListboxItem key={item.value} item={item}>
              <ListboxItemText>{item.label}</ListboxItemText>
              <ListboxItemIndicator />
            </ListboxItem>
          ))}
        </ListboxContent>
      </ListboxRootProvider>
      <PreviewMeta style={{ placeSelf: 'center' }}>
        <output>Selected: {listbox.value[0] ?? 'none'}</output>
        <Button onClick={() => listbox.setValue(['high'])}>Set to high</Button>
      </PreviewMeta>
    </Stack>
  );
}
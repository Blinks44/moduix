import { createListCollection } from '@ark-ui/react/collection';
import { Listbox, ListboxContent, ListboxItem, ListboxItemIndicator, ListboxItemText, ListboxLabel } from '@moduix/react/listbox';
import styles from '@/components/examples/listbox/listbox-disabled-item.module.css';

const plans = createListCollection({
  items: [
    {
      label: 'Free',
      value: 'free',
    },
    {
      label: 'Pro',
      value: 'pro',
    },
    {
      label: 'Enterprise',
      value: 'enterprise',
      disabled: true,
    },
    {
      label: 'Custom',
      value: 'custom',
    },
  ],
});

export default function DisabledItemListboxDemo() {
  return (
    <Listbox collection={plans} className={styles.root}>
      <ListboxLabel>Select plan</ListboxLabel>
      <ListboxContent>
        {plans.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
    </Listbox>
  );
}

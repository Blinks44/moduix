import { createListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';
import styles from '@/components/examples/listbox.module.css';

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
      <Listbox.Label>Select plan</Listbox.Label>
      <Listbox.Content>
        {plans.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
    </Listbox>
  );
}
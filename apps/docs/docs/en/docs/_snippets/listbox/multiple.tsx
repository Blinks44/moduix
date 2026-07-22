import { createListCollection } from '@ark-ui/react/collection';
import { Listbox } from '@moduix/react';
import styles from '@/components/examples/listbox.module.css';

const days = createListCollection({
  items: [
    {
      label: 'Monday',
      value: 'mon',
    },
    {
      label: 'Tuesday',
      value: 'tue',
    },
    {
      label: 'Wednesday',
      value: 'wed',
    },
    {
      label: 'Thursday',
      value: 'thu',
    },
    {
      label: 'Friday',
      value: 'fri',
    },
    {
      label: 'Saturday',
      value: 'sat',
    },
    {
      label: 'Sunday',
      value: 'sun',
    },
  ],
});

export default function MultipleListboxDemo() {
  return (
    <Listbox
      collection={days}
      className={styles.root}
      selectionMode="multiple"
      defaultValue={['mon', 'wed', 'fri']}
    >
      <Listbox.Label>Select days</Listbox.Label>
      <Listbox.Content>
        {days.items.map((item) => (
          <Listbox.Item key={item.value} item={item}>
            <Listbox.ItemText>{item.label}</Listbox.ItemText>
            <Listbox.ItemIndicator />
          </Listbox.Item>
        ))}
      </Listbox.Content>
      <Listbox.ValueText />
    </Listbox>
  );
}
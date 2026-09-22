import { createListCollection } from '@ark-ui/react/collection';
import {
  Listbox,
  ListboxContent,
  ListboxItem,
  ListboxItemIndicator,
  ListboxItemText,
  ListboxLabel,
  ListboxValueText,
} from '@moduix/react/listbox';
import styles from '@/components/examples/listbox/listbox-multiple.module.css';

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
      <ListboxLabel>Select days</ListboxLabel>
      <ListboxContent>
        {days.items.map((item) => (
          <ListboxItem key={item.value} item={item}>
            <ListboxItemText>{item.label}</ListboxItemText>
            <ListboxItemIndicator />
          </ListboxItem>
        ))}
      </ListboxContent>
      <ListboxValueText />
    </Listbox>
  );
}
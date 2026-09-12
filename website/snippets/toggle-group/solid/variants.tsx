import { ToggleGroup } from '@moduix/solid/toggle-group';
import styles from '@/components/examples/toggle-group/toggle-group-variants.module.css';

const items = [
  {
    value: 'one',
    label: 'One',
  },
  {
    value: 'two',
    label: 'Two',
  },
  {
    value: 'three',
    label: 'Three',
  },
];

export default function ToggleGroupVariantsDemo() {
  return (
    <div class={styles.stack}>
      <ToggleGroup defaultValue={['one']} aria-label="Default variant">
        {items.map((item) => (
          <ToggleGroup.Item value={item.value}>{item.label}</ToggleGroup.Item>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Outline variant" variant="outline">
        {items.map((item) => (
          <ToggleGroup.Item value={item.value}>{item.label}</ToggleGroup.Item>
        ))}
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Ghost variant" variant="ghost">
        {items.map((item) => (
          <ToggleGroup.Item value={item.value}>{item.label}</ToggleGroup.Item>
        ))}
      </ToggleGroup>
    </div>
  );
}
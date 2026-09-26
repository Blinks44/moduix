import { ToggleGroup, ToggleGroupItem } from '@moduix/solid/toggle-group';
import styles from '@/components/examples/toggle-group/toggle-group-disabled.module.css';

export default function DisabledToggleGroupDemo() {
  return (
    <div class={styles.row}>
      <ToggleGroup defaultValue={['one']} aria-label="Disabled group" disabled>
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two">Two</ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Disabled item">
        <ToggleGroupItem value="one">One</ToggleGroupItem>
        <ToggleGroupItem value="two" disabled>
          Two
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
import { ToggleGroup } from '@moduix/solid/toggle-group';
import styles from '@/components/examples/toggle-group/toggle-group-disabled.module.css';

export default function DisabledToggleGroupDemo() {
  return (
    <div class={styles.row}>
      <ToggleGroup defaultValue={['one']} aria-label="Disabled group" disabled>
        <ToggleGroup.Item value="one">One</ToggleGroup.Item>
        <ToggleGroup.Item value="two">Two</ToggleGroup.Item>
      </ToggleGroup>
      <ToggleGroup defaultValue={['one']} aria-label="Disabled item">
        <ToggleGroup.Item value="one">One</ToggleGroup.Item>
        <ToggleGroup.Item value="two" disabled>
          Two
        </ToggleGroup.Item>
      </ToggleGroup>
    </div>
  );
}
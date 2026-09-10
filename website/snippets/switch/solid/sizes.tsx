import { Switch } from '@moduix/solid/switch';
import styles from '@/components/examples/switch/switch-sizes.module.css';

const switchSizeOptions = [
  { label: 'Extra-small', value: 'xs' },
  { label: 'Small', value: 'sm' },
  { label: 'Medium', value: 'md' },
  { label: 'Large', value: 'lg' },
  { label: 'Extra-large', value: 'xl' },
] as const;

export default function SwitchSizesDemo() {
  return (
    <div class={styles.column}>
      {switchSizeOptions.map((item) => (
        <Switch size={item.value} defaultChecked>
          <Switch.Control />
          <Switch.Label>{item.label}</Switch.Label>
          <Switch.HiddenInput />
        </Switch>
      ))}
    </div>
  );
}
const switchSizeOptions = [
  {
    label: 'Extra-small',
    value: 'xs',
  },
  {
    label: 'Small',
    value: 'sm',
  },
  {
    label: 'Medium',
    value: 'md',
  },
  {
    label: 'Large',
    value: 'lg',
  },
  {
    label: 'Extra-large',
    value: 'xl',
  },
] as const;

import { Switch } from '@moduix/react';
import styles from '@/components/examples/switch.module.css';

export default function SwitchSizesDemo() {
  return (
    <div className={styles.stack}>
      {switchSizeOptions.map((item) => (
        <Switch key={item.value} size={item.value} defaultChecked>
          <Switch.Control />
          <Switch.Label>{item.label}</Switch.Label>
        </Switch>
      ))}
    </div>
  );
}
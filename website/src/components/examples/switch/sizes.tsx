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

import {
  Switch,
  SwitchControl,
  SwitchHiddenInput,
  SwitchLabel,
} from '@moduix/react/switch';
import styles from '@/components/examples/switch/switch-sizes.module.css';

export default function SwitchSizesDemo() {
  return (
    <div className={styles.column}>
      {switchSizeOptions.map((item) => (
        <Switch key={item.value} size={item.value} defaultChecked>
          <SwitchControl />
          <SwitchLabel>{item.label}</SwitchLabel>
          <SwitchHiddenInput />
        </Switch>
      ))}
    </div>
  );
}
import { Button } from '@moduix/solid/button';
import {
  RadioGroupLabel,
  RadioGroupOption,
  RadioGroupRootProvider,
  useRadioGroup,
} from '@moduix/solid/radio-group';
import styles from '@/components/examples/radio-group/radio-group-root-provider.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupRootProviderDemo() {
  const radioGroup = useRadioGroup({
    defaultValue: 'React',
  });

  return (
    <div class={styles.stack}>
      <RadioGroupRootProvider class={styles.root} value={radioGroup}>
        <RadioGroupLabel>Framework</RadioGroupLabel>
        {frameworks.map((framework) => (
          <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
        ))}
      </RadioGroupRootProvider>
      <output>Selected: {radioGroup().value ?? 'none'}</output>
      <Button type="button" size="sm" onClick={() => radioGroup().setValue('Solid')}>
        Set to Solid
      </Button>
    </div>
  );
}

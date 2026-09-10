import { Button } from '@moduix/solid/button';
import { RadioGroup, useRadioGroup } from '@moduix/solid/radio-group';
import styles from '@/components/examples/radio-group/radio-group-root-provider.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupRootProviderDemo() {
  const radioGroup = useRadioGroup({
    defaultValue: 'React',
  });

  return (
    <div class={styles.stack}>
      <RadioGroup.RootProvider class={styles.root} value={radioGroup}>
        <RadioGroup.Label>Framework</RadioGroup.Label>
        {frameworks.map((framework) => (
          <RadioGroup.Option value={framework}>{framework}</RadioGroup.Option>
        ))}
      </RadioGroup.RootProvider>
      <output>Selected: {radioGroup().value ?? 'none'}</output>
      <Button type="button" size="sm" onClick={() => radioGroup().setValue('Solid')}>
        Set to Solid
      </Button>
    </div>
  );
}
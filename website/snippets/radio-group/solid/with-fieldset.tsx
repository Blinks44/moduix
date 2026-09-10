import { Fieldset } from '@moduix/solid/fieldset';
import { RadioGroup } from '@moduix/solid/radio-group';
import styles from '@/components/examples/radio-group/radio-group-with-fieldset.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupFieldsetDemo() {
  return (
    <Fieldset class={styles.root}>
      <Fieldset.Legend>Select a framework</Fieldset.Legend>
      <RadioGroup defaultValue="React">
        {frameworks.map((framework) => (
          <RadioGroup.Option value={framework}>{framework}</RadioGroup.Option>
        ))}
      </RadioGroup>
    </Fieldset>
  );
}
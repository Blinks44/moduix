import { Fieldset, FieldsetLegend } from '@moduix/react/fieldset';
import { RadioGroup } from '@moduix/react/radio-group';
import styles from '@/components/examples/radio-group/radio-group-with-fieldset.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupFieldsetDemo() {
  return (
    <Fieldset className={styles.root}>
      <FieldsetLegend>Select a framework</FieldsetLegend>
      <RadioGroup defaultValue="React">
        {frameworks.map((framework) => (
          <RadioGroup.Option key={framework} value={framework}>
            {framework}
          </RadioGroup.Option>
        ))}
      </RadioGroup>
    </Fieldset>
  );
}

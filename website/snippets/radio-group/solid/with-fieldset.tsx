import { Fieldset, FieldsetLegend } from '@moduix/solid/fieldset';
import {
  RadioGroup,
  RadioGroupOption,
} from '@moduix/solid/radio-group';
import styles from '@/components/examples/radio-group/radio-group-with-fieldset.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupFieldsetDemo() {
  return (
    <Fieldset class={styles.root}>
      <FieldsetLegend>Select a framework</FieldsetLegend>
      <RadioGroup defaultValue="React">
        {frameworks.map((framework) => (
          <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
        ))}
      </RadioGroup>
    </Fieldset>
  );
}

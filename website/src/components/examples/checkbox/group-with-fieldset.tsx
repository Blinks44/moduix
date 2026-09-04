import { Checkbox } from '@moduix/react/checkbox';
import { Fieldset } from '@moduix/react/fieldset';
import styles from '@/components/examples/checkbox/checkbox-group-with-fieldset.module.css';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export default function CheckboxGroupFieldsetDemo() {
  return (
    <Fieldset className={styles.root}>
      <Fieldset.Legend>Frameworks</Fieldset.Legend>
      <Checkbox.Group defaultValue={['react']} name="frameworks">
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            <Checkbox.Control />
            <Checkbox.Label>{option.label}</Checkbox.Label>
            <Checkbox.HiddenInput />
          </Checkbox>
        ))}
      </Checkbox.Group>
    </Fieldset>
  );
}
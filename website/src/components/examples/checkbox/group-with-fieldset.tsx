import {
  Checkbox,
  CheckboxControl,
  CheckboxGroup,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/react/checkbox';
import { Fieldset, FieldsetLegend } from '@moduix/react/fieldset';
import styles from '@/components/examples/checkbox/checkbox-group-with-fieldset.module.css';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export default function CheckboxGroupFieldsetDemo() {
  return (
    <Fieldset className={styles.root}>
      <FieldsetLegend>Frameworks</FieldsetLegend>
      <CheckboxGroup defaultValue={['react']} name="frameworks">
        {options.map((option) => (
          <Checkbox key={option.value} value={option.value}>
            <CheckboxControl />
            <CheckboxLabel>{option.label}</CheckboxLabel>
            <CheckboxHiddenInput />
          </Checkbox>
        ))}
      </CheckboxGroup>
    </Fieldset>
  );
}

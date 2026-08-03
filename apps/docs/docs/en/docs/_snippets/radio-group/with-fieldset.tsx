import { Fieldset } from '@moduix/react/fieldset';
import { RadioGroup } from '@moduix/react/radio-group';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupFieldsetDemo() {
  return (
    <Fieldset className="centered-fieldset-example">
      <Fieldset.Legend>Select a framework</Fieldset.Legend>
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
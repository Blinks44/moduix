import { Field, RadioGroup } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

export default function RadioGroupFieldDemo() {
  return (
    <PreviewLayout maxWidth="12.5rem">
      <Field>
        <Field.Label>Account type</Field.Label>
        <RadioGroup defaultValue="team" aria-label="Account type">
          <RadioGroup.Item value="personal">
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>Personal account</RadioGroup.ItemText>
          </RadioGroup.Item>
          <RadioGroup.Item value="team">
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>Team account</RadioGroup.ItemText>
          </RadioGroup.Item>
        </RadioGroup>
        <Field.HelperText>Choose the default account context for new projects.</Field.HelperText>
      </Field>
    </PreviewLayout>
  );
}
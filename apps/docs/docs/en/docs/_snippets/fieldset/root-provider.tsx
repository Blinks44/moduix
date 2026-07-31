import { Field } from '@moduix/react/field';
import { Fieldset, useFieldset } from '@moduix/react/fieldset';

export default function ExternalFieldsetState() {
  const fieldset = useFieldset({
    invalid: true,
  });
  return (
    <Fieldset.RootProvider value={fieldset} className="fieldset">
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field invalid>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" defaultValue="invalid-address" />
      </Field>
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
    </Fieldset.RootProvider>
  );
}
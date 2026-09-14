import { Field } from '@moduix/solid/field';
import { Fieldset, useFieldset } from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/fieldset/fieldset-root-provider.module.css';

export default function ExternalFieldsetState() {
  const fieldset = useFieldset({
    invalid: true,
  });

  return (
    <Fieldset.RootProvider value={fieldset} class={styles.root}>
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field invalid>
        <Field.Label>Email</Field.Label>
        <Input type="email" value="invalid-address" />
      </Field>
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
    </Fieldset.RootProvider>
  );
}
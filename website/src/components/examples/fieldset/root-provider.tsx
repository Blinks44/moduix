import { Field } from '@moduix/react/field';
import { Fieldset, useFieldset } from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/fieldset/fieldset-root-provider.module.css';

export default function ExternalFieldsetState() {
  const fieldset = useFieldset({
    invalid: true,
  });
  return (
    <Fieldset.RootProvider value={fieldset} className={styles.root}>
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field invalid>
        <Field.Label>Email</Field.Label>
        <Input type="email" defaultValue="invalid-address" />
      </Field>
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
    </Fieldset.RootProvider>
  );
}
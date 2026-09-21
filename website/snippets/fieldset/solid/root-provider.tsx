import { Field, FieldLabel } from '@moduix/solid/field';
import {
  FieldsetErrorText,
  FieldsetLegend,
  FieldsetRootProvider,
  useFieldset,
} from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/fieldset/fieldset-root-provider.module.css';

export default function ExternalFieldsetState() {
  const fieldset = useFieldset({
    invalid: true,
  });

  return (
    <FieldsetRootProvider value={fieldset} class={styles.root}>
      <FieldsetLegend>Contact details</FieldsetLegend>
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" value="invalid-address" />
      </Field>
      <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
    </FieldsetRootProvider>
  );
}

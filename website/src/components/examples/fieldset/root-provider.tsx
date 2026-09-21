import { Field, FieldLabel } from '@moduix/react/field';
import {
  FieldsetErrorText,
  FieldsetLegend,
  FieldsetRootProvider,
  useFieldset,
} from '@moduix/react/fieldset';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/fieldset/fieldset-root-provider.module.css';

export default function ExternalFieldsetState() {
  const fieldset = useFieldset({
    invalid: true,
  });
  return (
    <FieldsetRootProvider value={fieldset} className={styles.root}>
      <FieldsetLegend>Contact details</FieldsetLegend>
      <Field invalid>
        <FieldLabel>Email</FieldLabel>
        <Input type="email" defaultValue="invalid-address" />
      </Field>
      <FieldsetErrorText>Enter a valid email address.</FieldsetErrorText>
    </FieldsetRootProvider>
  );
}

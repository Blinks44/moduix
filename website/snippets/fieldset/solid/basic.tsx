import { Field } from '@moduix/solid/field';
import { Fieldset } from '@moduix/solid/fieldset';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/fieldset/fieldset-basic.module.css';

export default function ContactDetails() {
  return (
    <Fieldset class={styles.root}>
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field>
        <Field.Label>Name</Field.Label>
        <Input name="name" />
      </Field>
      <Field>
        <Field.Label>Email</Field.Label>
        <Input name="email" type="email" />
      </Field>
      <Fieldset.HelperText>We only use these details to contact you.</Fieldset.HelperText>
    </Fieldset>
  );
}
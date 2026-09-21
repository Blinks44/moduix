import { Field, FieldErrorText, FieldLabel } from '@moduix/react/field';
import { InputGroup } from '@moduix/react/input-group';
import styles from '@/components/examples/input-group/input-group-field-state.module.css';

const domainSuffix = '.test.com';

const domainErrorMessage = 'Please enter a valid domain.';

export default function InvalidDomainDemo() {
  return (
    <Field className={styles.root} invalid>
      <FieldLabel>Domain</FieldLabel>
      <InputGroup>
        <InputGroup.Input placeholder="company" />
        <InputGroup.Text>{domainSuffix}</InputGroup.Text>
      </InputGroup>
      <FieldErrorText>{domainErrorMessage}</FieldErrorText>
    </Field>
  );
}

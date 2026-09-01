import { Field } from '@moduix/react/field';
import { InputGroup } from '@moduix/react/input-group';
import styles from '@/components/examples/input-group/input-group-field-state.module.css';

const domainSuffix = '.test.com';

const domainErrorMessage = 'Please enter a valid domain.';

export default function InvalidDomainDemo() {
  return (
    <Field className={styles.root} invalid>
      <Field.Label>Domain</Field.Label>
      <InputGroup>
        <InputGroup.Input placeholder="company" />
        <InputGroup.Text>{domainSuffix}</InputGroup.Text>
      </InputGroup>
      <Field.ErrorText>{domainErrorMessage}</Field.ErrorText>
    </Field>
  );
}
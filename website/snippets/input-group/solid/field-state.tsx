import { Field, FieldErrorText, FieldLabel } from '@moduix/solid/field';
import {
  InputGroup,
  InputGroupInput,
  InputGroupText,
} from '@moduix/solid/input-group';
import styles from '@/components/examples/input-group/input-group-field-state.module.css';

const domainSuffix = '.test.com';

const domainErrorMessage = 'Please enter a valid domain.';

export default function InvalidDomainDemo() {
  return (
    <Field class={styles.root} invalid>
      <FieldLabel>Domain</FieldLabel>
      <InputGroup>
        <InputGroupInput placeholder="company" />
        <InputGroupText>{domainSuffix}</InputGroupText>
      </InputGroup>
      <FieldErrorText>{domainErrorMessage}</FieldErrorText>
    </Field>
  );
}

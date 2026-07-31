import { Field } from '@moduix/react/field';
import { InputGroup } from '@moduix/react/input-group';

const domainSuffix = '.test.com';

const domainErrorMessage = 'Please enter a valid domain.';

export default function InvalidDomainDemo() {
  return (
    <Field invalid>
      <Field.Label>Domain</Field.Label>
      <InputGroup>
        <InputGroup.Input placeholder="company" />
        <InputGroup.Text>{domainSuffix}</InputGroup.Text>
      </InputGroup>
      <Field.ErrorText>{domainErrorMessage}</Field.ErrorText>
    </Field>
  );
}
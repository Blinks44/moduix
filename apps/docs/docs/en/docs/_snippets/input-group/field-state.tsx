import { Field, InputGroup } from '@moduix/react';

const domainSuffix = '.test.com';

const domainErrorMessage = 'Please enter a valid domain.';

export default function InvalidDomainDemo() {
  return (
    <Field className="input-group-demo-field" invalid>
      <Field.Label>Domain</Field.Label>
      <InputGroup>
        <InputGroup.Input placeholder="company" />
        <InputGroup.Text>{domainSuffix}</InputGroup.Text>
      </InputGroup>
      <Field.ErrorText>{domainErrorMessage}</Field.ErrorText>
    </Field>
  );
}
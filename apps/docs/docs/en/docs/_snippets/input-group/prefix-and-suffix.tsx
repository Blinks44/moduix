import { Field } from '@moduix/react/field';
import { InputGroup } from '@moduix/react/input-group';

const currency = {
  symbol: '$',
  code: 'USD',
};

export default function BudgetInputGroupDemo() {
  return (
    <Field>
      <Field.Label>Monthly budget</Field.Label>
      <InputGroup>
        <InputGroup.Addon>{currency.symbol}</InputGroup.Addon>
        <InputGroup.Input inputMode="decimal" placeholder="2500" />
        <InputGroup.Text>{currency.code}</InputGroup.Text>
      </InputGroup>
    </Field>
  );
}
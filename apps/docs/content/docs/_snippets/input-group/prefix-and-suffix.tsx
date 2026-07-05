/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, InputGroup } from '@moduix/react';

const currency = {
  symbol: '$',
  code: 'USD',
};

export function BudgetInputGroupDemo() {
  return (
    <Field className="input-group-demo-field">
      <Field.Label>Monthly budget</Field.Label>
      <InputGroup>
        <InputGroup.Addon>{currency.symbol}</InputGroup.Addon>
        <InputGroup.Input inputMode="decimal" placeholder="2500" />
        <InputGroup.Text>{currency.code}</InputGroup.Text>
      </InputGroup>
    </Field>
  );
}

//#endregion
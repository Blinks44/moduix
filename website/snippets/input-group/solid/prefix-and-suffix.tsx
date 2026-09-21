import { Field, FieldLabel } from '@moduix/solid/field';
import { InputGroup } from '@moduix/solid/input-group';
import styles from '@/components/examples/input-group/input-group-prefix-and-suffix.module.css';

const currency = {
  symbol: '$',
  code: 'USD',
};

export default function BudgetInputGroupDemo() {
  return (
    <Field class={styles.root}>
      <FieldLabel>Monthly budget</FieldLabel>
      <InputGroup>
        <InputGroup.Addon>{currency.symbol}</InputGroup.Addon>
        <InputGroup.Input inputMode="decimal" placeholder="2500" />
        <InputGroup.Text>{currency.code}</InputGroup.Text>
      </InputGroup>
    </Field>
  );
}

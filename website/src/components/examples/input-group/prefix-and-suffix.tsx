import { Field, FieldLabel } from '@moduix/react/field';
import { InputGroup } from '@moduix/react/input-group';
import styles from '@/components/examples/input-group/input-group-prefix-and-suffix.module.css';

const currency = {
  symbol: '$',
  code: 'USD',
};

export default function BudgetInputGroupDemo() {
  return (
    <Field className={styles.root}>
      <FieldLabel>Monthly budget</FieldLabel>
      <InputGroup>
        <InputGroup.Addon>{currency.symbol}</InputGroup.Addon>
        <InputGroup.Input inputMode="decimal" placeholder="2500" />
        <InputGroup.Text>{currency.code}</InputGroup.Text>
      </InputGroup>
    </Field>
  );
}

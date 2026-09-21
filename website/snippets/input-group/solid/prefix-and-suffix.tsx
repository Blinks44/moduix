import { Field, FieldLabel } from '@moduix/solid/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@moduix/solid/input-group';
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
        <InputGroupAddon>{currency.symbol}</InputGroupAddon>
        <InputGroupInput inputMode="decimal" placeholder="2500" />
        <InputGroupText>{currency.code}</InputGroupText>
      </InputGroup>
    </Field>
  );
}

import { Field, FieldLabel } from '@moduix/solid/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '@moduix/solid/input-group';
import styles from '@/components/examples/input-group/input-group-as-child.module.css';

const repositoryOwner = 'moduix/';

export default function InputGroupAsChildDemo() {
  return (
    <Field class={styles.root}>
      <FieldLabel>Repository</FieldLabel>
      <InputGroup asChild={(props) => <div {...props()} />}>
        <InputGroupAddon>{repositoryOwner}</InputGroupAddon>
        <InputGroupInput placeholder="components" />
      </InputGroup>
    </Field>
  );
}

import { Field, FieldLabel } from '@moduix/react/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@moduix/react/input-group';
import styles from '@/components/examples/input-group/input-group-as-child.module.css';

const repositoryOwner = 'moduix/';

export default function InputGroupAsChildDemo() {
  return (
    <Field className={styles.root}>
      <FieldLabel>Repository</FieldLabel>
      <InputGroup asChild>
        <div>
          <InputGroupAddon>{repositoryOwner}</InputGroupAddon>
          <InputGroupInput placeholder="components" />
        </div>
      </InputGroup>
    </Field>
  );
}
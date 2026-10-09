import { Button } from '@moduix/solid/button';
import {
  Checkbox,
  CheckboxControl,
  CheckboxHiddenInput,
  CheckboxLabel,
} from '@moduix/solid/checkbox';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/checkbox/checkbox-with-form.module.css';

export default function CheckboxWithFormDemo() {
  const [submitted, setSubmitted] = createSignal('terms: none');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setSubmitted(`terms: ${new FormData(form).get('terms') ?? 'none'}`);
  };

  return (
    <form class={styles.root} onSubmit={handleSubmit}>
      <Checkbox name="terms" value="accepted">
        <CheckboxControl />
        <CheckboxLabel>I agree to the terms and conditions</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
      <div>
        <output>{submitted()}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
}
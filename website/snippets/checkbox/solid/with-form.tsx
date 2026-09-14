import { Button } from '@moduix/solid/button';
import { Checkbox } from '@moduix/solid/checkbox';
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
        <Checkbox.Control />
        <Checkbox.Label>I agree to the terms and conditions</Checkbox.Label>
        <Checkbox.HiddenInput />
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
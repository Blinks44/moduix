import { Button } from '@moduix/solid/button';
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/solid/radio-group';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/radio-group/radio-group-form.module.css';

const frameworks = ['React', 'Solid', 'Vue'];

export default function RadioGroupFormDemo() {
  const [submitted, setSubmitted] = createSignal('Not submitted');

  function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setSubmitted(`Submitted: ${new FormData(form).get('framework')}`);
  }

  return (
    <form
      class={styles.stack}
      onReset={() => setSubmitted('Not submitted')}
      onSubmit={handleSubmit}
    >
      <RadioGroup defaultValue="React" name="framework">
        <RadioGroupLabel>Framework</RadioGroupLabel>
        {frameworks.map((framework) => (
          <RadioGroupOption value={framework}>{framework}</RadioGroupOption>
        ))}
      </RadioGroup>
      <output>{submitted()}</output>
      <Button size="sm" type="submit">
        Submit
      </Button>
      <Button size="sm" type="reset" variant="outline">
        Reset
      </Button>
    </form>
  );
}
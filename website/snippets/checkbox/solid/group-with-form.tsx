import { Button } from '@moduix/solid/button';
import { Checkbox } from '@moduix/solid/checkbox';
import { createSignal, For } from 'solid-js';
import styles from '@/components/examples/checkbox/checkbox-group-with-form.module.css';

const options = [
  { value: 'react', label: 'React' },
  { value: 'solid', label: 'Solid' },
  { value: 'vue', label: 'Vue' },
];

export default function CheckboxGroupWithFormDemo() {
  const [submitted, setSubmitted] = createSignal('framework: []');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    setSubmitted(`framework: ${JSON.stringify(new FormData(form).getAll('framework'))}`);
  };

  return (
    <form class={styles.root} onSubmit={handleSubmit}>
      <Checkbox.Group defaultValue={['react']} name="framework">
        <For each={options}>
          {(option) => (
            <Checkbox value={option.value}>
              <Checkbox.Control />
              <Checkbox.Label>{option.label}</Checkbox.Label>
              <Checkbox.HiddenInput />
            </Checkbox>
          )}
        </For>
      </Checkbox.Group>
      <div>
        <output>{submitted()}</output>
        <Button type="submit" size="sm">
          Submit
        </Button>
      </div>
    </form>
  );
}
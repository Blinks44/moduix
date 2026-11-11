<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { NumberInput, NumberInputField, NumberInputLabel } from '@moduix/svelte/number-input';
  import styles from '@/components/examples/number-input/number-input-form-submission.module.css';

  let submittedValue = $state('Not submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();

    if (event.currentTarget instanceof HTMLFormElement) {
      submittedValue = String(new FormData(event.currentTarget).get('quantity'));
    }
  };
</script>

<form class={styles.root} onsubmit={handleSubmit}>
  <NumberInput defaultValue="42" name="quantity">
    <NumberInputLabel>Quantity</NumberInputLabel>
    <NumberInputField />
  </NumberInput>
  <output>Submitted: {submittedValue}</output>
  <Button type="submit" size="sm">Submit quantity</Button>
</form>
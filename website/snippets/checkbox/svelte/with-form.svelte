<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
  import styles from '@/components/examples/checkbox/checkbox-with-form.module.css';

  let submitted = $state('terms: none');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = `terms: ${new FormData(form).get('terms') ?? 'none'}`;
  };
</script>

<form class={styles.root} onsubmit={handleSubmit}>
  <Checkbox name="terms" value="accepted">
    <CheckboxControl />
    <CheckboxLabel>I agree to the terms and conditions</CheckboxLabel>
    <CheckboxHiddenInput />
  </Checkbox>
  <div data-preview-meta>
    <output>{submitted}</output>
    <button type="submit">Submit</button>
  </div>
</form>
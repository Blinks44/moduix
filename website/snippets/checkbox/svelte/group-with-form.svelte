<script lang="ts">
  import {
    Checkbox,
    CheckboxControl,
    CheckboxGroup,
    CheckboxHiddenInput,
    CheckboxLabel,
  } from '@moduix/svelte/checkbox';
  import styles from '@/components/examples/checkbox/checkbox-group-with-form.module.css';

  const options = [
    { value: 'react', label: 'React' },
    { value: 'solid', label: 'Solid' },
    { value: 'vue', label: 'Vue' },
  ];
  const defaultValue = ['react'];
  let submitted = $state('framework: []');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = `framework: ${JSON.stringify(new FormData(form).getAll('framework'))}`;
  };
</script>

<form class={styles.root} onsubmit={handleSubmit}>
  <CheckboxGroup {defaultValue} name="framework">
    {#each options as option (option.value)}
      <Checkbox value={option.value}>
        <CheckboxControl />
        <CheckboxLabel>{option.label}</CheckboxLabel>
        <CheckboxHiddenInput />
      </Checkbox>
    {/each}
  </CheckboxGroup>
  <div>
    <output>{submitted}</output>
    <button type="submit">Submit</button>
  </div>
</form>
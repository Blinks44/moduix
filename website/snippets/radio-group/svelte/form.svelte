<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@moduix/svelte/radio-group';
  import styles from '@/components/examples/radio-group/radio-group-form.module.css';

  const frameworks = ['React', 'Solid', 'Vue'];
  let submitted = $state('Not submitted');

  const handleSubmit = (event: SubmitEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    submitted = `Submitted: ${String(new FormData(form).get('framework') ?? '')}`;
  };
</script>

<form class={styles.stack} onreset={() => (submitted = 'Not submitted')} onsubmit={handleSubmit}>
  <RadioGroup defaultValue="React" name="framework">
    <RadioGroupLabel>Framework</RadioGroupLabel>
    {#each frameworks as framework (framework)}
      <RadioGroupOption value={framework}>
        {framework}
      </RadioGroupOption>
    {/each}
  </RadioGroup>
  <output>{submitted}</output>
  <Button size="sm" type="submit">Submit</Button>
  <Button size="sm" type="reset" variant="outline">Reset</Button>
</form>
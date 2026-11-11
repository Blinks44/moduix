<script lang="ts">
  import { Fieldset, FieldsetLegend } from '@moduix/svelte/fieldset';
  import { RadioGroup, RadioGroupOption } from '@moduix/svelte/radio-group';
  import styles from '@/components/examples/radio-group/radio-group-with-fieldset.module.css';

  const frameworks = ['React', 'Solid', 'Vue'];
</script>

<Fieldset class={styles.root}>
  <FieldsetLegend>Select a framework</FieldsetLegend>
  <RadioGroup defaultValue="React">
    {#each frameworks as framework (framework)}
      <RadioGroupOption value={framework}>
        {framework}
      </RadioGroupOption>
    {/each}
  </RadioGroup>
</Fieldset>
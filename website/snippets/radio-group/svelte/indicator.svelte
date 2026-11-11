<script lang="ts">
  import { RadioGroup, RadioGroupIndicator, RadioGroupOption } from '@moduix/svelte/radio-group';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/radio-group/radio-group-indicator.module.css';

  const frameworks = ['React', 'Solid', 'Vue'];
</script>

<Stack gap="2">
  <div>Framework</div>
  <RadioGroup aria-label="Framework" defaultValue="React" class={styles.root}>
    <RadioGroupIndicator />
    {#each frameworks as framework (framework)}
      <RadioGroupOption value={framework}>
        {framework}
      </RadioGroupOption>
    {/each}
  </RadioGroup>
</Stack>
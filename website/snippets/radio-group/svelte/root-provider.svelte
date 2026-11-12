<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    RadioGroupLabel,
    RadioGroupOption,
    RadioGroupRootProvider,
    useRadioGroup,
  } from '@moduix/svelte/radio-group';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/radio-group/radio-group-root-provider.module.css';

  const frameworks = ['React', 'Solid', 'Vue'];
  const radioGroup = useRadioGroup({ defaultValue: 'React' });
</script>

<Stack align="center" gap="2">
  <RadioGroupRootProvider class={styles.root} value={radioGroup}>
    <RadioGroupLabel>Framework</RadioGroupLabel>
    {#each frameworks as framework (framework)}
      <RadioGroupOption value={framework}>
        {framework}
      </RadioGroupOption>
    {/each}
  </RadioGroupRootProvider>
  <div data-preview-meta>
    <output>Selected: {radioGroup().value ?? 'none'}</output>
    <Button type="button" size="sm" onclick={() => radioGroup().setValue('Solid')}>
      Set to Solid
    </Button>
  </div>
</Stack>
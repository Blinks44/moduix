<script lang="ts">
  import {
    RadioGroup,
    RadioGroupItem,
    RadioGroupItemControl,
    RadioGroupItemHiddenInput,
    RadioGroupItemText,
    RadioGroupLabel,
  } from '@moduix/svelte/radio-group';
  import styles from '@/components/examples/radio-group/radio-group-aschild.module.css';

  const frameworks = ['React', 'Solid', 'Vue'];
</script>

<RadioGroup defaultValue="React">
  <RadioGroupLabel>Framework</RadioGroupLabel>
  {#each frameworks as framework (framework)}
    <RadioGroupItem value={framework}>
      {#snippet asChild(props)}
        <label {...props()} class={styles.cardItem}>
          <RadioGroupItemControl />
          <RadioGroupItemText>{framework}</RadioGroupItemText>
          <RadioGroupItemHiddenInput />
        </label>
      {/snippet}
    </RadioGroupItem>
  {/each}
</RadioGroup>
<script module lang="ts">
  import CircleX from '@lucide/svelte/icons/circle-x';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { CloseButton } from '@/components/close-button';
  import styles from './CloseButton.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/CloseButton',
    component: CloseButton,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
    args: { 'aria-label': 'Close' },
  });
</script>

<Story name="Default" asChild>
  <CloseButton aria-label="Close" />
</Story>

<Story name="Custom Children" asChild>
  <CloseButton class={styles.customChildrenButton} aria-label="Close panel">
    <CircleX aria-hidden="true" focusable="false" strokeWidth={3} />
  </CloseButton>
</Story>

<Story name="As Child" asChild>
  <CloseButton aria-label="Close">
    {#snippet asChild(props)}
      <button {...props({ type: 'button' })}>
        <CircleX aria-hidden="true" focusable="false" strokeWidth={3} />
      </button>
    {/snippet}
  </CloseButton>
</Story>

<Story name="Styled" asChild>
  <CloseButton class={styles.customButton} aria-label="Close message">
    <CircleX aria-hidden="true" focusable="false" strokeWidth={3} />
  </CloseButton>
</Story>

<Story name="Disabled" asChild>
  <CloseButton disabled aria-label="Close" />
</Story>

<Story name="Aria Disabled" asChild>
  <CloseButton aria-disabled="true" aria-label="Close" />
</Story>

<Story name="Disabled As Child" asChild>
  <CloseButton disabled aria-label="Close">
    {#snippet asChild(props)}
      <button {...props({ type: 'button' })}>
        <CircleX aria-hidden="true" focusable="false" strokeWidth={3} />
      </button>
    {/snippet}
  </CloseButton>
</Story>
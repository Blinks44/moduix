<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Bleed } from '@/components/bleed';
  import styles from './Bleed.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Bleed',
    component: Bleed,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <div class={styles.container}>
    <p class={[styles.text, styles.mutedText]}>Container content stays constrained.</p>
    <Bleed class={styles.bleed}>
      <p class={[styles.text, styles.semiboldText]}>This block bleeds to the viewport edges.</p>
    </Bleed>
    <p class={[styles.text, styles.mutedText]}>Following content returns to the container width.</p>
  </div>
</Story>

<Story name="Block Bleed" asChild>
  <div class={styles.paddedContainer}>
    <p class={[styles.text, styles.mutedText]}>Container padding above.</p>
    <Bleed inline="md" block="md" class={styles.panel}>
      <p class={styles.text}>Inline and block bleed</p>
    </Bleed>
    <p class={[styles.text, styles.mutedText]}>Container padding below.</p>
  </div>
</Story>

<Story name="Custom Styling" asChild>
  <div class={styles.container}>
    <Bleed class={styles.customBleed}>
      <p class={[styles.text, styles.semiboldText]}>Customized bleed amount.</p>
    </Bleed>
  </div>
</Story>

<Story name="Inline Amounts" asChild>
  <div class={styles.container}>
    <Bleed inline="sm" class={styles.panel}><p class={styles.text}>Small inline bleed</p></Bleed>
    <Bleed inline="lg" class={styles.panel}><p class={styles.text}>Large inline bleed</p></Bleed>
    <Bleed inline="full" class={styles.panel}><p class={styles.text}>Full inline bleed</p></Bleed>
  </div>
</Story>

<Story name="Semantic Element" asChild>
  <div class={styles.container}>
    <Bleed class={styles.figure}
      >{#snippet asChild(props)}<figure {...props()}>
          <div class={styles.media}></div>
          <p class={[styles.text, styles.mutedText, styles.smallText]}>
            Full-width media with a constrained parent.
          </p>
        </figure>{/snippet}</Bleed
    >
  </div>
</Story>
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Separator } from '@/components/separator';
  import styles from './Separator.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Separator',
    component: Separator,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Default" asChild>
  <div class={styles.card}>
    <div class={styles.stack}>
      <span class={styles.link}>Account settings</span>
      <Separator />
      <span class={styles.link}>Billing details</span>
    </div>
  </div>
</Story>

<Story name="Vertical" asChild>
  <nav class={styles.nav} aria-label="Main navigation">
    <a href="#docs" class={styles.link}>Home</a>
    <a href="#docs" class={styles.link}>Pricing</a>
    <Separator orientation="vertical" />
    <a href="#docs" class={styles.link}>Sign in</a>
  </nav>
</Story>

<Story name="Variants" asChild>
  <div class={styles.section}>
    <span class={styles.link}>Solid</span>
    <Separator />
    <span class={styles.link}>Dashed</span>
    <Separator variant="dashed" />
    <span class={styles.link}>Dotted</span>
    <Separator variant="dotted" />
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.section}>
    <span class={styles.link}>Extra small</span>
    <Separator size="xs" />
    <span class={styles.link}>Small</span>
    <Separator size="sm" />
    <span class={styles.link}>Medium</span>
    <Separator size="md" />
    <span class={styles.link}>Large</span>
    <Separator size="lg" />
  </div>
</Story>

<Story name="Decorative" asChild>
  <div class={styles.section}>
    <span class={styles.link}>Related visual content</span>
    <Separator role="presentation" />
    <span class={styles.link}>Hidden from the accessibility tree</span>
  </div>
</Story>

<Story name="As Child" asChild>
  <div class={styles.section}>
    <span class={styles.link}>Native host</span>
    <Separator>{#snippet asChild(props)}<hr {...props()} />{/snippet}</Separator>
    <span class={styles.link}>Still styled by moduix hooks</span>
  </div>
</Story>

<Story name="Styling" asChild>
  <div class={styles.section}>
    <span class={styles.link}>Completed profile</span>
    <Separator class={styles.customSeparator} />
    <span class={styles.link}>Next step: billing details</span>
  </div>
</Story>
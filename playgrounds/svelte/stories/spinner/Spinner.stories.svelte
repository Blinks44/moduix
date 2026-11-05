<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Spinner } from '@/components/spinner';
  import styles from './Spinner.stories.module.css';

  const { Story } = defineMeta({
    title: 'Components/Spinner',
    component: Spinner,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <div class={styles.inline}>
    <Spinner decorative size="inherit" />
    <span class={styles.muted}>Saving changes</span>
  </div>
</Story>

<Story name="With Visible Text" asChild>
  <div class={styles.inline}>
    <Spinner decorative size="inherit" />
    <span class={styles.muted}>Saving changes</span>
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class={styles.row}>
    <Spinner decorative size="xs" />
    <Spinner decorative size="sm" />
    <Spinner decorative size="md" />
    <Spinner decorative size="lg" />
    <Spinner decorative size="xl" />
  </div>
</Story>

<Story name="Inherited Size" asChild>
  <span style="font-size: var(--moduix-text-xl)">
    <Spinner decorative size="inherit" /> Loading report
  </span>
</Story>

<Story name="Custom Indicator" asChild>
  <Spinner size="lg" aria-label="Syncing">
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3v4M12 17v4M3 12h4M17 12h4M5.64 5.64l2.83 2.83M15.53 15.53l2.83 2.83M18.36 5.64l-2.83 2.83M8.47 15.53l-2.83 2.83"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
      ></path>
    </svg>
  </Spinner>
</Story>

<Story name="As Child" asChild>
  <Spinner size="lg" aria-label="Loading report"
    >{#snippet asChild(props)}<span {...props({ class: styles.brandSpinner })}>
        <span data-scope="spinner" data-part="indicator" data-slot="spinner-indicator">
          <span data-scope="spinner" data-part="ring" data-slot="spinner-ring"></span>
        </span>
      </span>{/snippet}</Spinner
  >
</Story>

<Story name="Styling" asChild>
  <Spinner decorative size="lg" class={styles.brandSpinner} />
</Story>
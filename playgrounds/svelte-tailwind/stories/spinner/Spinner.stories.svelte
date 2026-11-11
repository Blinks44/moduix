<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Spinner } from '@/components/spinner';

  const brandSpinnerClass = 'text-primary [&_[data-slot=spinner-ring]]:border-4';

  const { Story } = defineMeta({
    title: 'Components/Spinner',
    component: Spinner,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <div class="inline-flex items-center gap-2">
    <Spinner decorative size="inherit" />
    <span class="text-muted-foreground">Saving changes</span>
  </div>
</Story>

<Story name="With Visible Text" asChild>
  <div class="inline-flex items-center gap-2">
    <Spinner decorative size="inherit" />
    <span class="text-muted-foreground">Saving changes</span>
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class="flex items-center gap-4">
    <Spinner decorative size="xs" />
    <Spinner decorative size="sm" />
    <Spinner decorative size="md" />
    <Spinner decorative size="lg" />
    <Spinner decorative size="xl" />
  </div>
</Story>

<Story name="Inherited Size" asChild>
  <span class="text-xl">
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
  <Spinner
    size="lg"
    aria-label="Loading report"
    class="animate-(--moduix-animation-spin) text-primary motion-reduce:animate-none"
    >{#snippet asChild(props)}<svg {...props()} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2" opacity="0.22"
        ></circle>
        <path d="M12 3a9 9 0 0 1 9 9" stroke="currentColor" stroke-width="2"></path>
      </svg>{/snippet}</Spinner
  >
</Story>

<Story name="Styling" asChild>
  <Spinner decorative size="lg" class={brandSpinnerClass} />
</Story>
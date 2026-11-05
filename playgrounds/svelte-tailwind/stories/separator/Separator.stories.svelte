<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Separator } from '@/components/separator';

  const cardClass = 'w-72 rounded-md border border-border bg-background p-4';
  const stackClass = 'grid gap-4';
  const navClass = 'inline-flex items-center gap-3 text-nowrap';
  const sectionClass = 'grid gap-2';
  const linkClass = 'text-sm leading-5 text-foreground no-underline';
  const customSeparatorClass = 'w-32 border-primary border-t-2';

  const { Story } = defineMeta({
    title: 'Components/Separator',
    component: Separator,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Default" asChild>
  <div class={cardClass}>
    <div class={stackClass}>
      <span class={linkClass}>Account settings</span>
      <Separator />
      <span class={linkClass}>Billing details</span>
    </div>
  </div>
</Story>

<Story name="Vertical" asChild>
  <nav class={navClass} aria-label="Main navigation">
    <a href="#docs" class={linkClass}>Home</a>
    <a href="#docs" class={linkClass}>Pricing</a>
    <Separator orientation="vertical" />
    <a href="#docs" class={linkClass}>Sign in</a>
  </nav>
</Story>

<Story name="Variants" asChild>
  <div class={sectionClass}>
    <span class={linkClass}>Solid</span>
    <Separator />
    <span class={linkClass}>Dashed</span>
    <Separator variant="dashed" />
    <span class={linkClass}>Dotted</span>
    <Separator variant="dotted" />
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class={sectionClass}>
    <span class={linkClass}>Extra small</span>
    <Separator size="xs" />
    <span class={linkClass}>Small</span>
    <Separator size="sm" />
    <span class={linkClass}>Medium</span>
    <Separator size="md" />
    <span class={linkClass}>Large</span>
    <Separator size="lg" />
  </div>
</Story>

<Story name="Decorative" asChild>
  <div class={sectionClass}>
    <span class={linkClass}>Related visual content</span>
    <Separator role="presentation" />
    <span class={linkClass}>Hidden from the accessibility tree</span>
  </div>
</Story>

<Story name="As Child" asChild>
  <div class={sectionClass}>
    <span class={linkClass}>Native host</span>
    <Separator>{#snippet asChild(props)}<hr {...props()} />{/snippet}</Separator>
    <span class={linkClass}>Still styled by moduix hooks</span>
  </div>
</Story>

<Story name="Styling" asChild>
  <div class={sectionClass}>
    <span class={linkClass}>Completed profile</span>
    <Separator class={customSeparatorClass} />
    <span class={linkClass}>Next step: billing details</span>
  </div>
</Story>
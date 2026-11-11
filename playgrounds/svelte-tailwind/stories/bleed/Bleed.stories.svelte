<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Bleed } from '@/components/bleed';

  const containerClass =
    'flex w-[min(28rem,calc(100vw_-_var(--spacing-8)))] flex-col gap-4 border border-dashed border-border';
  const contentContainerClass = `${containerClass} p-4`;
  const paddedContainerClass = `${containerClass} p-6`;
  const contentClass = 'flex flex-col items-center bg-muted p-4 text-center';
  const figureClass = 'flex flex-col items-center gap-3 bg-muted p-4 text-center';
  const mediaClass =
    'min-h-32 w-[min(28rem,100%)] rounded-md bg-accent bg-[linear-gradient(135deg,rgb(0_0_0_/_0.14),transparent_45%)]';
  const customBleedClass = '-mx-4 [inline-size:calc(100%_+_var(--spacing-8))]';
  const customStyledBleedClass = `${contentClass} ${customBleedClass}`;

  const { Story } = defineMeta({
    title: 'Components/Bleed',
    component: Bleed,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <div class={contentContainerClass}>
    <p class="m-0 text-muted-foreground">Container content stays constrained.</p>
    <Bleed class={contentClass}>
      <p class="m-0 font-semibold">This block bleeds to the viewport edges.</p>
    </Bleed>
    <p class="m-0 text-muted-foreground">Following content returns to the container width.</p>
  </div>
</Story>

<Story name="Block Bleed" asChild>
  <div class={paddedContainerClass}>
    <p class="m-0 text-muted-foreground">Container padding above.</p>
    <Bleed inline="md" block="md" class={contentClass}
      ><p class="m-0">Inline and block bleed</p></Bleed
    >
    <p class="m-0 text-muted-foreground">Container padding below.</p>
  </div>
</Story>

<Story name="Custom Styling" asChild>
  <div class={contentContainerClass}>
    <Bleed class={customStyledBleedClass}>
      <p class="m-0 font-semibold">Customized bleed amount.</p>
    </Bleed>
  </div>
</Story>

<Story name="Inline Amounts" asChild>
  <div class={contentContainerClass}>
    <Bleed inline="sm" class={contentClass}><p class="m-0">Small inline bleed</p></Bleed>
    <Bleed inline="lg" class={contentClass}><p class="m-0">Large inline bleed</p></Bleed>
    <Bleed inline="full" class={contentClass}><p class="m-0">Full inline bleed</p></Bleed>
  </div>
</Story>

<Story name="Semantic Element" asChild>
  <div class={contentContainerClass}>
    <Bleed class={figureClass}
      >{#snippet asChild(props)}<figure {...props()}>
          <div class={mediaClass}></div>
          <p class="m-0 text-sm text-muted-foreground">
            Full-width media with a constrained parent.
          </p>
        </figure>{/snippet}</Bleed
    >
  </div>
</Story>
<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Stack } from '@/components/stack';

  const panelClass = 'w-80 rounded-lg border border-border bg-background p-4';
  const rowClass = panelClass;
  const wrapClass = 'w-80';
  const pillClass =
    'rounded-full border border-border bg-muted px-3 py-2 text-sm leading-5 text-foreground';
  const skeletonCardClass = 'w-80';
  const mutedClass = 'text-muted-foreground';

  const { Story } = defineMeta({
    title: 'Components/Stack',
    component: Stack,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <Stack gap={12} class={panelClass}>
    <p class="font-semibold">Project updates</p>
    <p class={mutedClass}>
      Use Stack when layout intent is just flex direction, spacing, and alignment.
    </p>
    <p class={mutedClass}>Keep more specific layout rules in local CSS.</p>
  </Stack>
</Story>

<Story name="Row" asChild>
  <Stack direction="row" align="center" justify="space-between" gap={12} class={rowClass}>
    <p class="font-semibold">Status</p>
    <p class={mutedClass}>Ready to publish</p>
  </Stack>
</Story>

<Story name="Wrap" asChild>
  <Stack direction="row" gap={8} wrap="wrap" class={wrapClass}>
    <div class={pillClass}>Design</div>
    <div class={pillClass}>Engineering</div>
    <div class={pillClass}>Docs</div>
    <div class={pillClass}>Release</div>
  </Stack>
</Story>

<Story name="Separator" asChild>
  <Stack direction="row" align="center" gap={10} class={rowClass}>
    <p class="font-semibold">Design</p>
    <span role="separator" aria-hidden="true" class="w-px self-stretch bg-border"></span>
    <p class={mutedClass}>Engineering</p>
    <span role="separator" aria-hidden="true" class="w-px self-stretch bg-border"></span>
    <p class={mutedClass}>Docs</p>
  </Stack>
</Story>

<Story name="Fill" asChild>
  <Stack direction="row" align="center" gap={12} class={rowClass}>
    <div class="h-10 w-10 rounded-full bg-muted"></div>
    <Stack gap={8} fill>
      <div class="h-4 w-[48%] rounded-sm bg-muted"></div>
      <div class="h-3.5 rounded-sm bg-muted"></div>
    </Stack>
  </Stack>
</Story>

<Story name="Responsive Direction" asChild>
  <Stack direction={{ mobile: 'column', desktop: 'row' }} gap={12} class={rowClass}>
    <p class="font-semibold wrap-anywhere">Adaptive layout</p>
    <p class="wrap-anywhere text-muted-foreground">Column on mobile, row from desktop width.</p>
  </Stack>
</Story>

<Story name="Reverse Direction" asChild>
  <Stack direction="row-reverse" align="center" gap={12} class={rowClass}>
    <p class="font-semibold">Newest update</p>
    <p class={mutedClass}>Appears first in the visual row.</p>
  </Stack>
</Story>

<Story name="Skeleton Composition" asChild>
  <Stack gap={16} class={skeletonCardClass}>
    <div class="h-36 rounded-lg bg-muted"></div>
    <Stack gap={12}>
      <div class="h-4.5 w-[62%] rounded-sm bg-muted"></div>
      <div class="h-3.5 rounded-sm bg-muted"></div>
      <div class="h-3.5 w-[78%] rounded-sm bg-muted"></div>
    </Stack>
  </Stack>
</Story>

<Story name="Semantic Element" asChild>
  <Stack gap={12} class={panelClass}
    >{#snippet asChild(props)}<section {...props()}>
        <p class="font-semibold">Rendered as section</p>
        <p class={mutedClass}>
          Use asChild when the layout wrapper should also carry document semantics.
        </p>
      </section>{/snippet}</Stack
  >
</Story>
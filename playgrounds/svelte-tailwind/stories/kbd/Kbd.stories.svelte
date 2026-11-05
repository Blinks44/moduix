<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Kbd, KbdGroup } from '@/components/kbd';

  const rowClass = 'flex flex-wrap items-center gap-2';
  const columnClass = 'grid gap-3';
  const customKbdClass =
    'min-h-8 min-w-8 rounded-md border-primary/30 bg-primary/10 px-3 text-primary shadow-[inset_0_-1px_0_color-mix(in_oklab,currentColor_22%,transparent)]';
  const customGroupClass = 'gap-2';
  const denseClass = 'min-h-5 min-w-5 px-1';

  const { Story } = defineMeta({
    title: 'Components/Kbd',
    component: Kbd,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <KbdGroup aria-label="Command K">
    <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
  </KbdGroup>
</Story>

<Story name="Single Key" asChild>
  <Kbd>Esc</Kbd>
</Story>

<Story name="Root Part" asChild>
  <Kbd>Enter</Kbd>
</Story>

<Story name="As Child" asChild>
  <Kbd>{#snippet asChild(props)}<kbd {...props()} title="Escape">Esc</kbd>{/snippet}</Kbd>
</Story>

<Story name="Group As Child" asChild>
  <KbdGroup aria-label="Command K"
    >{#snippet asChild(props)}<span {...props()}>
        <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
      </span>{/snippet}</KbdGroup
  >
</Story>

<Story name="Shortcut List" asChild>
  <div class={columnClass}>
    <div
      class="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm leading-5 text-muted-foreground"
    >
      <KbdGroup aria-label="Command K">
        <Kbd>Cmd</Kbd>+<Kbd>K</Kbd>
      </KbdGroup>
      Open command menu
    </div>
    <div
      class="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm leading-5 text-muted-foreground"
    >
      <KbdGroup aria-label="Shift question mark">
        <Kbd>Shift</Kbd>+<Kbd>?</Kbd>
      </KbdGroup>
      Show shortcuts
    </div>
    <div
      class="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm leading-5 text-muted-foreground"
    >
      <Kbd>Esc</Kbd>
      Close overlay
    </div>
  </div>
</Story>

<Story name="Dense" asChild>
  <div class={rowClass}>
    <Kbd class={denseClass}>Esc</Kbd>
    <Kbd class={denseClass}>Ctrl</Kbd>
    <Kbd class={denseClass}>/</Kbd>
  </div>
</Story>

<Story name="Custom Styling" asChild>
  <KbdGroup aria-label="Command K" class={customGroupClass}>
    <Kbd class={customKbdClass}>Cmd</Kbd>+<Kbd class={customKbdClass}>K</Kbd>
  </KbdGroup>
</Story>

<Story name="With Icon" asChild>
  <KbdGroup aria-label="Shift Enter">
    <Kbd>Shift</Kbd>+<Kbd>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M9 10 4 15l5 5"></path>
        <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
      </svg>
      Enter
    </Kbd>
  </KbdGroup>
</Story>
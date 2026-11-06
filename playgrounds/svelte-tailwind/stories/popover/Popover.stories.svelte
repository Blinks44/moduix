<script module lang="ts">
  import Bell from '@lucide/svelte/icons/bell';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Popover,
    PopoverAnchor,
    PopoverBody,
    PopoverCloseIcon,
    PopoverCloseTrigger,
    PopoverContent,
    PopoverDescription,
    PopoverFooter,
    PopoverHeader,
    PopoverPositioner,
    PopoverRootProvider,
    PopoverTitle,
    PopoverTrigger,
    usePopover,
  } from '@/components/popover';
  import PopoverState from './PopoverState.svelte';
  import PopoverSurface from './PopoverSurface.svelte';

  const { Story } = defineMeta({
    title: 'Components/Popover',
    component: Popover,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const popoverActions = [
    {
      id: 'share',
      label: 'Share',
      detail: 'Share this item with others by link or email.',
    },
    {
      id: 'export',
      label: 'Export',
      detail: 'Export this item as PDF, CSV, or JSON.',
    },
    {
      id: 'archive',
      label: 'Archive',
      detail: 'Move this item to the archive for later reference.',
    },
  ];

  const triggerContentClass = 'inline-flex items-center gap-2';
  const iconClass = 'size-4';
  const stackClass = 'grid justify-items-center gap-3';
  const fieldClass = 'mt-3 grid gap-2 text-sm';
  const inputClass =
    'min-h-control-lg min-w-64 rounded-md border border-border bg-background px-3 text-foreground';
  const wideTriggerClass = 'w-80';
  const triggerGroupClass = 'flex flex-wrap justify-center gap-2';
  const nestedBodyClass = 'mt-3';
</script>

<script lang="ts">
  let open = $state(false);
  let emailRef: HTMLInputElement | undefined = $state();
  let activeItem = $state<(typeof popoverActions)[number] | null>(null);
  const popover = usePopover({ positioning: { placement: 'bottom-start', gutter: 8 } });

  const handleTriggerValueChange = (details: { value?: string | null }) => {
    activeItem = popoverActions.find((item) => item.id === details.value) ?? null;
  };
</script>

<Story name="Basic" asChild>
  <Popover positioning={{ gutter: 8 }}>
    <PopoverTrigger>
      {#snippet asChild(props)}
        <Button {...props()}>
          <span class={triggerContentClass}>
            <Bell class={iconClass} aria-hidden="true" />Notifications
          </span>
        </Button>
      {/snippet}
    </PopoverTrigger>
    <PopoverSurface title="Notifications" description="You are all caught up. Good job!" />
  </Popover>
</Story>

<Story name="Controlled" asChild>
  <div class={stackClass}>
    <span>Popover is {open ? 'open' : 'closed'}</span>
    <Popover bind:open>
      <PopoverTrigger>
        {#snippet asChild(props)}<Button {...props()}>Open controlled popover</Button>{/snippet}
      </PopoverTrigger>
      <PopoverSurface
        title="Publish changes?"
        description="This action will make your latest updates visible to all users."
      />
    </Popover>
  </div>
</Story>

<Story name="Root Provider" asChild>
  <div class={stackClass}>
    <span>Popover is {popover().open ? 'open' : 'closed'}</span>
    <Button variant="outline" onclick={() => popover().setOpen(!popover().open)}>
      Toggle externally
    </Button>
    <PopoverRootProvider value={popover}>
      <PopoverTrigger>
        {#snippet asChild(props)}<Button {...props()}>Open from trigger</Button>{/snippet}
      </PopoverTrigger>
      <PopoverSurface
        title="External state"
        description="The usePopover hook owns this popover state."
      />
    </PopoverRootProvider>
  </div>
</Story>

<Story name="Context" asChild>
  <Popover positioning={{ gutter: 8 }}>
    <PopoverTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open context example</Button>{/snippet}
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Context state</PopoverTitle>
          <PopoverDescription>
            Read the popover state from a descendant without prop drilling.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverFooter
          ><PopoverState /><PopoverCloseTrigger>Close</PopoverCloseTrigger></PopoverFooter
        >
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</Story>

<Story name="With Arrow" asChild>
  <Popover positioning={{ gutter: 8 }}>
    <PopoverTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open with arrow</Button>{/snippet}
    </PopoverTrigger>
    <PopoverSurface
      arrow
      title="With arrow"
      description="Arrow and ArrowTip use Ark positioning variables."
    />
  </Popover>
</Story>

<Story name="Positioning" asChild>
  <Popover positioning={{ placement: 'left', gutter: 12 }}>
    <PopoverTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open on the left</Button>{/snippet}
    </PopoverTrigger>
    <PopoverSurface
      title="Left placement"
      description="Placement and offsets belong to Root.positioning."
    />
  </Popover>
</Story>

<Story name="Lazy Mount" asChild>
  <Popover lazyMount unmountOnExit positioning={{ gutter: 8 }}>
    <PopoverTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open lazy popover</Button>{/snippet}
    </PopoverTrigger>
    <PopoverSurface
      title="Lazy mounted"
      description="This content mounts on open and unmounts after exit."
    />
  </Popover>
</Story>

<Story name="Close Behavior" asChild>
  <Popover closeOnEscape={false} closeOnInteractOutside={false}>
    <PopoverTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open persistent popover</Button>{/snippet}
    </PopoverTrigger>
    <PopoverSurface
      title="Explicit close"
      description="Escape and outside interactions do not dismiss this popover."
    />
  </Popover>
</Story>

<Story name="Modal" asChild>
  <Popover modal initialFocusEl={() => emailRef ?? null}>
    <PopoverTrigger>
      {#snippet asChild(props)}<Button {...props()}>Invite teammates</Button>{/snippet}
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverCloseIcon />
        <PopoverHeader>
          <PopoverTitle>Invite teammates</PopoverTitle>
          <PopoverDescription>
            Focus is trapped inside this modal popover until dismissed.
          </PopoverDescription>
        </PopoverHeader>
        <PopoverBody>
          <label class={fieldClass}>
            <span>Email</span>
            <input id="popover-email" bind:this={emailRef} class={inputClass} />
          </label>
        </PopoverBody>
        <PopoverFooter><PopoverCloseTrigger>Done</PopoverCloseTrigger></PopoverFooter>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</Story>

<Story name="Anchor" asChild>
  <Popover positioning={{ gutter: 8 }}>
    <div class={stackClass}>
      <PopoverAnchor>
        {#snippet asChild(props)}
          <input {...props()} class={inputClass} placeholder="Popover anchor" />
        {/snippet}
      </PopoverAnchor>
      <PopoverTrigger>
        {#snippet asChild(props)}<Button {...props()}>Open below the input</Button>{/snippet}
      </PopoverTrigger>
    </div>
    <PopoverSurface
      title="Custom anchor"
      description="The popup is positioned relative to the input instead of the trigger."
    />
  </Popover>
</Story>

<Story name="Same Width" asChild>
  <Popover positioning={{ sameWidth: true, gutter: 8 }}>
    <PopoverTrigger>
      {#snippet asChild(props)}
        <Button {...props()} class={wideTriggerClass}>Match this trigger width</Button>
      {/snippet}
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverTitle>Matched width</PopoverTitle>
        <PopoverDescription>The content uses Ark's reference width measurement.</PopoverDescription>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</Story>

<Story name="Multiple Triggers" asChild>
  <Popover onTriggerValueChange={handleTriggerValueChange} positioning={{ gutter: 8 }}>
    <div class={triggerGroupClass}>
      {#each popoverActions as item (item.id)}
        <PopoverTrigger value={item.id}>{item.label}</PopoverTrigger>
      {/each}
    </div>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverTitle>{activeItem?.label ?? 'Select an action'}</PopoverTitle>
        <PopoverDescription>{activeItem?.detail ?? 'Choose one of the actions.'}</PopoverDescription
        >
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</Story>

<Story name="Nested" asChild>
  <Popover positioning={{ gutter: 8 }}>
    <PopoverTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open settings</Button>{/snippet}
    </PopoverTrigger>
    <PopoverPositioner>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>Settings</PopoverTitle>
          <PopoverDescription>Nested popovers keep independent state.</PopoverDescription>
        </PopoverHeader>
        <PopoverBody class={nestedBodyClass}>
          <Popover portalled={false} positioning={{ placement: 'right', gutter: 8 }}>
            <PopoverTrigger>
              {#snippet asChild(props)}<Button {...props()} variant="outline">Advanced</Button
                >{/snippet}
            </PopoverTrigger>
            <PopoverSurface
              title="Advanced settings"
              description="This content belongs to the nested popover."
            />
          </Popover>
        </PopoverBody>
      </PopoverContent>
    </PopoverPositioner>
  </Popover>
</Story>
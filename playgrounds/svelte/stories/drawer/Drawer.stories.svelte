<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Drawer,
    DrawerBody,
    DrawerCloseIcon,
    DrawerCloseTrigger,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerGrabber,
    DrawerGrabberIndicator,
    DrawerHeader,
    DrawerIndent,
    DrawerIndentBackground,
    DrawerPositioner,
    DrawerRootProvider,
    DrawerStack,
    DrawerTitle,
    DrawerTrigger,
    useDrawer,
  } from '@/components/drawer';
  import { insideScrollSections } from '../data/insideScrollSections';
  import storyStyles from './Drawer.stories.module.css';
  import DrawerContextReadout from './DrawerContextReadout.svelte';
  import DrawerSurface from './DrawerSurface.svelte';

  const { Story } = defineMeta({
    title: 'Components/Drawer',
    component: Drawer,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const snapPoints = [0.3, 1];

  const users = [
    { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
    { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    { id: '3', name: 'Carol Davis', email: 'carol@example.com' },
  ];
</script>

<script lang="ts">
  let open = $state(false);
  let activeUser = $state<(typeof users)[number] | null>(null);
  const drawer = useDrawer({
    id: 'drawer-root-provider',
    defaultSnapPoint: 0.5,
    snapPoints: [0.25, 0.5, 1],
  });
</script>

<Story name="Basic" asChild>
  <Drawer {snapPoints} defaultSnapPoint={snapPoints[0]}>
    <DrawerTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open drawer</Button>{/snippet}
    </DrawerTrigger>
    <DrawerSurface title="Notifications" description="You are all caught up. Good job!">
      <DrawerBody>Bottom drawers are draggable by default.</DrawerBody>
      <DrawerFooter>
        <DrawerCloseTrigger>
          {#snippet asChild(props)}<Button {...props()} variant="outline">Close</Button>{/snippet}
        </DrawerCloseTrigger>
      </DrawerFooter>
    </DrawerSurface>
  </Drawer>
</Story>

<Story name="Swipe Direction" asChild>
  <Drawer swipeDirection="end">
    <DrawerTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open right drawer</Button>{/snippet}
    </DrawerTrigger>
    <DrawerSurface title="Details" description={'This drawer uses swipeDirection="end".'}>
      <DrawerBody>Logical directions resolve for both LTR and RTL layouts.</DrawerBody>
    </DrawerSurface>
  </Drawer>
</Story>

<Story name="Snap Points" asChild>
  <Drawer snapPoints={[0.25, 0.5, 1]} defaultSnapPoint={0.5}>
    <DrawerTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open with snap points</Button>{/snippet}
    </DrawerTrigger>
    <DrawerSurface
      title="Snap points"
      description="Drag between 25%, 50%, and 100% of the viewport."
    >
      <DrawerBody class={storyStyles.scrollBody}>
        {#each insideScrollSections as item (item.title)}
          <section>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </section>
        {/each}
      </DrawerBody>
    </DrawerSurface>
  </Drawer>
</Story>

<Story name="Island" asChild>
  <Drawer swipeDirection="end">
    <DrawerTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open island drawer</Button>{/snippet}
    </DrawerTrigger>
    <DrawerSurface
      variant="island"
      title="Floating drawer"
      description="This compact drawer stays inset from the viewport edge."
    >
      <DrawerBody>Use the island variant for a detached drawer surface.</DrawerBody>
    </DrawerSurface>
  </Drawer>
</Story>

<Story name="Non Modal" asChild>
  <Drawer modal={false} preventScroll={false} {snapPoints} defaultSnapPoint={snapPoints[0]}>
    <DrawerTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open non-modal drawer</Button>{/snippet}
    </DrawerTrigger>
    <DrawerPositioner>
      <DrawerContent class={storyStyles.nonModalContent} draggable={false}>
        <DrawerGrabber class={storyStyles.nonModalGrabber}>
          <DrawerGrabberIndicator />
          <DrawerHeader>
            <DrawerTitle>Non-modal drawer</DrawerTitle>
            <DrawerCloseIcon data-no-drag />
            <DrawerDescription
              >Drag this header; the page and the scrollable content stay interactive.</DrawerDescription
            >
          </DrawerHeader>
        </DrawerGrabber>
        <DrawerBody class={storyStyles.nonModalScrollRegion}>
          <!-- The other adapters wrap this list in ScrollArea; switch once it is ported. -->
          <div class={storyStyles.nonModalScrollArea} style="overflow-y: auto">
            <div class={storyStyles.nonModalScrollViewport}>
              <div class={storyStyles.nonModalScrollContent}>
                {#each insideScrollSections as item (item.title)}
                  <section>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </section>
                {/each}
              </div>
            </div>
          </div>
        </DrawerBody>
      </DrawerContent>
    </DrawerPositioner>
  </Drawer>
</Story>

<Story name="Controlled" asChild>
  <Button onclick={() => (open = !open)}>{open ? 'Close' : 'Open'} drawer</Button>
  <Drawer bind:open {snapPoints} defaultSnapPoint={snapPoints[0]}>
    <DrawerSurface title="Controlled drawer" description={'Open: ' + String(open)} />
  </Drawer>
</Story>

<Story name="No Drag Area" asChild>
  <Drawer {snapPoints} defaultSnapPoint={snapPoints[0]}>
    <DrawerTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open drawer</Button>{/snippet}
    </DrawerTrigger>
    <DrawerSurface title="No-drag area">
      <DrawerBody>
        <div data-no-drag class={storyStyles.noDragArea}>
          Pointer gestures that start here do not drag the drawer.
        </div>
      </DrawerBody>
    </DrawerSurface>
  </Drawer>
</Story>

<Story name="Non Draggable" asChild>
  <Drawer {snapPoints} defaultSnapPoint={snapPoints[0]}>
    <DrawerTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open non-draggable drawer</Button>{/snippet}
    </DrawerTrigger>
    <DrawerSurface
      title="Grabber-only dragging"
      description="Content dragging is disabled; the grabber remains draggable."
      draggable={false}
    />
  </Drawer>
</Story>

<Story name="Multiple Triggers" asChild>
  <Drawer
    swipeDirection="end"
    onTriggerValueChange={(details) => {
      activeUser = users.find((user) => user.id === details.value) ?? null;
    }}
  >
    <div class={storyStyles.triggerGroup}>
      {#each users as user (user.id)}
        <DrawerTrigger value={user.id}>
          {#snippet asChild(props)}
            <Button {...props()} variant="outline">Edit {user.name}</Button>
          {/snippet}
        </DrawerTrigger>
      {/each}
    </div>
    <DrawerSurface title="Edit user" description={activeUser?.email}>
      {#if activeUser}
        <DrawerBody>
          <label class={storyStyles.field}>Name<input value={activeUser.name} /></label>
        </DrawerBody>
      {/if}
    </DrawerSurface>
  </Drawer>
</Story>

<Story name="Root Provider" asChild>
  <div class={storyStyles.providerDemo}>
    <div class={storyStyles.triggerGroup}>
      <Button onclick={() => drawer().setOpen(true)}>Open via API</Button>
      <Button variant="outline" onclick={() => drawer().setSnapPoint(0.25)}>Set 25%</Button>
      <Button variant="outline" onclick={() => drawer().setSnapPoint(1)}>Set 100%</Button>
    </div>
    <DrawerRootProvider value={drawer}>
      <DrawerSurface
        title="Root provider"
        description={'Active snap point: ' + String(drawer().snapPoint)}
      />
    </DrawerRootProvider>
  </div>
</Story>

<Story name="Indent Background" parameters={{ layout: 'fullscreen' }} asChild>
  <DrawerStack>
    <div class={storyStyles.indentStage}>
      <DrawerIndentBackground />
      <Drawer modal={false} portalled={false} {snapPoints} defaultSnapPoint={snapPoints[0]}>
        <DrawerIndent class={storyStyles.indentSurface}>
          <DrawerTrigger>
            {#snippet asChild(props)}<Button {...props()}>Open indented drawer</Button>{/snippet}
          </DrawerTrigger>
        </DrawerIndent>
        <DrawerSurface
          title="Indent effect"
          description="DrawerStack coordinates the background and page surface."
        />
      </Drawer>
    </div>
  </DrawerStack>
</Story>

<Story name="Context" asChild>
  <Drawer {snapPoints} defaultSnapPoint={snapPoints[0]}>
    <DrawerTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open context example</Button>{/snippet}
    </DrawerTrigger>
    <DrawerSurface title="Context state"><DrawerContextReadout /></DrawerSurface>
  </Drawer>
</Story>
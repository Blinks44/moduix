<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Collapsible,
    CollapsibleBody,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleRootProvider,
    CollapsibleTrigger,
    useCollapsible,
  } from '@/components/collapsible';
  import { ChevronDownIcon } from '@/lib/moduix/icons/ui';
  import RecoveryKeys from './RecoveryKeys.svelte';

  const { Story } = defineMeta({
    title: 'Components/Collapsible',
    component: Collapsible,
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let open = $state(false);
  const collapsible = useCollapsible({ id: 'collapsible-root-provider' });
</script>

<Story name="Basic" asChild>
  <Collapsible class="w-64">
    <CollapsibleTrigger>
      Recovery keys
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</Story>

<Story name="Default Open" asChild>
  <Collapsible defaultOpen class="w-64">
    <CollapsibleTrigger>
      Recovery keys
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</Story>

<Story name="Controlled" asChild>
  <Collapsible bind:open class="w-64">
    <CollapsibleTrigger>
      Recovery keys
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
    </CollapsibleContent>
    <div class="mt-2 text-xs text-muted-foreground">Current state: {open ? 'open' : 'closed'}</div>
  </Collapsible>
</Story>

<Story name="Disabled" asChild>
  <Collapsible disabled class="w-64">
    <CollapsibleTrigger>
      Recovery keys
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</Story>

<Story name="Lazy Mount" asChild>
  <Collapsible lazyMount unmountOnExit class="w-64">
    <CollapsibleTrigger>
      Recovery keys
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</Story>

<Story name="Partial Collapse" asChild>
  <Collapsible collapsedHeight="3rem" class="w-64">
    <CollapsibleTrigger>
      Recovery keys
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</Story>

<Story name="Partial Width" asChild>
  <Collapsible collapsedWidth="8rem" class="w-64" style="width: 18rem">
    <CollapsibleTrigger>
      Read details
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody>Additional account-recovery details stay partly visible.</CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</Story>

<Story name="Root Provider" asChild>
  <div class="flex flex-col gap-2">
    <output>Current state: {collapsible().open ? 'open' : 'closed'}</output>
    <CollapsibleRootProvider value={collapsible} class="w-64">
      <CollapsibleTrigger>
        Recovery keys
        <CollapsibleIndicator />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
      </CollapsibleContent>
    </CollapsibleRootProvider>
  </div>
</Story>

<Story name="Custom Composition" asChild>
  <Collapsible class="w-64 text-foreground">
    <CollapsibleTrigger>
      {#snippet asChild(props)}
        <button
          {...props({
            class:
              'flex w-full items-center justify-between gap-2 rounded-md bg-muted px-3 py-2 text-foreground [@media(hover:hover)]:hover:bg-accent',
          })}
          type="button"
        >
          <span class="min-w-0">Styled recovery keys</span>
          <CollapsibleIndicator class="text-primary">
            <ChevronDownIcon />
          </CollapsibleIndicator>
        </button>
      {/snippet}
    </CollapsibleTrigger>
    <CollapsibleContent class="text-muted-foreground">
      <CollapsibleBody class="mt-1 rounded-md bg-muted px-3 py-2"><RecoveryKeys /></CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</Story>
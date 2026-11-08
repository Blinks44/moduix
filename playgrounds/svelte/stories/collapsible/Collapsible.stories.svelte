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
  import styles from './Collapsible.stories.module.css';
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
  <Collapsible class={styles.root}>
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
  <Collapsible defaultOpen class={styles.root}>
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
  <Collapsible bind:open class={styles.root}>
    <CollapsibleTrigger>
      Recovery keys
      <CollapsibleIndicator />
    </CollapsibleTrigger>
    <CollapsibleContent>
      <CollapsibleBody><RecoveryKeys /></CollapsibleBody>
    </CollapsibleContent>
    <div class={styles.status}>Current state: {open ? 'open' : 'closed'}</div>
  </Collapsible>
</Story>

<Story name="Disabled" asChild>
  <Collapsible disabled class={styles.root}>
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
  <Collapsible lazyMount unmountOnExit class={styles.root}>
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
  <Collapsible collapsedHeight="3rem" class={styles.root}>
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
  <Collapsible collapsedWidth="8rem" class={styles.root} style="width: 18rem">
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
  <div class={styles.providerLayout}>
    <output>Current state: {collapsible().open ? 'open' : 'closed'}</output>
    <CollapsibleRootProvider value={collapsible} class={styles.root}>
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
  <Collapsible class={styles.customRoot}>
    <CollapsibleTrigger>
      {#snippet asChild(props)}
        <button {...props({ class: styles.customTrigger })} type="button">
          <span class={styles.triggerLabel}>Styled recovery keys</span>
          <CollapsibleIndicator class={styles.customIndicator}>
            <ChevronDownIcon />
          </CollapsibleIndicator>
        </button>
      {/snippet}
    </CollapsibleTrigger>
    <CollapsibleContent class={styles.customContent}>
      <CollapsibleBody class={styles.customContentBody}><RecoveryKeys /></CollapsibleBody>
    </CollapsibleContent>
  </Collapsible>
</Story>
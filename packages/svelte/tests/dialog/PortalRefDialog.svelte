<script lang="ts">
  import {
    DialogBackdrop,
    DialogContent,
    DialogContext,
    DialogPositioner,
    DialogRootProvider,
    DialogTitle,
    useDialog,
  } from '@/components/dialog';

  let { targetType }: { targetType: 'element' | 'getter' } = $props();

  const dialog = useDialog({ defaultOpen: true });
  let portalTarget: HTMLElement | undefined = $state();
  let contentRef: Element | null = $state(null);

  export const getContentRef = () => contentRef;
</script>

<div bind:this={portalTarget} data-testid="portal"></div>
{#if portalTarget}
  <DialogRootProvider
    value={dialog}
    portalRef={targetType === 'getter' ? () => portalTarget : portalTarget}
  >
    <DialogBackdrop />
    <DialogPositioner>
      <DialogContent bind:ref={contentRef}>
        <DialogTitle>Preferences</DialogTitle>
        <DialogContext>
          {#snippet render(context)}
            <output>Open: {context().open ? 'true' : 'false'}</output>
          {/snippet}
        </DialogContext>
      </DialogContent>
    </DialogPositioner>
  </DialogRootProvider>
{/if}
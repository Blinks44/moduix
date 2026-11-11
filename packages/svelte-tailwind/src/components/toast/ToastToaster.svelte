<script module lang="ts">
  import type { ToasterProps as ArkToasterProps, ToastOptions } from '@ark-ui/svelte/toast';
  import type { Snippet } from 'svelte';
  import type { PortalRef } from '@/lib/moduix/overlayPortal';

  export interface ToasterProps extends Omit<ArkToasterProps, 'children'> {
    children?: Snippet<[() => ToastOptions]>;
    portalRef?: PortalRef;
    portalled?: boolean;
  }
</script>

<script lang="ts">
  import { Portal } from '@ark-ui/svelte/portal';
  import { Toaster } from '@ark-ui/svelte/toast';
  import { cn } from '@/lib/moduix/cn';
  import Spinner from '../spinner/Spinner.svelte';
  import Toast from './Toast.svelte';
  import ToastActionTrigger from './ToastActionTrigger.svelte';
  import ToastCloseTrigger from './ToastCloseTrigger.svelte';
  import ToastDescription from './ToastDescription.svelte';
  import ToastTitle from './ToastTitle.svelte';
  import ToastValue from './ToastValue.svelte';

  let {
    children: renderToast,
    class: className,
    portalRef,
    portalled = true,
    ref = $bindable(null),
    ...props
  }: ToasterProps = $props();

  const container = $derived(
    (typeof portalRef === 'function' ? portalRef() : portalRef) ?? undefined,
  );
</script>

<Portal {container} disabled={!portalled}>
  <Toaster
    {...props}
    bind:ref
    class={cn(
      '[@media(max-width:40rem)]:w-[calc(100vw-env(safe-area-inset-left,0px)-env(safe-area-inset-right,0px)-var(--viewport-offset-left)-var(--viewport-offset-right))]',
      className,
    )}
    data-slot="toast-toaster"
  >
    {#snippet children(toast)}
      {@render toastContent(toast)}
    {/snippet}
  </Toaster>
</Portal>

{#snippet toastContent(toast: () => ToastOptions)}
  {#if renderToast}
    {@render renderToast(toast)}
  {:else}
    <Toast>
      {#if toast().title != null && toast().type === 'loading'}
        <ToastTitle>
          <Spinner decorative size="sm" />
          <ToastValue value={toast().title} />
        </ToastTitle>
      {:else if toast().title != null}
        <ToastTitle />
      {/if}
      {#if toast().description != null}<ToastDescription />{/if}
      {#if toast().action != null}
        <ToastActionTrigger>{toast().action?.label}</ToastActionTrigger>
      {/if}
      {#if toast().closable !== false}<ToastCloseTrigger />{/if}
    </Toast>
  {/if}
{/snippet}
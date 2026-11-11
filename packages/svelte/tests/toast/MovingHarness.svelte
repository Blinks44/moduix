<script lang="ts">
  import { ToastToaster, type CreateToasterReturn } from '@/components/toast';

  let {
    first,
    getter,
    second,
    toaster,
  }: { first: HTMLElement; getter: boolean; second: HTMLElement; toaster: CreateToasterReturn } =
    $props();
  let which = $state<'first' | 'second'>('first');
  let portalled = $state(true);
  const target = $derived(which === 'first' ? first : second);

  export const setTarget = (next: 'first' | 'second') => (which = next);
  export const setPortalled = (next: boolean) => (portalled = next);
</script>

<ToastToaster {toaster} {portalled} portalRef={getter ? () => target : target} />
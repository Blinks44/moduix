<script lang="ts">
  import { ToastToaster, type CreateToasterReturn } from '@/components/toast';
  import type { PortalRef } from '@/lib/moduix/overlayPortal';

  let {
    dir,
    portalRef,
    portalled,
    toaster,
  }: {
    dir?: 'ltr' | 'rtl';
    portalRef?: PortalRef;
    portalled?: boolean;
    toaster: CreateToasterReturn;
  } = $props();
</script>

<ToastToaster {toaster} {portalled} {portalRef} {dir} />
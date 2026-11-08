<script lang="ts">
  import {
    ToastRoot as ArkToastRoot,
    ToastTitle as ArkToastTitle,
    Toaster as ArkToaster,
    type CreateToasterReturn,
  } from '@ark-ui/svelte/toast';

  let { toaster }: { toaster: CreateToasterReturn } = $props();
</script>

<ArkToaster {toaster}>
  {#snippet children()}
    <ArkToastRoot>
      {#snippet asChild(props)}
        <article {...props()} data-testid="native-toast">
          <ArkToastTitle>Native root</ArkToastTitle>
        </article>
      {/snippet}
    </ArkToastRoot>
  {/snippet}
</ArkToaster>
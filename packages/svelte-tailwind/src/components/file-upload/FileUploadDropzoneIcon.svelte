<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';
  import { UploadIcon } from '@/lib/moduix/icons/ui';

  type Props = HTMLProps<'span'> & PolymorphicProps<'span'> & RefAttribute;

  let { children, class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="span"
  aria-hidden="true"
  {...props}
  bind:ref
  class={cn(
    'inline-flex size-10 items-center justify-center rounded-full border border-border bg-muted text-foreground [&>svg]:size-4',
    className,
  )}
  data-slot="file-upload-dropzone-icon"
>
  {#if children}
    {@render children()}
  {:else}
    <UploadIcon />
  {/if}
</Ark>
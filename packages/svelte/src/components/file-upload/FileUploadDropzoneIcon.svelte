<script lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';
  import { Ark } from '@ark-ui/svelte/factory';
  import { clsx } from 'clsx';
  import { UploadIcon } from '@/lib/moduix/icons/ui';
  import styles from './FileUpload.module.css';

  type Props = HTMLProps<'span'> & PolymorphicProps<'span'> & RefAttribute;

  let { children, class: className, ref = $bindable(null), ...props }: Props = $props();
</script>

<Ark
  as="span"
  aria-hidden="true"
  {...props}
  bind:ref
  class={clsx(styles.dropzoneIcon, className)}
  data-slot="file-upload-dropzone-icon"
>
  {#if children}
    {@render children()}
  {:else}
    <UploadIcon />
  {/if}
</Ark>
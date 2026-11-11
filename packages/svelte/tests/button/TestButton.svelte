<script lang="ts">
  import { Button, type ButtonRootProps } from '@/components/button';

  let {
    label,
    link = false,
    linkClick,
    ref = $bindable(null),
    ...props
  }: Omit<ButtonRootProps, 'asChild'> & {
    label: string;
    link?: boolean;
    linkClick?: () => void;
  } = $props();

  export const getRef = () => ref;
</script>

{#if link}
  <Button {...props} bind:ref>
    {#snippet asChild(hostProps)}
      <a {...hostProps({ onclick: linkClick })} href="#docs">{label}</a>
    {/snippet}
  </Button>
{:else}
  <Button {...props} bind:ref>{label}</Button>
{/if}
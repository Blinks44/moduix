<script lang="ts">
  import { BreadcrumbsLink } from '@/components/breadcrumbs';

  let linkRef: Element | null = $state(null);

  export const getRefs = () => ({ linkRef });
</script>

<BreadcrumbsLink bind:ref={linkRef}>
  {#snippet asChild(props)}
    <a {...props()} href="/docs">Docs</a>
  {/snippet}
</BreadcrumbsLink>
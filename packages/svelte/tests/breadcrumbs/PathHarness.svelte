<script lang="ts">
  import { Breadcrumbs, BreadcrumbsPath } from '@/components/breadcrumbs';

  let rootRef: Element | null = $state(null);
  let pathRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, pathRef });
</script>

<Breadcrumbs bind:ref={rootRef} data-probe="root">
  <BreadcrumbsPath
    bind:ref={pathRef}
    aria-label="Current path"
    links={[{ href: '/', label: 'Home' }]}
    page="Breadcrumbs"
  />
</Breadcrumbs>
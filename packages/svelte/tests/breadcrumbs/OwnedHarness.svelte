<script lang="ts">
  import {
    Breadcrumbs,
    BreadcrumbsEllipsis,
    BreadcrumbsItem,
    BreadcrumbsList,
    BreadcrumbsPage,
    BreadcrumbsSeparator,
  } from '@/components/breadcrumbs';

  let { onclick }: { onclick: (event: MouseEvent) => void } = $props();
</script>

<Breadcrumbs aria-label="Project breadcrumbs" {onclick}>
  <BreadcrumbsList>
    <BreadcrumbsItem>
      <BreadcrumbsPage aria-current="step">Current</BreadcrumbsPage>
    </BreadcrumbsItem>
    <BreadcrumbsSeparator aria-hidden="false" />
    <BreadcrumbsEllipsis aria-hidden="false">More</BreadcrumbsEllipsis>
  </BreadcrumbsList>
</Breadcrumbs>
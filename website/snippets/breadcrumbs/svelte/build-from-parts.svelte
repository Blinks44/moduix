<script lang="ts">
  import { ChevronRight as ChevronRightIcon } from '@lucide/svelte';
  import {
    Breadcrumbs,
    BreadcrumbsItem,
    BreadcrumbsLink,
    BreadcrumbsList,
    BreadcrumbsPage,
    BreadcrumbsSeparator,
  } from '@moduix/svelte/breadcrumbs';
  import styles from '@/components/examples/breadcrumbs/breadcrumbs-build-from-parts.module.css';
</script>

<Breadcrumbs>
  <BreadcrumbsList>
    <BreadcrumbsItem>
      <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
    </BreadcrumbsItem>
    <BreadcrumbsSeparator>
      <ChevronRightIcon class={styles.separatorIcon} strokeWidth={3} />
    </BreadcrumbsSeparator>
    <BreadcrumbsItem>
      <BreadcrumbsLink href="/docs/breadcrumbs">Breadcrumbs</BreadcrumbsLink>
    </BreadcrumbsItem>
    <BreadcrumbsSeparator>
      <ChevronRightIcon class={styles.separatorIcon} strokeWidth={3} />
    </BreadcrumbsSeparator>
    <BreadcrumbsItem>
      <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
    </BreadcrumbsItem>
  </BreadcrumbsList>
</Breadcrumbs>
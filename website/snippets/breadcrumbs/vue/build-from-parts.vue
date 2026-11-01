<script setup lang="ts">
import { ChevronRight as ChevronRightIcon } from '@lucide/vue';
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/vue/breadcrumbs';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-build-from-parts.module.css';
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbsList>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator>
        <ChevronRightIcon :class="styles.separatorIcon" :stroke-width="3" />
      </BreadcrumbsSeparator>
      <BreadcrumbsItem>
        <BreadcrumbsLink href="/docs/breadcrumbs">Breadcrumbs</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator>
        <ChevronRightIcon :class="styles.separatorIcon" :stroke-width="3" />
      </BreadcrumbsSeparator>
      <BreadcrumbsItem>
        <BreadcrumbsPage>Go Developer</BreadcrumbsPage>
      </BreadcrumbsItem>
    </BreadcrumbsList>
  </Breadcrumbs>
</template>
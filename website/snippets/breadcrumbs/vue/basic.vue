<script setup lang="ts">
import { Breadcrumbs, BreadcrumbsPath } from '@moduix/vue/breadcrumbs';

const links = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
];
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbsPath :links="links" page="Go Developer" />
  </Breadcrumbs>
</template>
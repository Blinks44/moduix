<script setup lang="ts">
import { Breadcrumbs, BreadcrumbsPath } from '@moduix/vue/breadcrumbs';
import { h } from 'vue';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-long-current-label.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
];
const currentPage =
  'Go lang developer to production team with cross-functional ownership and platform support';
const page = h('span', { title: currentPage }, currentPage);
</script>

<template>
  <Breadcrumbs :class="styles.root">
    <BreadcrumbsPath :links="links" :page="page" />
  </Breadcrumbs>
</template>
<script setup lang="ts">
import { Minus as SeparatorMarkIcon } from '@lucide/vue';
import { Breadcrumbs, BreadcrumbsPath } from '@moduix/vue/breadcrumbs';
import { h } from 'vue';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-custom-separator.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/docs/breadcrumbs', label: 'Breadcrumbs' },
];
const separator = h(SeparatorMarkIcon, { class: styles.separatorIcon });
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbsPath :links="links" page="Go Developer" :separator="separator" />
  </Breadcrumbs>
</template>
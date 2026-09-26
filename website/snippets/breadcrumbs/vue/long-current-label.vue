<script setup lang="ts">
import { Breadcrumbs, BreadcrumbsPath } from '@moduix/vue/breadcrumbs';
import { h } from 'vue';

const links = [
  { href: '/', label: 'Home' },
  { href: '/vacancies', label: 'Vacancies' },
];
const longCurrentLabel =
  'Go lang developer to production team with cross-functional ownership and platform support';
const page = h('span', { title: longCurrentLabel }, longCurrentLabel);
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbsPath :links="links" :page="page" />
  </Breadcrumbs>
</template>
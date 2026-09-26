<script setup lang="ts">
import { h } from 'vue';
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsPath,
  BreadcrumbsSeparator,
} from '../src/components/breadcrumbs';

const links = [
  { href: '/', label: h('strong', 'Home') },
  { href: '/docs', label: 'Docs' },
];
const page = h('span', { title: 'Current page' }, 'Breadcrumbs');
</script>

<template>
  <Breadcrumbs aria-label="Project breadcrumbs">
    <BreadcrumbsPath :links="links" :page="page" />
  </Breadcrumbs>

  <Breadcrumbs aria-label="Router breadcrumbs">
    <BreadcrumbsList>
      <BreadcrumbsItem>
        <BreadcrumbsLink as-child>
          <a href="/docs">Docs</a>
        </BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem><BreadcrumbsPage>Breadcrumbs</BreadcrumbsPage></BreadcrumbsItem>
    </BreadcrumbsList>
  </Breadcrumbs>
</template>
<script setup lang="ts">
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/vue/breadcrumbs';
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbsList>
      <BreadcrumbsItem>
        <BreadcrumbsLink as-child>
          <a href="/home" data-framework-link>Home</a>
        </BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem>
        <BreadcrumbsLink as-child>
          <a href="/vacancies" data-framework-link>Vacancies</a>
        </BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem><BreadcrumbsPage>Go Developer</BreadcrumbsPage></BreadcrumbsItem>
    </BreadcrumbsList>
  </Breadcrumbs>
</template>
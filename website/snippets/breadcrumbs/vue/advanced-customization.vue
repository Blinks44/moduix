<script setup lang="ts">
import {
  Breadcrumbs,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/vue/breadcrumbs';

const longCurrentLabel =
  'Go lang developer to production team with cross-functional ownership and platform support';
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbsList>
      <BreadcrumbsItem>
        <BreadcrumbsLink as-child><a href="/home" data-framework-link>Home</a></BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem>
        <BreadcrumbsLink as-child>
          <a href="/engineering" data-framework-link>Engineering</a>
        </BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator><span>·</span></BreadcrumbsSeparator>
      <BreadcrumbsItem>
        <BreadcrumbsPage>
          <span :title="longCurrentLabel">{{ longCurrentLabel }}</span>
        </BreadcrumbsPage>
      </BreadcrumbsItem>
    </BreadcrumbsList>
  </Breadcrumbs>
</template>
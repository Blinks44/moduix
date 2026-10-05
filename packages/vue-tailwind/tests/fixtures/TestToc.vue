<script setup lang="ts">
import { Toc, TocContent, TocNav, TocTitle, TocList, TocItem, TocLink, TocRail } from '../../src';

const items = [
  { value: 'introduction', depth: 2 },
  { value: 'configuration', depth: 3 },
];
</script>

<template>
  <Toc :items="items" :default-active-ids="['introduction']" aria-label="Table of contents">
    <TocContent><h2 id="introduction">Introduction</h2></TocContent>
    <TocNav>
      <TocTitle>On this page</TocTitle>
      <TocList>
        <TocItem v-for="item in items" :key="item.value" :item="item">
          <TocLink :href="'#' + item.value"
            ><TocRail :depth="item.depth" />{{ item.value }}</TocLink
          >
        </TocItem>
      </TocList>
    </TocNav>
  </Toc>
</template>
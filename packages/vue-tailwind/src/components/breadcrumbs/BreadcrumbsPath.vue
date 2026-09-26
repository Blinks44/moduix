<script setup lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { defineComponent, useAttrs } from 'vue';
import type { HTMLAttributes, VNodeChild } from 'vue';
import BreadcrumbsItem from './BreadcrumbsItem.vue';
import BreadcrumbsLink from './BreadcrumbsLink.vue';
import BreadcrumbsList from './BreadcrumbsList.vue';
import BreadcrumbsPage from './BreadcrumbsPage.vue';
import BreadcrumbsSeparator from './BreadcrumbsSeparator.vue';

defineOptions({ inheritAttrs: false });

type BreadcrumbsPathLink = {
  href: string;
  label: VNodeChild;
};

export interface Props extends /* @vue-ignore */ Omit<HTMLArkProps<'ol'>, 'asChild' | 'children'> {
  links: readonly BreadcrumbsPathLink[];
  page: VNodeChild;
  separator?: VNodeChild;
  class?: HTMLAttributes['class'];
}

const { class: className, links, page, separator = undefined } = defineProps<Props>();

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});

const attrs = useAttrs();
</script>

<template>
  <BreadcrumbsList v-bind="attrs" :class="className">
    <template v-for="(link, index) in links" :key="index">
      <BreadcrumbsItem>
        <BreadcrumbsLink :href="link.href">
          <VNodeOutlet :value="link.label" />
        </BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator v-if="separator == null" />
      <BreadcrumbsSeparator v-else>
        <VNodeOutlet :value="separator" />
      </BreadcrumbsSeparator>
    </template>
    <BreadcrumbsItem>
      <BreadcrumbsPage><VNodeOutlet :value="page" /></BreadcrumbsPage>
    </BreadcrumbsItem>
  </BreadcrumbsList>
</template>
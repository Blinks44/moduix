<script lang="ts">
import type { HTMLArkProps } from '@ark-ui/vue/factory';
import { defineComponent } from 'vue';
import type { HTMLAttributes, VNodeChild } from 'vue';

export type BreadcrumbsPathLink = {
  href: string;
  label: VNodeChild;
};

export interface Props extends /* @vue-ignore */ Omit<HTMLArkProps<'ol'>, 'asChild' | 'children'> {
  links: readonly BreadcrumbsPathLink[];
  page: VNodeChild;
  separator?: VNodeChild;
  class?: HTMLAttributes['class'];
}

const VNodeOutlet = defineComponent((props: { value: VNodeChild }) => () => props.value, {
  props: ['value'],
});
</script>

<script setup lang="ts">
import { useAttrs } from 'vue';
import BreadcrumbsItem from './BreadcrumbsItem.vue';
import BreadcrumbsLink from './BreadcrumbsLink.vue';
import BreadcrumbsList from './BreadcrumbsList.vue';
import BreadcrumbsPage from './BreadcrumbsPage.vue';
import BreadcrumbsSeparator from './BreadcrumbsSeparator.vue';

defineOptions({ inheritAttrs: false });

const { class: className, links, page, separator = undefined } = defineProps<Props>();

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
      <BreadcrumbsSeparator>
        <template v-if="separator != null" #default>
          <VNodeOutlet :value="separator" />
        </template>
      </BreadcrumbsSeparator>
    </template>
    <BreadcrumbsItem>
      <BreadcrumbsPage><VNodeOutlet :value="page" /></BreadcrumbsPage>
    </BreadcrumbsItem>
  </BreadcrumbsList>
</template>
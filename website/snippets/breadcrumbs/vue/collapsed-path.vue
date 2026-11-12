<script setup lang="ts">
import {
  Breadcrumbs,
  BreadcrumbsEllipsis,
  BreadcrumbsItem,
  BreadcrumbsLink,
  BreadcrumbsList,
  BreadcrumbsPage,
  BreadcrumbsSeparator,
} from '@moduix/vue/breadcrumbs';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import styles from '@/components/examples/breadcrumbs/breadcrumbs-collapsed-path.module.css';

const collapsedItems = [
  { href: '/docs', label: 'Docs' },
  { href: '/docs/quick-start', label: 'Quick Start' },
  { href: '/docs/composition-patterns', label: 'Composition Patterns' },
];
</script>

<template>
  <Breadcrumbs>
    <BreadcrumbsList>
      <BreadcrumbsItem><BreadcrumbsLink href="/">Home</BreadcrumbsLink></BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem>
        <Menu :positioning="{ placement: 'bottom-start' }">
          <MenuTrigger as-child>
            <button type="button" aria-label="Show hidden path items">
              <BreadcrumbsEllipsis />
            </button>
          </MenuTrigger>
          <MenuPositioner>
            <MenuContent :class="styles.content">
              <MenuViewport>
                <MenuItem
                  v-for="item in collapsedItems"
                  :key="item.href"
                  :value="item.href"
                  as-child
                >
                  <a :href="item.href">{{ item.label }}</a>
                </MenuItem>
              </MenuViewport>
            </MenuContent>
          </MenuPositioner>
        </Menu>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem>
        <BreadcrumbsLink href="/docs/breadcrumbs">Breadcrumbs</BreadcrumbsLink>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem><BreadcrumbsPage>Go Developer</BreadcrumbsPage></BreadcrumbsItem>
    </BreadcrumbsList>
  </Breadcrumbs>
</template>
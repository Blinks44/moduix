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
            <MenuContent>
              <MenuViewport>
                <MenuItem value="engineering" as-child
                  ><a href="/engineering">Engineering</a></MenuItem
                >
                <MenuItem value="backend" as-child
                  ><a href="/engineering/backend">Backend</a></MenuItem
                >
                <MenuItem value="golang" as-child
                  ><a href="/engineering/backend/golang">Golang</a></MenuItem
                >
              </MenuViewport>
            </MenuContent>
          </MenuPositioner>
        </Menu>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem
        ><BreadcrumbsLink href="/vacancies">Vacancies</BreadcrumbsLink></BreadcrumbsItem
      >
      <BreadcrumbsSeparator />
      <BreadcrumbsItem><BreadcrumbsPage>Go Developer</BreadcrumbsPage></BreadcrumbsItem>
    </BreadcrumbsList>
  </Breadcrumbs>
</template>
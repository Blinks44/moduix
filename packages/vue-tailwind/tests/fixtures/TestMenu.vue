<script setup lang="ts">
import { Menu, MenuContent, MenuItem, MenuPositioner, MenuTrigger, MenuViewport } from '../../src';
</script>

<template>
  <Menu default-open :portalled="false">
    <MenuTrigger>Actions</MenuTrigger>
    <MenuPositioner>
      <MenuContent
        ><MenuViewport><MenuItem value="edit">Edit</MenuItem></MenuViewport></MenuContent
      >
    </MenuPositioner>
  </Menu>
</template>
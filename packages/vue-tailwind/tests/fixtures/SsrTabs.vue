<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger, TabsIndicator, TabsContent } from '../../src/components/tabs';
</script>

<template>
  <Tabs default-value="overview"
    ><TabsList
      ><TabsTrigger value="overview">Overview</TabsTrigger
      ><TabsTrigger value="projects">Projects</TabsTrigger><TabsIndicator /></TabsList
    ><TabsContent value="overview">Overview content</TabsContent
    ><TabsContent value="projects">Projects content</TabsContent></Tabs
  >
</template>
<script setup lang="ts">
import { ClientOnly } from '@ark-ui/vue/client-only';
import { Button } from '@moduix/vue/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/vue/card';
import { Skeleton } from '@moduix/vue/skeleton';
import { Stack } from '@moduix/vue/stack';
import { ref, onMounted } from 'vue';

const refreshedAt = ref<Date>();
const locale = 'en-GB';
const timeZone = 'Europe/London';
function refresh() {
  refreshedAt.value = new Date();
}
onMounted(refresh);
</script>
<template>
  <ClientOnly>
    <Card>
      <CardHeader>
        <CardTitle>Browser details</CardTitle>
        <CardDescription
          >The current time is read and formatted after the component reaches the
          browser.</CardDescription
        >
      </CardHeader>
      <CardBody>
        <Stack :gap="4">
          <span>Language: {{ locale }}</span>
          <span>Time zone: {{ timeZone }}</span>
          <span>Read at: {{ refreshedAt?.toLocaleTimeString(locale, { timeZone }) }}</span>
        </Stack>
      </CardBody>
      <CardFooter
        ><Button type="button" variant="outline" @click="refresh">Refresh</Button></CardFooter
      >
    </Card>
    <template #fallback>
      <Card aria-busy="true">
        <CardHeader
          ><Skeleton height="1.25rem" width="9rem" /><Skeleton height="1rem" width="100%"
        /></CardHeader>
        <CardBody
          ><Stack :gap="4"
            ><Skeleton height="1rem" width="75%" /><Skeleton height="1rem" width="60%" /><Skeleton
              height="1rem"
              width="50%" /></Stack
        ></CardBody>
        <CardFooter><Skeleton height="2.25rem" width="5rem" /></CardFooter>
      </Card>
    </template>
  </ClientOnly>
</template>
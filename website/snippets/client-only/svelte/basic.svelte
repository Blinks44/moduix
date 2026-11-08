<script lang="ts">
  import { ClientOnly } from '@ark-ui/svelte/client-only';
  import { Button } from '@moduix/svelte/button';
  import {
    Card,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@moduix/svelte/card';
  import { Skeleton } from '@moduix/svelte/skeleton';
  import { Stack } from '@moduix/svelte/stack';
  import { onMount } from 'svelte';

  let refreshedAt = $state<Date>();
  const locale = 'en-GB';
  const timeZone = 'Europe/London';
  function refresh() {
    refreshedAt = new Date();
  }
  onMount(refresh);
</script>

<ClientOnly>
  <Card>
    <CardHeader>
      <CardTitle>Browser details</CardTitle>
      <CardDescription>
        The current time is read and formatted after the component reaches the browser.
      </CardDescription>
    </CardHeader>
    <CardBody>
      <Stack gap={4}>
        <span>Language: {locale}</span>
        <span>Time zone: {timeZone}</span>
        <span>Read at: {refreshedAt?.toLocaleTimeString(locale, { timeZone })}</span>
      </Stack>
    </CardBody>
    <CardFooter>
      <Button type="button" variant="outline" onclick={refresh}>Refresh</Button>
    </CardFooter>
  </Card>
  {#snippet fallback()}
    <Card aria-busy="true">
      <CardHeader>
        <Skeleton height="1.25rem" width="9rem" />
        <Skeleton height="1rem" width="100%" />
      </CardHeader>
      <CardBody>
        <Stack gap={4}>
          <Skeleton height="1rem" width="75%" />
          <Skeleton height="1rem" width="60%" />
          <Skeleton height="1rem" width="50%" />
        </Stack>
      </CardBody>
      <CardFooter><Skeleton height="2.25rem" width="5rem" /></CardFooter>
    </Card>
  {/snippet}
</ClientOnly>
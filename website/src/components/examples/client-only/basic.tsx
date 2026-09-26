import { ClientOnly } from '@ark-ui/react/client-only';
import { Button } from '@moduix/react/button';
import {
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@moduix/react/card';
import { Skeleton } from '@moduix/react/skeleton';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

function BrowserDetails() {
  const [refreshedAt, setRefreshedAt] = useState(() => new Date());
  const locale = 'en-GB';
  const timeZone = 'Europe/London';

  return (
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
          <span>Read at: {refreshedAt.toLocaleTimeString(locale, { timeZone })}</span>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button type="button" variant="outline" onClick={() => setRefreshedAt(new Date())}>
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
}

function BrowserDetailsFallback() {
  return (
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
      <CardFooter>
        <Skeleton height="2.25rem" width="5rem" />
      </CardFooter>
    </Card>
  );
}

export default function ClientOnlyDemo() {
  return (
    <ClientOnly fallback={<BrowserDetailsFallback />}>
      <BrowserDetails />
    </ClientOnly>
  );
}
import { ClientOnly } from '@ark-ui/react/client-only';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Skeleton } from '@moduix/react/skeleton';
import { Stack } from '@moduix/react/stack';
import { useState } from 'react';

function BrowserDetails() {
  const [refreshedAt, setRefreshedAt] = useState(() => new Date());
  const locale = navigator.language;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <Card>
      <Card.Header>
        <Card.Title>Browser details</Card.Title>
        <Card.Description>
          These values are read only after the component reaches the browser.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={4}>
          <span>Language: {locale}</span>
          <span>Time zone: {timeZone}</span>
          <span>Read at: {refreshedAt.toLocaleTimeString(locale)}</span>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Button type="button" variant="outline" onClick={() => setRefreshedAt(new Date())}>
          Refresh
        </Button>
      </Card.Footer>
    </Card>
  );
}

function BrowserDetailsFallback() {
  return (
    <Card aria-busy="true">
      <Card.Header>
        <Skeleton height="1.25rem" width="9rem" />
        <Skeleton height="1rem" width="100%" />
      </Card.Header>
      <Card.Body>
        <Stack gap={4}>
          <Skeleton height="1rem" width="75%" />
          <Skeleton height="1rem" width="60%" />
          <Skeleton height="1rem" width="50%" />
        </Stack>
      </Card.Body>
      <Card.Footer>
        <Skeleton height="2.25rem" width="5rem" />
      </Card.Footer>
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
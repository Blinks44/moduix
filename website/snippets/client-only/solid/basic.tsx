import { ClientOnly } from '@ark-ui/solid/client-only';
import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import { Skeleton } from '@moduix/solid/skeleton';
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

function BrowserDetails() {
  const [refreshedAt, setRefreshedAt] = createSignal(new Date());
  const locale = 'en-GB';
  const timeZone = 'Europe/London';

  return (
    <Card>
      <Card.Header>
        <Card.Title>Browser details</Card.Title>
        <Card.Description>
          The current time is read and formatted after the component reaches the browser.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={4}>
          <span>Language: {locale}</span>
          <span>Time zone: {timeZone}</span>
          <span>Read at: {refreshedAt().toLocaleTimeString(locale, { timeZone })}</span>
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
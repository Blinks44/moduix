<script lang="ts">
  import { Button } from '@moduix/svelte/button';
  import {
    Card,
    CardBody,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from '@moduix/svelte/card';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/card/card-with-avatar.module.css';

  const person = {
    initials: 'NF',
    name: 'Nate Foss',
    handle: '@natefoss',
    message: 'Nate has requested to join your team.',
  };
</script>

<Card class={styles.root}>
  <CardHeader>
    <Stack direction="row" align="center" gap="3">
      <span aria-hidden="true" class={styles.avatar}>{person.initials}</span>
      <div>
        <CardTitle>{person.name}</CardTitle>
        <CardDescription>{person.handle}</CardDescription>
      </div>
    </Stack>
  </CardHeader>
  <CardBody>{person.message}</CardBody>
  <CardFooter>
    <Button variant="outline">Decline</Button>
    <Button>Approve</Button>
  </CardFooter>
</Card>
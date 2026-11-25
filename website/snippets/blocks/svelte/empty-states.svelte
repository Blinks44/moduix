<script lang="ts">
  import Inbox from '@lucide/svelte/icons/inbox';
  import Lock from '@lucide/svelte/icons/lock';
  import Search from '@lucide/svelte/icons/search';
  import { Button } from '@/components/ui/button';
  import { Card, CardBody } from '@/components/ui/card';
  import {
    Empty,
    EmptyActions,
    EmptyContent,
    EmptyDescription,
    EmptyIcon,
    EmptyTitle,
  } from '@/components/ui/empty';
  import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/components/ui/tabs';
  import styles from './empty-states.module.css';

  let lastAction = $state('');
</script>

<section class={styles.root} aria-label="Empty state patterns">
  <Tabs defaultValue="search">
    <TabsList>
      <TabsTrigger value="search">No results</TabsTrigger>
      <TabsTrigger value="inbox">Empty inbox</TabsTrigger>
      <TabsTrigger value="access">Restricted</TabsTrigger>
      <TabsIndicator />
    </TabsList>

    <TabsContent value="search" class={styles.panel}>
      <Card>
        <CardBody class={styles.cardBody}>
          <Empty>
            <EmptyIcon class={styles.icon}>
              <Search aria-hidden="true" />
            </EmptyIcon>
            <EmptyContent>
              <EmptyTitle>No matching projects</EmptyTitle>
              <EmptyDescription>
                No projects matched “billing-v3”. Clear filters or start a new project.
              </EmptyDescription>
            </EmptyContent>
            <EmptyActions>
              <Button variant="outline" onclick={() => (lastAction = 'Filters cleared.')}>
                Clear filters
              </Button>
              <Button onclick={() => (lastAction = 'Opened new project flow.')}>New project</Button>
            </EmptyActions>
          </Empty>
        </CardBody>
      </Card>
    </TabsContent>

    <TabsContent value="inbox" class={styles.panel}>
      <Card>
        <CardBody class={styles.cardBody}>
          <Empty>
            <EmptyIcon class={styles.icon}>
              <Inbox aria-hidden="true" />
            </EmptyIcon>
            <EmptyContent>
              <EmptyTitle>All caught up</EmptyTitle>
              <EmptyDescription>
                You have no unread mentions, review requests, or deployment alerts.
              </EmptyDescription>
            </EmptyContent>
            <EmptyActions>
              <Button variant="outline" onclick={() => (lastAction = 'Opened archive.')}>
                View archive
              </Button>
            </EmptyActions>
          </Empty>
        </CardBody>
      </Card>
    </TabsContent>

    <TabsContent value="access" class={styles.panel}>
      <Card>
        <CardBody class={styles.cardBody}>
          <Empty>
            <EmptyIcon class={styles.icon}>
              <Lock aria-hidden="true" />
            </EmptyIcon>
            <EmptyContent>
              <EmptyTitle>Permission required</EmptyTitle>
              <EmptyDescription>
                Billing exports are limited to workspace owners and finance admins.
              </EmptyDescription>
            </EmptyContent>
            <EmptyActions>
              <Button onclick={() => (lastAction = 'Access request sent to workspace admins.')}>
                Request access
              </Button>
            </EmptyActions>
          </Empty>
        </CardBody>
      </Card>
    </TabsContent>
  </Tabs>

  {#if lastAction}
    <p class={styles.status} role="status">{lastAction}</p>
  {/if}
</section>
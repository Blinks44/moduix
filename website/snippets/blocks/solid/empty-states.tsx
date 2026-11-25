import { Inbox, Lock, Search } from 'lucide-solid';
import { Show, createSignal } from 'solid-js';
import { Button } from '@/registry/solid/ui/button';
import { Card, CardBody } from '@/registry/solid/ui/card';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from '@/registry/solid/ui/empty';
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/registry/solid/ui/tabs';
import styles from './empty-states.module.css';

export function EmptyStates() {
  const [lastAction, setLastAction] = createSignal('');

  return (
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
                  <Button variant="outline" onClick={() => setLastAction('Filters cleared.')}>
                    Clear filters
                  </Button>
                  <Button onClick={() => setLastAction('Opened new project flow.')}>
                    New project
                  </Button>
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
                  <Button variant="outline" onClick={() => setLastAction('Opened archive.')}>
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
                  <Button onClick={() => setLastAction('Access request sent to workspace admins.')}>
                    Request access
                  </Button>
                </EmptyActions>
              </Empty>
            </CardBody>
          </Card>
        </TabsContent>
      </Tabs>

      <Show when={lastAction()}>
        <p class={styles.status} role="status">
          {lastAction()}
        </p>
      </Show>
    </section>
  );
}

export default EmptyStates;
'use client';

import { Inbox, Lock, Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/registry/react/ui/button';
import { Card, CardBody } from '@/registry/react/ui/card';
import {
  Empty,
  EmptyActions,
  EmptyContent,
  EmptyDescription,
  EmptyIcon,
  EmptyTitle,
} from '@/registry/react/ui/empty';
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/registry/react/ui/tabs';
import styles from './empty-states.module.css';

export function EmptyStates() {
  const [lastAction, setLastAction] = useState('');

  return (
    <section className={styles.root} aria-label="Empty state patterns">
      <Tabs defaultValue="search">
        <TabsList>
          <TabsTrigger value="search">No results</TabsTrigger>
          <TabsTrigger value="inbox">Empty inbox</TabsTrigger>
          <TabsTrigger value="access">Restricted</TabsTrigger>
          <TabsIndicator />
        </TabsList>

        <TabsContent value="search" className={styles.panel}>
          <Card>
            <CardBody className={styles.cardBody}>
              <Empty>
                <EmptyIcon className={styles.icon}>
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

        <TabsContent value="inbox" className={styles.panel}>
          <Card>
            <CardBody className={styles.cardBody}>
              <Empty>
                <EmptyIcon className={styles.icon}>
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

        <TabsContent value="access" className={styles.panel}>
          <Card>
            <CardBody className={styles.cardBody}>
              <Empty>
                <EmptyIcon className={styles.icon}>
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

      {lastAction ? (
        <p className={styles.status} role="status">
          {lastAction}
        </p>
      ) : null}
    </section>
  );
}

export default EmptyStates;
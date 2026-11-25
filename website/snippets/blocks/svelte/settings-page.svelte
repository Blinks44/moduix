<script lang="ts">
  import { Badge } from '@/components/ui/badge';
  import { Button } from '@/components/ui/button';
  import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
  import {
    Dialog,
    DialogBody,
    DialogCloseTrigger,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogPanel,
    DialogTitle,
    DialogTrigger,
  } from '@/components/ui/dialog';
  import { Field, FieldLabel } from '@/components/ui/field';
  import { Input } from '@/components/ui/input';
  import { Switch, SwitchControl, SwitchHiddenInput, SwitchThumb } from '@/components/ui/switch';
  import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/components/ui/tabs';
  import styles from './settings-page.module.css';

  let name = $state('Maya Patel');
  let email = $state('maya@acme.dev');
  let workspace = $state('Acme Product');
  let savedMessage = $state('');
  let releaseEmails = $state(true);
  let securityAlerts = $state(true);
  let weeklyDigest = $state(false);

  function handleSave(event: SubmitEvent) {
    event.preventDefault();
    savedMessage = `Saved profile for ${name}.`;
  }
</script>

<section class={styles.root} aria-label="Account settings">
  <header class={styles.header}>
    <div>
      <h2 class={styles.title}>Workspace settings</h2>
      <p class={styles.subtitle}>Manage your profile, alerts, and workspace access.</p>
    </div>
    <Badge variant="secondary">Pro plan</Badge>
  </header>

  <Tabs defaultValue="profile">
    <TabsList>
      <TabsTrigger value="profile">Profile</TabsTrigger>
      <TabsTrigger value="notifications">Notifications</TabsTrigger>
      <TabsTrigger value="security">Security</TabsTrigger>
      <TabsIndicator />
    </TabsList>

    <TabsContent value="profile" class={styles.panel}>
      <Card>
        <CardHeader>
          <CardTitle>Public profile</CardTitle>
          <CardDescription>Displayed on commits, reviews, and audit entries.</CardDescription>
        </CardHeader>
        <CardBody>
          <form class={styles.formGrid} onsubmit={handleSave}>
            <Field required>
              <FieldLabel>Full name</FieldLabel>
              <Input bind:value={name} />
            </Field>
            <Field required>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" bind:value={email} />
            </Field>
            <Field class={styles.full}>
              <FieldLabel>Workspace name</FieldLabel>
              <Input bind:value={workspace} />
            </Field>
            <div class={`${styles.full} ${styles.actions}`}>
              <p class={styles.status} role="status">
                {savedMessage || 'Changes apply across all team views.'}
              </p>
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </TabsContent>

    <TabsContent value="notifications" class={styles.panel}>
      <Card>
        <CardHeader>
          <CardTitle>Notification preferences</CardTitle>
          <CardDescription>Choose which events send email or in-app alerts.</CardDescription>
        </CardHeader>
        <CardBody class={styles.toggleList}>
          <div class={styles.toggleRow}>
            <div>
              <span class={styles.toggleTitle}>Release notes</span>
              <p class={styles.toggleHint}>Monthly updates on new components and fixes.</p>
            </div>
            <Switch bind:checked={releaseEmails}>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchHiddenInput aria-label="Release notes" />
            </Switch>
          </div>
          <div class={styles.toggleRow}>
            <div>
              <span class={styles.toggleTitle}>Security alerts</span>
              <p class={styles.toggleHint}>Sign-ins from new browsers or API key changes.</p>
            </div>
            <Switch bind:checked={securityAlerts}>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchHiddenInput aria-label="Security alerts" />
            </Switch>
          </div>
          <div class={styles.toggleRow}>
            <div>
              <span class={styles.toggleTitle}>Weekly digest</span>
              <p class={styles.toggleHint}>Summary of activity every Monday at 09:00 UTC.</p>
            </div>
            <Switch bind:checked={weeklyDigest}>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchHiddenInput aria-label="Weekly digest" />
            </Switch>
          </div>
        </CardBody>
      </Card>
    </TabsContent>

    <TabsContent value="security" class={styles.panel}>
      <Card>
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <CardDescription>Permanent actions that cannot be undone.</CardDescription>
        </CardHeader>
        <CardBody class={styles.dangerRow}>
          <div>
            <span class={styles.toggleTitle}>Delete workspace</span>
            <p class={styles.toggleHint}>
              Remove {workspace} and revoke all active API tokens.
            </p>
          </div>
          <Dialog>
            <DialogTrigger>
              {#snippet asChild(props)}
                <Button {...props()} variant="destructive">Delete workspace</Button>
              {/snippet}
            </DialogTrigger>
            <DialogPanel size="sm">
              <DialogHeader>
                <DialogTitle>Delete {workspace}?</DialogTitle>
                <DialogDescription>
                  This permanently removes all projects, tokens, and billing history.
                </DialogDescription>
              </DialogHeader>
              <DialogBody>
                <p class={styles.toggleHint}>
                  Team members will immediately lose access to this workspace.
                </p>
              </DialogBody>
              <DialogFooter>
                <DialogCloseTrigger>
                  {#snippet asChild(props)}
                    <Button {...props()} variant="outline">Cancel</Button>
                  {/snippet}
                </DialogCloseTrigger>
                <DialogCloseTrigger>
                  {#snippet asChild(props)}
                    <Button {...props()} variant="destructive">Confirm delete</Button>
                  {/snippet}
                </DialogCloseTrigger>
              </DialogFooter>
            </DialogPanel>
          </Dialog>
        </CardBody>
      </Card>
    </TabsContent>
  </Tabs>
</section>
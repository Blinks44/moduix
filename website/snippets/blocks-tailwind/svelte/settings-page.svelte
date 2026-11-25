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

<section class="grid w-[min(100%,46rem)] gap-6" aria-label="Account settings">
  <header class="flex flex-wrap items-center justify-between gap-3">
    <div>
      <h2 class="m-0 text-xl leading-tight font-semibold">Workspace settings</h2>
      <p class="mt-1 mb-0 text-sm text-muted-foreground">
        Manage your profile, alerts, and workspace access.
      </p>
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

    <TabsContent value="profile" class="grid gap-5 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Public profile</CardTitle>
          <CardDescription>Displayed on commits, reviews, and audit entries.</CardDescription>
        </CardHeader>
        <CardBody>
          <form class="grid gap-4 sm:grid-cols-2" onsubmit={handleSave}>
            <Field required>
              <FieldLabel>Full name</FieldLabel>
              <Input bind:value={name} />
            </Field>
            <Field required>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" bind:value={email} />
            </Field>
            <Field class="sm:col-span-2">
              <FieldLabel>Workspace name</FieldLabel>
              <Input bind:value={workspace} />
            </Field>
            <div class="flex flex-wrap items-center justify-between gap-3 pt-2 sm:col-span-2">
              <p class="m-0 text-[13px] text-muted-foreground" role="status">
                {savedMessage || 'Changes apply across all team views.'}
              </p>
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </TabsContent>

    <TabsContent value="notifications" class="grid gap-5 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Notification preferences</CardTitle>
          <CardDescription>Choose which events send email or in-app alerts.</CardDescription>
        </CardHeader>
        <CardBody class="grid gap-4">
          <div class="flex items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <span class="block text-sm font-medium">Release notes</span>
              <p class="mt-0.5 mb-0 text-[13px] text-muted-foreground">
                Monthly updates on new components and fixes.
              </p>
            </div>
            <Switch bind:checked={releaseEmails}>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchHiddenInput />
            </Switch>
          </div>
          <div class="flex items-center justify-between gap-4 border-b border-border pb-4">
            <div>
              <span class="block text-sm font-medium">Security alerts</span>
              <p class="mt-0.5 mb-0 text-[13px] text-muted-foreground">
                Sign-ins from new browsers or API key changes.
              </p>
            </div>
            <Switch bind:checked={securityAlerts}>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchHiddenInput />
            </Switch>
          </div>
          <div class="flex items-center justify-between gap-4">
            <div>
              <span class="block text-sm font-medium">Weekly digest</span>
              <p class="mt-0.5 mb-0 text-[13px] text-muted-foreground">
                Summary of activity every Monday at 09:00 UTC.
              </p>
            </div>
            <Switch bind:checked={weeklyDigest}>
              <SwitchControl>
                <SwitchThumb />
              </SwitchControl>
              <SwitchHiddenInput />
            </Switch>
          </div>
        </CardBody>
      </Card>
    </TabsContent>

    <TabsContent value="security" class="grid gap-5 pt-4">
      <Card>
        <CardHeader>
          <CardTitle>Danger zone</CardTitle>
          <CardDescription>Permanent actions that cannot be undone.</CardDescription>
        </CardHeader>
        <CardBody class="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span class="block text-sm font-medium">Delete workspace</span>
            <p class="mt-0.5 mb-0 text-[13px] text-muted-foreground">
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
                <p class="m-0 text-[13px] text-muted-foreground">
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
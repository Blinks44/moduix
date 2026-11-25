'use client';

import { useState, type FormEvent } from 'react';
import { Badge } from '@/registry/react/ui/badge';
import { Button } from '@/registry/react/ui/button';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@/registry/react/ui/card';
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
} from '@/registry/react/ui/dialog';
import { Field, FieldLabel } from '@/registry/react/ui/field';
import { Input } from '@/registry/react/ui/input';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchThumb } from '@/registry/react/ui/switch';
import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/registry/react/ui/tabs';

export function SettingsPage() {
  const [name, setName] = useState('Maya Patel');
  const [email, setEmail] = useState('maya@acme.dev');
  const [workspace, setWorkspace] = useState('Acme Product');
  const [savedMessage, setSavedMessage] = useState('');
  const [releaseEmails, setReleaseEmails] = useState(true);
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavedMessage(`Saved profile for ${name}.`);
  };

  return (
    <section className="grid w-[min(100%,46rem)] gap-6" aria-label="Account settings">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="m-0 text-xl leading-tight font-semibold">Workspace settings</h2>
          <p className="mt-1 mb-0 text-sm text-muted-foreground">
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

        <TabsContent value="profile" className="grid gap-5 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Public profile</CardTitle>
              <CardDescription>Displayed on commits, reviews, and audit entries.</CardDescription>
            </CardHeader>
            <CardBody>
              <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleSave}>
                <Field required>
                  <FieldLabel>Full name</FieldLabel>
                  <Input value={name} onChange={(event) => setName(event.target.value)} />
                </Field>
                <Field required>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </Field>
                <Field className="sm:col-span-2">
                  <FieldLabel>Workspace name</FieldLabel>
                  <Input value={workspace} onChange={(event) => setWorkspace(event.target.value)} />
                </Field>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2 sm:col-span-2">
                  <p className="m-0 text-[13px] text-muted-foreground" role="status">
                    {savedMessage || 'Changes apply across all team views.'}
                  </p>
                  <Button type="submit">Save changes</Button>
                </div>
              </form>
            </CardBody>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="grid gap-5 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification preferences</CardTitle>
              <CardDescription>Choose which events send email or in-app alerts.</CardDescription>
            </CardHeader>
            <CardBody className="grid gap-4">
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <span className="block text-sm font-medium">Release notes</span>
                  <p className="mt-0.5 mb-0 text-[13px] text-muted-foreground">
                    Monthly updates on new components and fixes.
                  </p>
                </div>
                <Switch
                  checked={releaseEmails}
                  onCheckedChange={(details) => setReleaseEmails(details.checked)}
                >
                  <SwitchControl>
                    <SwitchThumb />
                  </SwitchControl>
                  <SwitchHiddenInput aria-label="Release notes" />
                </Switch>
              </div>
              <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
                <div>
                  <span className="block text-sm font-medium">Security alerts</span>
                  <p className="mt-0.5 mb-0 text-[13px] text-muted-foreground">
                    Sign-ins from new browsers or API key changes.
                  </p>
                </div>
                <Switch
                  checked={securityAlerts}
                  onCheckedChange={(details) => setSecurityAlerts(details.checked)}
                >
                  <SwitchControl>
                    <SwitchThumb />
                  </SwitchControl>
                  <SwitchHiddenInput aria-label="Security alerts" />
                </Switch>
              </div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="block text-sm font-medium">Weekly digest</span>
                  <p className="mt-0.5 mb-0 text-[13px] text-muted-foreground">
                    Summary of activity every Monday at 09:00 UTC.
                  </p>
                </div>
                <Switch
                  checked={weeklyDigest}
                  onCheckedChange={(details) => setWeeklyDigest(details.checked)}
                >
                  <SwitchControl>
                    <SwitchThumb />
                  </SwitchControl>
                  <SwitchHiddenInput aria-label="Weekly digest" />
                </Switch>
              </div>
            </CardBody>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="grid gap-5 pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Danger zone</CardTitle>
              <CardDescription>Permanent actions that cannot be undone.</CardDescription>
            </CardHeader>
            <CardBody className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="block text-sm font-medium">Delete workspace</span>
                <p className="mt-0.5 mb-0 text-[13px] text-muted-foreground">
                  Remove {workspace} and revoke all active API tokens.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Delete workspace</Button>
                </DialogTrigger>
                <DialogPanel size="sm">
                  <DialogHeader>
                    <DialogTitle>Delete {workspace}?</DialogTitle>
                    <DialogDescription>
                      This permanently removes all projects, tokens, and billing history.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogBody>
                    <p className="m-0 text-[13px] text-muted-foreground">
                      Team members will immediately lose access to this workspace.
                    </p>
                  </DialogBody>
                  <DialogFooter>
                    <DialogCloseTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogCloseTrigger>
                    <DialogCloseTrigger asChild>
                      <Button variant="destructive">Confirm delete</Button>
                    </DialogCloseTrigger>
                  </DialogFooter>
                </DialogPanel>
              </Dialog>
            </CardBody>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}

export default SettingsPage;
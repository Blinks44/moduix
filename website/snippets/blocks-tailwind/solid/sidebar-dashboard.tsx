import { ChevronsUpDown, FileText, FolderOpen, Gauge, Settings, Users } from 'lucide-solid';
import { Button } from '@/registry/solid/ui/button';
import { Card, CardBody } from '@/registry/solid/ui/card';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleIndicator,
  CollapsibleContent,
} from '@/registry/solid/ui/collapsible';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuItemText,
} from '@/registry/solid/ui/menu';
import {
  Sidebar,
  SidebarPanel,
  SidebarInset,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarLabel,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarTooltip,
  SidebarNavigationButton,
  SidebarNavigationSubList,
  SidebarNavigationSubItem,
  SidebarNavigationSubButton,
} from '@/registry/solid/ui/sidebar';

export function SidebarDashboard() {
  return (
    <Sidebar class="h-[38rem] min-h-[30rem] w-[min(100%,64rem)] rounded-lg shadow-sm">
      <SidebarPanel>
        <SidebarHeader>
          <a
            class="flex min-w-0 items-center gap-2 font-semibold text-inherit no-underline"
            href="#overview"
          >
            <span
              class="grid size-control-sm flex-none place-items-center rounded-sm bg-primary text-xs text-primary-foreground"
              data-sidebar-icon
            >
              M
            </span>
            <SidebarLabel>moduix</SidebarLabel>
          </a>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarTooltip content="Overview">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      active
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#overview">
                          <Gauge />
                          <SidebarLabel>Overview</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <Collapsible defaultOpen>
                  <SidebarTooltip content="Projects">
                    {(props) => (
                      <CollapsibleTrigger
                        {...props()}
                        asChild={(triggerProps) => <SidebarNavigationButton {...triggerProps()} />}
                      >
                        <FolderOpen />
                        <SidebarLabel>Projects</SidebarLabel>
                        <CollapsibleIndicator />
                      </CollapsibleTrigger>
                    )}
                  </SidebarTooltip>
                  <CollapsibleContent>
                    <SidebarNavigationSubList>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton
                          asChild={(props) => <a {...props()} href="#website" />}
                        >
                          <SidebarLabel>Website</SidebarLabel>
                        </SidebarNavigationSubButton>
                      </SidebarNavigationSubItem>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton
                          asChild={(props) => <a {...props()} href="#mobile-app" />}
                        >
                          <SidebarLabel>Mobile app</SidebarLabel>
                        </SidebarNavigationSubButton>
                      </SidebarNavigationSubItem>
                    </SidebarNavigationSubList>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Documents">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#documents">
                          <FileText />
                          <SidebarLabel>Documents</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarTooltip content="Team">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#team">
                          <Users />
                          <SidebarLabel>Team</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Settings">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#settings">
                          <Settings />
                          <SidebarLabel>Settings</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <MenuTrigger
                  asChild={(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      size="lg"
                      aria-label="Open workspace menu"
                      title="Workspace"
                    />
                  )}
                >
                  <span
                    class="grid size-control-sm flex-none place-items-center rounded-sm bg-muted text-xs font-semibold text-foreground"
                    data-sidebar-icon
                  >
                    AC
                  </span>
                  <SidebarLabel>Acme Inc.</SidebarLabel>
                  <MenuIndicator>
                    <ChevronsUpDown />
                  </MenuIndicator>
                </MenuTrigger>
                <MenuPositioner>
                  <MenuContent class="w-44 max-w-44 min-w-44">
                    <MenuViewport>
                      <MenuItem value="workspace-settings">
                        <MenuItemText>
                          <Settings />
                          Workspace settings
                        </MenuItemText>
                      </MenuItem>
                      <MenuItem value="manage-members">
                        <MenuItemText>
                          <Users />
                          Manage members
                        </MenuItemText>
                      </MenuItem>
                    </MenuViewport>
                  </MenuContent>
                </MenuPositioner>
              </Menu>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarFooter>
      </SidebarPanel>

      <SidebarResizeTrigger />
      <SidebarTrigger />

      <SidebarInset>
        <main class="grid min-h-full gap-6 p-4 sm:p-6" id="overview">
          <header class="flex flex-wrap items-start justify-between gap-4 [&_h1]:m-0 [&_h1]:mt-1 [&_h1]:text-2xl [&_p]:m-0">
            <div>
              <p class="text-sm font-medium text-muted-foreground">Workspace</p>
              <h1>Overview</h1>
              <p class="mt-2 text-muted-foreground">
                Everything your team is working on, in one place.
              </p>
            </div>
            <Button size="sm">New project</Button>
          </header>

          <section
            class="grid grid-cols-1 gap-4 sm:grid-cols-3"
            id="projects"
            aria-label="Workspace summary"
          >
            <Card size="sm">
              <CardBody class="grid justify-items-center gap-2 text-center [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl">
                <span>Active projects</span>
                <strong>12</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody class="grid justify-items-center gap-2 text-center [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl">
                <span>Team members</span>
                <strong>8</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody class="grid justify-items-center gap-2 text-center [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl">
                <span>Open tasks</span>
                <strong>24</strong>
              </CardBody>
            </Card>
          </section>

          <Card class="self-start" size="sm">
            <CardBody class="grid gap-1 [&_strong]:text-foreground">
              <strong>Keep moving</strong>
              <span>Create a project to start sharing work with your team.</span>
            </CardBody>
          </Card>
        </main>
      </SidebarInset>
    </Sidebar>
  );
}
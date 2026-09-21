import { Avatar, AvatarFallback } from '@moduix/solid/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/solid/collapsible';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator, MenuItemText } from '@moduix/solid/menu';
import { Sidebar } from '@moduix/solid/sidebar';
import { ChevronsUpDown, FileText, FolderOpen, Gauge, LogOut, Plus, Users } from 'lucide-solid';
import styles from '@/components/examples/sidebar/sidebar-nested-navigation-and-account-menu.module.css';

export default function AppSidebar() {
  return (
    <Sidebar class={styles.root}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <div class={styles.headerContent}>
            <div class={styles.brand}>
              <strong data-sidebar-icon class={styles.brandMark}>
                M
              </strong>
              <Sidebar.Label>Moduix</Sidebar.Label>
            </div>
            <Sidebar.Input aria-label="Search workspace" placeholder="Search" size="sm" />
          </div>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupHeader>
              <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
              <Sidebar.GroupAction aria-label="Create workspace item">
                <Plus />
              </Sidebar.GroupAction>
            </Sidebar.GroupHeader>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Overview">
                  {(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      active
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/overview">
                          <Gauge />
                          <Sidebar.Label>Overview</Sidebar.Label>
                        </a>
                      )}
                    />
                  )}
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.ExpandedContent>
                  <Collapsible defaultOpen>
                    <Sidebar.Tooltip content="Projects">
                      {(props) => (
                        <CollapsibleTrigger
                          {...props()}
                          asChild={(triggerProps) => (
                            <Sidebar.NavigationButton {...triggerProps()} />
                          )}
                        >
                          <FolderOpen />
                          <Sidebar.Label>Projects</Sidebar.Label>
                          <CollapsibleIndicator />
                        </CollapsibleTrigger>
                      )}
                    </Sidebar.Tooltip>
                    <CollapsibleContent>
                      <Sidebar.NavigationSubList>
                        <Sidebar.NavigationSubItem>
                          <Sidebar.NavigationSubButton
                            asChild={(props) => <a {...props()} href="/projects/website" />}
                          >
                            Website
                          </Sidebar.NavigationSubButton>
                        </Sidebar.NavigationSubItem>
                        <Sidebar.NavigationSubItem>
                          <Sidebar.NavigationSubButton
                            asChild={(props) => <a {...props()} href="/projects/mobile" />}
                          >
                            Mobile app
                          </Sidebar.NavigationSubButton>
                        </Sidebar.NavigationSubItem>
                      </Sidebar.NavigationSubList>
                    </CollapsibleContent>
                  </Collapsible>
                </Sidebar.ExpandedContent>
                <Sidebar.CollapsedContent>
                  <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                    <MenuTrigger
                      asChild={(props) => (
                        <Sidebar.NavigationButton
                          {...props()}
                          aria-label="Open projects"
                          title="Projects"
                        />
                      )}
                    >
                      <FolderOpen />
                    </MenuTrigger>
                    <MenuPositioner>
                      <MenuContent>
                        <MenuViewport>
                          <MenuItem
                            value="website"
                            asChild={(props) => <a {...props()} href="/projects/website" />}
                          >
                            Website
                          </MenuItem>
                          <MenuItem
                            value="mobile-app"
                            asChild={(props) => <a {...props()} href="/projects/mobile" />}
                          >
                            Mobile app
                          </MenuItem>
                        </MenuViewport>
                      </MenuContent>
                    </MenuPositioner>
                  </Menu>
                </Sidebar.CollapsedContent>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Team">
                  {(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/team">
                          <Users />
                          <Sidebar.Label>Team</Sidebar.Label>
                        </a>
                      )}
                    />
                  )}
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Documents">
                  {(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/documents">
                          <FileText />
                          <Sidebar.Label>Documents</Sidebar.Label>
                        </a>
                      )}
                    />
                  )}
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer class={styles.footer}>
          <Sidebar.Separator />
          <Sidebar.NavigationList>
            <Sidebar.NavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <MenuTrigger
                  asChild={(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      size="lg"
                      aria-label="Open account menu"
                      class={styles.accountButton}
                      title="Account"
                    />
                  )}
                >
                  <Avatar size="sm" data-sidebar-icon>
                    <AvatarFallback>AM</AvatarFallback>
                  </Avatar>
                  <Sidebar.Label class={styles.accountLabel}>
                    <strong class={styles.accountName}>Alex Morgan</strong>
                    <span class={styles.accountEmail}>alex@acme.dev</span>
                  </Sidebar.Label>
                  <MenuIndicator>
                    <ChevronsUpDown />
                  </MenuIndicator>
                </MenuTrigger>
                <MenuPositioner>
                  <MenuContent class={styles.menuContent}>
                    <MenuViewport>
                      <MenuItem value="profile">
                        <MenuItemText>Profile</MenuItemText>
                      </MenuItem>
                      <MenuItem value="settings">
                        <MenuItemText>Settings</MenuItemText>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem value="sign-out" tone="destructive">
                        <MenuItemText>
                          <LogOut />
                          Sign out
                        </MenuItemText>
                      </MenuItem>
                    </MenuViewport>
                  </MenuContent>
                </MenuPositioner>
              </Menu>
            </Sidebar.NavigationItem>
          </Sidebar.NavigationList>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header class={styles.header}>Dashboard</header>
        <main class={styles.content}>
          <strong>Project overview</strong>
          <section class={styles.card}>Your team has 3 updates ready to review.</section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}

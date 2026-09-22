import { Avatar, AvatarFallback } from '@moduix/solid/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/solid/collapsible';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator, MenuItemText } from '@moduix/solid/menu';
import {
  Sidebar,
  SidebarPanel,
  SidebarInset,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarLabel,
  SidebarInput,
  SidebarHeader,
  SidebarContent,
  SidebarExpandedContent,
  SidebarCollapsedContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarTooltip,
  SidebarNavigationButton,
  SidebarNavigationSubList,
  SidebarNavigationSubItem,
  SidebarNavigationSubButton,
} from '@moduix/solid/sidebar';
import { ChevronsUpDown, FileText, FolderOpen, Gauge, LogOut, Plus, Users } from 'lucide-solid';
import styles from '@/components/examples/sidebar/sidebar-nested-navigation-and-account-menu.module.css';

export default function AppSidebar() {
  return (
    <Sidebar class={styles.root}>
      <SidebarPanel>
        <SidebarHeader>
          <div class={styles.headerContent}>
            <div class={styles.brand}>
              <strong data-sidebar-icon class={styles.brandMark}>
                M
              </strong>
              <SidebarLabel>Moduix</SidebarLabel>
            </div>
            <SidebarInput aria-label="Search workspace" placeholder="Search" size="sm" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupHeader>
              <SidebarGroupLabel>Workspace</SidebarGroupLabel>
              <SidebarGroupAction aria-label="Create workspace item">
                <Plus />
              </SidebarGroupAction>
            </SidebarGroupHeader>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarTooltip content="Overview">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      active
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/overview">
                          <Gauge />
                          <SidebarLabel>Overview</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarExpandedContent>
                  <Collapsible defaultOpen>
                    <SidebarTooltip content="Projects">
                      {(props) => (
                        <CollapsibleTrigger
                          {...props()}
                          asChild={(triggerProps) => (
                            <SidebarNavigationButton {...triggerProps()} />
                          )}
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
                            asChild={(props) => <a {...props()} href="/projects/website" />}
                          >
                            Website
                          </SidebarNavigationSubButton>
                        </SidebarNavigationSubItem>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton
                            asChild={(props) => <a {...props()} href="/projects/mobile" />}
                          >
                            Mobile app
                          </SidebarNavigationSubButton>
                        </SidebarNavigationSubItem>
                      </SidebarNavigationSubList>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarExpandedContent>
                <SidebarCollapsedContent>
                  <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                    <MenuTrigger
                      asChild={(props) => (
                        <SidebarNavigationButton
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
                </SidebarCollapsedContent>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Team">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/team">
                          <Users />
                          <SidebarLabel>Team</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Documents">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/documents">
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
        </SidebarContent>
        <SidebarFooter class={styles.footer}>
          <SidebarSeparator />
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <MenuTrigger
                  asChild={(props) => (
                    <SidebarNavigationButton
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
                  <SidebarLabel class={styles.accountLabel}>
                    <strong class={styles.accountName}>Alex Morgan</strong>
                    <span class={styles.accountEmail}>alex@acme.dev</span>
                  </SidebarLabel>
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
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarFooter>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <header class={styles.header}>Dashboard</header>
        <main class={styles.content}>
          <strong>Project overview</strong>
          <section class={styles.card}>Your team has 3 updates ready to review.</section>
        </main>
      </SidebarInset>
    </Sidebar>
  );
}

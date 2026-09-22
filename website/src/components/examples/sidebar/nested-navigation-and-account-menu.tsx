import { Avatar, AvatarFallback } from '@moduix/react/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuSeparator, MenuItemText, MenuItemTextContent, MenuItemTextIcon, MenuItemTextLabel } from '@moduix/react/menu';
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
} from '@moduix/react/sidebar';
import {
  ChevronsUpDown,
  FileText,
  FolderOpen,
  Gauge,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Users,
} from 'lucide-react';
import styles from '@/components/examples/sidebar/sidebar-nested-navigation-and-account-menu.module.css';

export default function AppSidebar() {
  return (
    <Sidebar className={styles.root}>
      <SidebarPanel>
        <SidebarHeader>
          <div className={styles.headerContent}>
            <div className={styles.brand}>
              <strong data-sidebar-icon className={styles.brandMark}>
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
                  <SidebarNavigationButton asChild active>
                    <a href="/overview">
                      <Gauge />
                      <SidebarLabel>Overview</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarExpandedContent>
                  <Collapsible defaultOpen>
                    <SidebarTooltip content="Projects">
                      <CollapsibleTrigger asChild>
                        <SidebarNavigationButton>
                          <FolderOpen />
                          <SidebarLabel>Projects</SidebarLabel>
                          <CollapsibleIndicator />
                        </SidebarNavigationButton>
                      </CollapsibleTrigger>
                    </SidebarTooltip>
                    <CollapsibleContent>
                      <SidebarNavigationSubList>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton href="/projects/website">
                            Website
                          </SidebarNavigationSubButton>
                        </SidebarNavigationSubItem>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton href="/projects/mobile">
                            Mobile app
                          </SidebarNavigationSubButton>
                        </SidebarNavigationSubItem>
                      </SidebarNavigationSubList>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarExpandedContent>
                <SidebarCollapsedContent>
                  <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                    <MenuTrigger asChild>
                      <SidebarNavigationButton aria-label="Open projects" title="Projects">
                        <FolderOpen />
                      </SidebarNavigationButton>
                    </MenuTrigger>
                    <MenuPositioner>
                      <MenuContent>
                        <MenuViewport>
                          <MenuItem value="website" asChild>
                            <a href="/projects/website">Website</a>
                          </MenuItem>
                          <MenuItem value="mobile-app" asChild>
                            <a href="/projects/mobile">Mobile app</a>
                          </MenuItem>
                        </MenuViewport>
                      </MenuContent>
                    </MenuPositioner>
                  </Menu>
                </SidebarCollapsedContent>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Team">
                  <SidebarNavigationButton asChild>
                    <a href="/team">
                      <Users />
                      <SidebarLabel>Team</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Documents">
                  <SidebarNavigationButton asChild>
                    <a href="/documents">
                      <FileText />
                      <SidebarLabel>Documents</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
                </SidebarTooltip>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className={styles.footer}>
          <SidebarSeparator />
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <MenuTrigger asChild>
                  <SidebarNavigationButton
                    size="lg"
                    aria-label="Open account menu"
                    className={styles.accountButton}
                    title="Account"
                  >
                    <Avatar size="sm" data-sidebar-icon>
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <SidebarLabel className={styles.accountLabel}>
                      <strong className={styles.accountName}>Alex Morgan</strong>
                      <span className={styles.accountEmail}>alex@acme.dev</span>
                    </SidebarLabel>
                    <MenuIndicator>
                      <ChevronsUpDown />
                    </MenuIndicator>
                  </SidebarNavigationButton>
                </MenuTrigger>
                <MenuPositioner>
                  <MenuContent className={styles.menuContent}>
                    <MenuViewport>
                      <MenuItem value="profile">
                        <MenuItemText>
                          <MenuItemTextContent>
                            <MenuItemTextIcon>
                              <Pencil />
                            </MenuItemTextIcon>
                            <MenuItemTextLabel>Profile</MenuItemTextLabel>
                          </MenuItemTextContent>
                        </MenuItemText>
                      </MenuItem>
                      <MenuItem value="settings">
                        <MenuItemText>
                          <MenuItemTextContent>
                            <MenuItemTextIcon>
                              <RotateCcw />
                            </MenuItemTextIcon>
                            <MenuItemTextLabel>Settings</MenuItemTextLabel>
                          </MenuItemTextContent>
                        </MenuItemText>
                      </MenuItem>
                      <MenuSeparator />
                      <MenuItem value="sign-out" tone="destructive">
                        <MenuItemText>
                          <MenuItemTextContent>
                            <MenuItemTextIcon>
                              <LogOut />
                            </MenuItemTextIcon>
                            <MenuItemTextLabel>Sign out</MenuItemTextLabel>
                          </MenuItemTextContent>
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
        <header className={styles.header}>Dashboard</header>
        <main className={styles.content}>
          <strong>Project overview</strong>
          <section className={styles.card}>Your team has 3 updates ready to review.</section>
        </main>
      </SidebarInset>
    </Sidebar>
  );
}

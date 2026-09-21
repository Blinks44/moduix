import { Avatar, AvatarFallback } from '@moduix/react/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import { Menu } from '@moduix/react/menu';
import { Sidebar } from '@moduix/react/sidebar';
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
      <Sidebar.Panel>
        <Sidebar.Header>
          <div className={styles.headerContent}>
            <div className={styles.brand}>
              <strong data-sidebar-icon className={styles.brandMark}>
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
                  <Sidebar.NavigationButton asChild active>
                    <a href="/overview">
                      <Gauge />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.ExpandedContent>
                  <Collapsible defaultOpen>
                    <Sidebar.Tooltip content="Projects">
                      <CollapsibleTrigger asChild>
                        <Sidebar.NavigationButton>
                          <FolderOpen />
                          <Sidebar.Label>Projects</Sidebar.Label>
                          <CollapsibleIndicator />
                        </Sidebar.NavigationButton>
                      </CollapsibleTrigger>
                    </Sidebar.Tooltip>
                    <CollapsibleContent>
                      <Sidebar.NavigationSubList>
                        <Sidebar.NavigationSubItem>
                          <Sidebar.NavigationSubButton href="/projects/website">
                            Website
                          </Sidebar.NavigationSubButton>
                        </Sidebar.NavigationSubItem>
                        <Sidebar.NavigationSubItem>
                          <Sidebar.NavigationSubButton href="/projects/mobile">
                            Mobile app
                          </Sidebar.NavigationSubButton>
                        </Sidebar.NavigationSubItem>
                      </Sidebar.NavigationSubList>
                    </CollapsibleContent>
                  </Collapsible>
                </Sidebar.ExpandedContent>
                <Sidebar.CollapsedContent>
                  <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                    <Menu.Trigger asChild>
                      <Sidebar.NavigationButton aria-label="Open projects" title="Projects">
                        <FolderOpen />
                      </Sidebar.NavigationButton>
                    </Menu.Trigger>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Viewport>
                          <Menu.Item value="website" asChild>
                            <a href="/projects/website">Website</a>
                          </Menu.Item>
                          <Menu.Item value="mobile-app" asChild>
                            <a href="/projects/mobile">Mobile app</a>
                          </Menu.Item>
                        </Menu.Viewport>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Menu>
                </Sidebar.CollapsedContent>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Team">
                  <Sidebar.NavigationButton asChild>
                    <a href="/team">
                      <Users />
                      <Sidebar.Label>Team</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Documents">
                  <Sidebar.NavigationButton asChild>
                    <a href="/documents">
                      <FileText />
                      <Sidebar.Label>Documents</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer className={styles.footer}>
          <Sidebar.Separator />
          <Sidebar.NavigationList>
            <Sidebar.NavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <Menu.Trigger asChild>
                  <Sidebar.NavigationButton
                    size="lg"
                    aria-label="Open account menu"
                    className={styles.accountButton}
                    title="Account"
                  >
                    <Avatar size="sm" data-sidebar-icon>
                      <AvatarFallback>AM</AvatarFallback>
                    </Avatar>
                    <Sidebar.Label className={styles.accountLabel}>
                      <strong className={styles.accountName}>Alex Morgan</strong>
                      <span className={styles.accountEmail}>alex@acme.dev</span>
                    </Sidebar.Label>
                    <Menu.Indicator>
                      <ChevronsUpDown />
                    </Menu.Indicator>
                  </Sidebar.NavigationButton>
                </Menu.Trigger>
                <Menu.Positioner>
                  <Menu.Content className={styles.menuContent}>
                    <Menu.Viewport>
                      <Menu.Item value="profile">
                        <Menu.ItemText>
                          <Menu.ItemTextContent>
                            <Menu.ItemTextIcon>
                              <Pencil />
                            </Menu.ItemTextIcon>
                            <Menu.ItemTextLabel>Profile</Menu.ItemTextLabel>
                          </Menu.ItemTextContent>
                        </Menu.ItemText>
                      </Menu.Item>
                      <Menu.Item value="settings">
                        <Menu.ItemText>
                          <Menu.ItemTextContent>
                            <Menu.ItemTextIcon>
                              <RotateCcw />
                            </Menu.ItemTextIcon>
                            <Menu.ItemTextLabel>Settings</Menu.ItemTextLabel>
                          </Menu.ItemTextContent>
                        </Menu.ItemText>
                      </Menu.Item>
                      <Menu.Separator />
                      <Menu.Item value="sign-out" tone="destructive">
                        <Menu.ItemText>
                          <Menu.ItemTextContent>
                            <Menu.ItemTextIcon>
                              <LogOut />
                            </Menu.ItemTextIcon>
                            <Menu.ItemTextLabel>Sign out</Menu.ItemTextLabel>
                          </Menu.ItemTextContent>
                        </Menu.ItemText>
                      </Menu.Item>
                    </Menu.Viewport>
                  </Menu.Content>
                </Menu.Positioner>
              </Menu>
            </Sidebar.NavigationItem>
          </Sidebar.NavigationList>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className={styles.header}>Dashboard</header>
        <main className={styles.content}>
          <strong>Project overview</strong>
          <section className={styles.card}>Your team has 3 updates ready to review.</section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}
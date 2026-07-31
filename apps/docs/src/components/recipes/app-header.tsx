import { Avatar } from '@moduix/react/avatar';
import { Badge } from '@moduix/react/badge';
import { Button } from '@moduix/react/button';
import { Menu } from '@moduix/react/menu';
import { Separator } from '@moduix/react/separator';
import {
  Bell,
  CheckCheck,
  ChevronDown,
  Command,
  LogOut,
  Plus,
  Search,
  Settings,
  UserRound,
} from 'lucide-react';
import styles from './app-header.module.css';

export function AppHeader() {
  return (
    <header className={styles.root}>
      <div className={styles.leading}>
        <a className={styles.brand} href="#overview" aria-label="Orbit">
          <span className={styles.brandMark} aria-hidden>
            <Command />
          </span>
          <span className={styles.brandName}>Orbit</span>
        </a>

        <Separator className={styles.workspaceDivider} orientation="vertical" role="presentation" />

        <a className={styles.workspace} href="#workspace">
          <span className={styles.workspaceLabel}>Acme Studio</span>
          <ChevronDown aria-hidden />
        </a>
      </div>

      <nav className={styles.navigation} aria-label="Primary navigation">
        <a className={styles.navigationLink} data-active href="#overview">
          Overview
        </a>
        <a className={styles.navigationLink} href="#projects">
          Projects
        </a>
        <a className={styles.navigationLink} href="#activity">
          Activity
        </a>
      </nav>

      <div className={styles.actions}>
        <Button variant="ghost" size="icon-sm" aria-label="Search">
          <Search />
        </Button>

        <Button className={styles.newButton} size="sm">
          <Plus aria-hidden />
          <span className={styles.newButtonLabel}>New</span>
        </Button>

        <Separator className={styles.actionDivider} orientation="vertical" role="presentation" />

        <Menu positioning={{ placement: 'bottom-end', gutter: 10 }}>
          <Menu.Trigger asChild>
            <Button
              className={styles.iconButton}
              variant="ghost"
              size="icon-sm"
              aria-label="Open notifications"
            >
              <Bell />
              <Badge className={styles.notificationCount} variant="destructive">
                3
              </Badge>
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content className={styles.notificationsMenu}>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>Notifications</Menu.ItemGroupLabel>
                <Menu.Item value="review" asChild>
                  <a className={styles.notification} href="#review">
                    <span className={styles.notificationTitle}>Design review is ready</span>
                    <span>3 comments need your attention.</span>
                  </a>
                </Menu.Item>
                <Menu.Item value="comment" asChild>
                  <a className={styles.notification} href="#comments">
                    <span className={styles.notificationTitle}>New comment from Lena</span>
                    <span>“The launch brief looks great.”</span>
                  </a>
                </Menu.Item>
                <Menu.Item value="project" asChild>
                  <a className={styles.notification} href="#projects">
                    <span className={styles.notificationTitle}>Project moved to review</span>
                    <span>Website refresh is ready for approval.</span>
                  </a>
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.Separator />
              <Menu.Item value="mark-read">
                <Menu.ItemText>
                  <Menu.ItemTextContent>
                    <Menu.ItemTextIcon>
                      <CheckCheck />
                    </Menu.ItemTextIcon>
                    <Menu.ItemTextLabel>Mark all as read</Menu.ItemTextLabel>
                  </Menu.ItemTextContent>
                </Menu.ItemText>
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu>

        <Menu positioning={{ placement: 'bottom-end', gutter: 10 }}>
          <Menu.Trigger asChild>
            <Button
              className={styles.accountTrigger}
              variant="ghost"
              size="icon-sm"
              aria-label="Open account menu"
            >
              <Avatar size="sm">
                <Avatar.Fallback name="Alex Morgan" />
              </Avatar>
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content className={styles.accountMenu}>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel className={styles.accountSummary}>
                  <Avatar size="sm">
                    <Avatar.Fallback name="Alex Morgan" />
                  </Avatar>
                  <span>
                    <strong>Alex Morgan</strong>
                    <span>alex@acme.studio</span>
                  </span>
                </Menu.ItemGroupLabel>
                <Menu.Item value="profile">
                  <Menu.ItemText>
                    <Menu.ItemTextContent>
                      <Menu.ItemTextIcon>
                        <UserRound />
                      </Menu.ItemTextIcon>
                      <Menu.ItemTextLabel>Profile</Menu.ItemTextLabel>
                    </Menu.ItemTextContent>
                  </Menu.ItemText>
                </Menu.Item>
                <Menu.Item value="settings">
                  <Menu.ItemText>
                    <Menu.ItemTextContent>
                      <Menu.ItemTextIcon>
                        <Settings />
                      </Menu.ItemTextIcon>
                      <Menu.ItemTextLabel>Settings</Menu.ItemTextLabel>
                    </Menu.ItemTextContent>
                  </Menu.ItemText>
                </Menu.Item>
              </Menu.ItemGroup>
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
            </Menu.Content>
          </Menu.Positioner>
        </Menu>
      </div>
    </header>
  );
}
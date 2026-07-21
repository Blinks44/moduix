import { Avatar, Badge, Button, Menu } from '@moduix/react';
import { Bell, CheckCheck, LogOut, Settings, UserRound } from 'lucide-react';
import styles from './app-header.module.css';
import '@moduix/react/style.css';

export function AppHeader() {
  return (
    <header className={styles.root}>
      <a className={styles.brand} href="#overview" aria-label="Moduix">
        <span className={styles.brandMark} aria-hidden>
          M
        </span>
      </a>

      <nav className={styles.navigation} aria-label="Primary navigation">
        <a className={styles.navigationLink} data-active href="#overview">
          Overview
        </a>
        <a className={styles.navigationLink} href="#projects">
          Projects
        </a>
        <a className={styles.navigationLink} href="#team">
          Team
        </a>
      </nav>

      <div className={styles.actions}>
        <Menu positioning={{ placement: 'bottom-end', gutter: 8 }}>
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
                <Menu.Item value="comment" asChild>
                  <a className={styles.notification} href="#comments">
                    <span className={styles.notificationTitle}>New comment on Q3 launch</span>
                    <span>Maria mentioned you 12 minutes ago.</span>
                  </a>
                </Menu.Item>
                <Menu.Item value="invite" asChild>
                  <a className={styles.notification} href="#team">
                    <span className={styles.notificationTitle}>Design team invitation</span>
                    <span>Alex invited you to join the brand workspace.</span>
                  </a>
                </Menu.Item>
                <Menu.Item value="report" asChild>
                  <a className={styles.notification} href="#reports">
                    <span className={styles.notificationTitle}>Weekly report is ready</span>
                    <span>Your workspace activity is ready to review.</span>
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

        <Menu positioning={{ placement: 'bottom-end', gutter: 8 }}>
          <Menu.Trigger asChild>
            <Button
              className={styles.account}
              variant="ghost"
              size="sm"
              aria-label="Open account menu"
            >
              <Avatar size="sm">
                <Avatar.Fallback name="Alex Morgan" />
              </Avatar>
              <span className={styles.accountLabel}>
                <strong>Alex Morgan</strong>
                <span>alex@moduix.dev</span>
              </span>
              <Menu.Indicator />
            </Button>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content className={styles.accountMenu}>
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
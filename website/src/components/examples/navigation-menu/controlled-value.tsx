import { NavigationMenu } from '@moduix/react/navigation-menu';
import { ChevronDownIcon } from 'lucide-react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/navigation-menu/navigation-menu-controlled-value.module.css';

export default function ControlledNavigationMenuDemo() {
  const [value, setValue] = useState<string | undefined>();

  return (
    <div className={styles.root}>
      <NavigationMenu
        value={value}
        onValueChange={(details) => setValue(details.value ?? undefined)}
      >
        <NavigationMenu.List>
          <NavigationMenu.Item value="home">
            <NavigationMenu.Link href="#home">Home</NavigationMenu.Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="products">
            <NavigationMenu.Trigger>
              Products
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="#analytics">Analytics</NavigationMenu.Link>
              <NavigationMenu.Link href="#automation">Automation</NavigationMenu.Link>
              <NavigationMenu.Link href="#integrations">Integrations</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
          <NavigationMenu.Item value="docs">
            <NavigationMenu.Trigger>
              Docs
              <ChevronDownIcon />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content>
              <NavigationMenu.Link href="#guides">Guides</NavigationMenu.Link>
              <NavigationMenu.Link href="#api">API reference</NavigationMenu.Link>
              <NavigationMenu.Link href="#examples">Examples</NavigationMenu.Link>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu>
      <PreviewMeta>
        <output>Open: {value ?? 'none'}</output>
      </PreviewMeta>
    </div>
  );
}
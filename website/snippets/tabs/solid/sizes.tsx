import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@moduix/solid/tabs';
import { For } from 'solid-js';
import styles from '@/components/examples/tabs/tabs-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;
const tabs = ['Overview', 'Projects', 'Account'];

export default function TabsSizesDemo() {
  return (
    <div class={styles.root}>
      <For each={sizes}>
        {(size) => (
          <Tabs defaultValue="Overview" size={size}>
            <TabsList aria-label={`Sections, ${size}`}>
              <For each={tabs}>{(tab) => <TabsTrigger value={tab}>{tab}</TabsTrigger>}</For>
              <TabsIndicator />
            </TabsList>
          </Tabs>
        )}
      </For>
    </div>
  );
}
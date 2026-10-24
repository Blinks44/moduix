import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@moduix/react/tabs';
import styles from '@/components/examples/tabs/tabs-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;
const tabs = ['Overview', 'Projects', 'Account'];

export default function TabsSizesDemo() {
  return (
    <div className={styles.root}>
      {sizes.map((size) => (
        <Tabs key={size} defaultValue="Overview" size={size}>
          <TabsList aria-label={`Sections, ${size}`}>
            {tabs.map((tab) => (
              <TabsTrigger key={tab} value={tab}>
                {tab}
              </TabsTrigger>
            ))}
            <TabsIndicator />
          </TabsList>
        </Tabs>
      ))}
    </div>
  );
}
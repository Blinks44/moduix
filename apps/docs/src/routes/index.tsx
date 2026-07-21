import { createListCollection } from '@ark-ui/react/collection';
import { Button, Dialog, ProgressLinear, Select, Switch, Tabs } from '@moduix/react';
import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { ArrowRight, Component, Layers3, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { DataTable } from '@/components/home/data-table';
import { FrameworkSupport } from '@/components/home/framework-support';
import { baseOptions } from '@/lib/layout.shared';
import { getCanonicalUrl } from '@/lib/seo';
import styles from './index.module.css';

export const Route = createFileRoute('/')({
  component: Home,
  head: () => ({
    links: [{ rel: 'canonical', href: getCanonicalUrl('/') }],
  }),
});

const workspaceOptions = [
  { label: 'Design system', value: 'design-system' },
  { label: 'Checkout flow', value: 'checkout-flow' },
  { label: 'Maps widgets', value: 'maps-widgets' },
];
const workspaceCollection = createListCollection({ items: workspaceOptions });

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className={styles.home}>
        <div className={styles.spotlight} />
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.content}>
            <div className={styles.badges} aria-label="Design foundations">
              <a
                className={styles.badge}
                href="https://ark-ui.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Sparkles size={14} aria-hidden="true" />
                Built on Ark UI
              </a>
              <a
                className={styles.badge}
                href="https://ui.shadcn.com/"
                target="_blank"
                rel="noreferrer"
              >
                <Layers3 size={14} aria-hidden="true" />
                shadcn-inspired
              </a>
            </div>
            <h1 id="home-title" className={styles.title}>
              moduix
            </h1>
            <p className={styles.lead}>
              Accessible React components with calm defaults, explicit composition, and a
              token-first CSS foundation you can theme or own.
            </p>
            <FrameworkSupport />
            <div className={styles.actions}>
              <Link
                to="/docs/$"
                params={{
                  _splat: '',
                }}
                className={styles.primary}
              >
                Get started
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link to="/docs/components" className={styles.secondary}>
                Components
                <Component size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>

          <div className={styles.showcase}>
            <div className={`${styles.panel} ${styles.panelMain}`}>
              <div className={styles.panelHeader}>
                <span />
                <span />
                <span />
              </div>
              <HomeShowcase />
            </div>

            <div className={`${styles.panel} ${styles.floatPanel}`} aria-hidden="true">
              <div className={styles.menuLine} />
              <div className={styles.menuLine} />
              <div className={styles.menuLine} />
            </div>
          </div>
        </section>

        <section className={styles.dataTableSection} aria-labelledby="component-table-title">
          <div className={styles.dataTableIntro}>
            <div>
              <span className={styles.sectionEyebrow}>Composition in practice</span>
              <h2 id="component-table-title">A few components, working together.</h2>
              <p>
                Search, selection, menus, and a wide table stay small and composable—ready for a
                product screen rather than a marketing mockup.
              </p>
            </div>
            <Link
              to="/docs/$"
              params={{
                _splat: 'data-table',
              }}
              className={styles.tableLink}
            >
              Explore the table pattern
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <DataTable />
        </section>
      </div>
    </HomeLayout>
  );
}

function HomeShowcase() {
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const [progressValue, setProgressValue] = useState(72);
  const [workspaceValue, setWorkspaceValue] = useState<string[]>(['design-system']);

  const workspaceLabel =
    workspaceOptions.find((item) => item.value === workspaceValue[0])?.label ?? 'Select workspace';

  const handleAutomationChange = (details: { checked: boolean }) => {
    setAutomationEnabled(details.checked);
    setProgressValue(details.checked ? 72 : 38);
  };

  return (
    <Tabs defaultValue="button" className={styles.showcaseTabs}>
      <Tabs.List className={styles.showcaseTabsList}>
        <Tabs.Trigger value="button">Button</Tabs.Trigger>
        <Tabs.Trigger value="dialog">Dialog</Tabs.Trigger>
        <Tabs.Trigger value="select">Select</Tabs.Trigger>
        <Tabs.Indicator />
      </Tabs.List>

      <Tabs.Content value="button" className={styles.showcasePanel}>
        <Tabs defaultValue="actions" variant="line" className={styles.nestedTabs}>
          <Tabs.List className={styles.nestedTabsList}>
            <Tabs.Trigger value="actions">Actions</Tabs.Trigger>
            <Tabs.Trigger value="status">Status</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>

          <Tabs.Content value="actions" className={styles.nestedPanel}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span className={styles.eyebrow}>Release controls</span>
                <strong>Fast actions with real states</strong>
              </div>
              <div className={styles.buttonRow}>
                <Button>Publish update</Button>
                <Button variant="outline">Preview</Button>
                <Button variant="ghost">Share</Button>
              </div>
              <div className={styles.miniStats}>
                <div className={styles.metric}>
                  <span>Primary CTA</span>
                  <strong>Default variant</strong>
                </div>
                <div className={styles.metric}>
                  <span>Secondary path</span>
                  <strong>Outline and ghost</strong>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="status" className={styles.nestedPanel}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span className={styles.eyebrow}>Flow health</span>
                <strong>Toggle and progress in one pass</strong>
              </div>
              <Switch
                checked={automationEnabled}
                onCheckedChange={handleAutomationChange}
                className={styles.switchRow}
              >
                <Switch.Control />
                <Switch.Label>Auto-review before release</Switch.Label>
              </Switch>
              <ProgressLinear value={progressValue} className={styles.heroProgress}>
                <ProgressLinear.Label>Release readiness</ProgressLinear.Label>
                <ProgressLinear.ValueText />
                <ProgressLinear.Track>
                  <ProgressLinear.Range />
                </ProgressLinear.Track>
              </ProgressLinear>
              <div className={styles.statusRow}>
                <span>{automationEnabled ? 'Checks enabled' : 'Manual review only'}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setProgressValue((value) => Math.min(value + 9, 100))}
                >
                  Advance
                </Button>
              </div>
            </div>
          </Tabs.Content>
        </Tabs>
      </Tabs.Content>

      <Tabs.Content value="dialog" className={styles.showcasePanel}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.eyebrow}>Approval flow</span>
            <strong>Open the modal directly in the hero</strong>
          </div>
          <p className={styles.previewText}>
            The preview stays compact, but the interaction is real and uses the shipped dialog API.
          </p>
          <div className={styles.buttonRow}>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button>Review changes</Button>
              </Dialog.Trigger>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>Publish release?</Dialog.Title>
                    <Dialog.Description>
                      Push the updated components and docs to the shared workspace.
                    </Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <Button variant="outline">Back</Button>
                    </Dialog.CloseTrigger>
                    <Dialog.CloseTrigger asChild>
                      <Button>Approve</Button>
                    </Dialog.CloseTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
            <Button variant="outline">Inspect API</Button>
          </div>
          <div className={styles.miniStats}>
            <div className={styles.metric}>
              <span>Focus management</span>
              <strong>Built in</strong>
            </div>
            <div className={styles.metric}>
              <span>Composition</span>
              <strong>Trigger, content, footer</strong>
            </div>
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="select" className={styles.showcasePanel}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.eyebrow}>Workspace picker</span>
            <strong>Interactive select with current value</strong>
          </div>
          <div className={styles.heroSelect}>
            <Select
              collection={workspaceCollection}
              value={workspaceValue}
              onValueChange={(details) => setWorkspaceValue(details.value)}
            >
              <Select.Label>Active workspace</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder="Select workspace" />
                </Select.Trigger>
                <Select.Indicators>
                  <Select.Indicator />
                </Select.Indicators>
              </Select.Control>

              <Select.Positioner>
                <Select.Content>
                  {workspaceCollection.items.map((item) => (
                    <Select.Item key={item.value} item={item}>
                      <Select.ItemText>{item.label}</Select.ItemText>
                      <Select.ItemIndicator />
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Positioner>
            </Select>
          </div>
          <div className={styles.miniStats}>
            <div className={styles.metric}>
              <span>Selected</span>
              <strong>{workspaceLabel}</strong>
            </div>
            <div className={styles.metric}>
              <span>Pattern</span>
              <strong>Field, trigger, list</strong>
            </div>
          </div>
        </div>
      </Tabs.Content>
    </Tabs>
  );
}
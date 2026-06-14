import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { ArrowRight, Code2, Component, Layers3, PackageCheck, Sparkles } from 'lucide-react';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Progress,
  ProgressLabel,
  ProgressValue,
  Select,
  SelectContent,
  SelectField,
  SelectIcon,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectLabel,
  SelectList,
  SelectTrigger,
  SelectValue,
  Switch,
  SwitchField,
  SwitchLabel,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
} from 'moduix';
import { useState } from 'react';
import { baseOptions } from '@/lib/layout.shared';
import styles from './index.module.css';

export const Route = createFileRoute('/')({
  component: Home,
});

const highlights = [
  {
    icon: Layers3,
    label: 'Composable primitives',
  },
  {
    icon: Code2,
    label: 'Typed React API',
  },
  {
    icon: PackageCheck,
    label: 'Shadcn-like composition',
  },
];

const workspaceOptions = [
  { label: 'Design system', value: 'design-system' },
  { label: 'Checkout flow', value: 'checkout-flow' },
  { label: 'Maps widgets', value: 'maps-widgets' },
];

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <div className={styles.home}>
        <div className={styles.spotlight} />
        <section className={styles.hero} aria-labelledby="home-title">
          <div className={styles.content}>
            <div className={styles.badge}>
              <Sparkles size={14} aria-hidden="true" />
              Base UI powered components
            </div>
            <h1 id="home-title" className={styles.title}>
              moduix
            </h1>
            <p className={styles.lead}>
              A precise React component library for teams shipping calm, consistent product
              interfaces.
            </p>
            <div className={styles.actions}>
              <Link
                to="/docs/$"
                params={{
                  _splat: '',
                }}
                className={styles.primary}
              >
                Open documentation
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link
                to="/docs/$"
                params={{
                  _splat: 'accordion',
                }}
                className={styles.secondary}
              >
                Components
                <Component size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className={styles.highlights} aria-label="Library highlights">
              {highlights.map(({ icon: Icon, label }) => (
                <div className={styles.highlight} key={label}>
                  <Icon size={16} aria-hidden="true" />
                  <span>{label}</span>
                </div>
              ))}
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
      </div>
    </HomeLayout>
  );
}

function HomeShowcase() {
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const [progressValue, setProgressValue] = useState(72);
  const [workspaceValue, setWorkspaceValue] = useState<string | null>('design-system');

  const workspaceLabel =
    workspaceOptions.find((item) => item.value === workspaceValue)?.label ?? 'Select workspace';

  const handleAutomationChange = (checked: boolean) => {
    setAutomationEnabled(checked);
    setProgressValue(checked ? 72 : 38);
  };

  return (
    <Tabs defaultValue="button" className={styles.showcaseTabs}>
      <TabsList className={styles.showcaseTabsList}>
        <TabsTab value="button">Button</TabsTab>
        <TabsTab value="dialog">Dialog</TabsTab>
        <TabsTab value="select">Select</TabsTab>
      </TabsList>

      <TabsPanel value="button" className={styles.showcasePanel}>
        <Tabs defaultValue="actions" variant="line" className={styles.nestedTabs}>
          <TabsList className={styles.nestedTabsList}>
            <TabsTab value="actions">Actions</TabsTab>
            <TabsTab value="status">Status</TabsTab>
          </TabsList>

          <TabsPanel value="actions" className={styles.nestedPanel}>
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
          </TabsPanel>

          <TabsPanel value="status" className={styles.nestedPanel}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span className={styles.eyebrow}>Flow health</span>
                <strong>Toggle and progress in one pass</strong>
              </div>
              <SwitchField className={styles.switchRow}>
                <Switch checked={automationEnabled} onCheckedChange={handleAutomationChange} />
                <SwitchLabel>Auto-review before release</SwitchLabel>
              </SwitchField>
              <Progress value={progressValue} className={styles.heroProgress}>
                <ProgressLabel>Release readiness</ProgressLabel>
                <ProgressValue />
              </Progress>
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
          </TabsPanel>
        </Tabs>
      </TabsPanel>

      <TabsPanel value="dialog" className={styles.showcasePanel}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.eyebrow}>Approval flow</span>
            <strong>Open the modal directly in the hero</strong>
          </div>
          <p className={styles.previewText}>
            The preview stays compact, but the interaction is real and uses the shipped dialog API.
          </p>
          <div className={styles.buttonRow}>
            <Dialog>
              <DialogTrigger render={<Button />}>Review changes</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Publish release?</DialogTitle>
                  <DialogDescription>
                    Push the updated components and docs to the shared workspace.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>Back</DialogClose>
                  <DialogClose render={<Button />}>Approve</DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
      </TabsPanel>

      <TabsPanel value="select" className={styles.showcasePanel}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.eyebrow}>Workspace picker</span>
            <strong>Interactive select with current value</strong>
          </div>
          <div className={styles.heroSelect}>
            <Select
              value={workspaceValue}
              onValueChange={setWorkspaceValue}
              items={workspaceOptions}
            >
              <SelectField>
                <SelectLabel>Active workspace</SelectLabel>
                <SelectTrigger className={styles.heroSelectTrigger}>
                  <SelectValue placeholder="Select workspace" />
                  <SelectIcon />
                </SelectTrigger>
              </SelectField>

              <SelectContent alignItemWithTrigger={false}>
                <SelectList>
                  {workspaceOptions.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <SelectItemIndicator />
                      <SelectItemText>{item.label}</SelectItemText>
                    </SelectItem>
                  ))}
                </SelectList>
              </SelectContent>
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
      </TabsPanel>
    </Tabs>
  );
}
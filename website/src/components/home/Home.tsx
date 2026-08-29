import { createListCollection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import { Dialog } from '@moduix/react/dialog';
import { ProgressLinear } from '@moduix/react/progress-linear';
import { Select } from '@moduix/react/select';
import { Switch } from '@moduix/react/switch';
import { Tabs } from '@moduix/react/tabs';
import { useI18n } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme';
import { ArrowRight, Code2, Component, Layers3, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { FrameworkSupport } from '@/components/home/framework-support';
import { DataTable } from '@/components/recipes/data-table';
import { useLocalizedPath } from '@/utils/localized-path';
import styles from './Home.module.css';

export function Home() {
  const t = useI18n<typeof import('i18n')>();
  const docsPath = useLocalizedPath('/docs/');
  const componentsPath = useLocalizedPath('/docs/components');
  const dataTablePath = useLocalizedPath('/recipes/data-table');
  return (
    <main className={`${styles.home} moduix-home`}>
      <div className={styles.spotlight} />
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.content}>
          <div className={styles.badges} aria-label={t('homeDesignFoundations')}>
            <a className={styles.badge} href="https://ark-ui.com/" target="_blank" rel="noreferrer">
              <Sparkles size={14} aria-hidden="true" />
              {t('homeBuiltOnArk')}
            </a>
            <a
              className={styles.badge}
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Layers3 size={14} aria-hidden="true" />
              {t('homeShadcnInspired')}
            </a>
            <span className={styles.badge}>
              <Code2 size={14} aria-hidden="true" />
              {t('homeCssModules')}
            </span>
          </div>
          <h1 id="home-title" className={styles.title}>
            moduix
          </h1>
          <p className={styles.lead}>{t('homeLead')}</p>
          <FrameworkSupport />
          <div className={styles.actions}>
            <Link href={docsPath} className={styles.primary}>
              {t('homeGetStarted')}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href={componentsPath} className={styles.secondary}>
              {t('homeComponents')}
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
            <span className={styles.sectionEyebrow}>{t('homeCompositionInPractice')}</span>
            <h2 id="component-table-title">{t('homeComponentsTogether')}</h2>
            <p>{t('homeCompositionDescription')}</p>
          </div>
          <Link href={dataTablePath} className={styles.tableLink}>
            {t('homeExploreTable')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <DataTable />
      </section>
    </main>
  );
}

function HomeShowcase() {
  const t = useI18n<typeof import('i18n')>();
  const workspaceOptions = [
    { label: t('homeWorkspaceDesignSystem'), value: 'design-system' },
    { label: t('homeWorkspaceCheckoutFlow'), value: 'checkout-flow' },
    { label: t('homeWorkspaceMapsWidgets'), value: 'maps-widgets' },
  ];
  const workspaceCollection = createListCollection({ items: workspaceOptions });
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const [progressValue, setProgressValue] = useState(72);
  const [workspaceValue, setWorkspaceValue] = useState<string[]>(['design-system']);

  const workspaceLabel =
    workspaceOptions.find((item) => item.value === workspaceValue[0])?.label ??
    t('homeSelectWorkspace');

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
            <Tabs.Trigger value="actions">{t('homeShowcaseActions')}</Tabs.Trigger>
            <Tabs.Trigger value="status">{t('homeShowcaseStatus')}</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>

          <Tabs.Content value="actions" className={styles.nestedPanel}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span className={styles.eyebrow}>{t('homeReleaseControls')}</span>
                <strong>{t('homeFastActions')}</strong>
              </div>
              <div className={styles.buttonRow}>
                <Button>{t('homePublishUpdate')}</Button>
                <Button variant="outline">{t('homePreview')}</Button>
                <Button variant="ghost">{t('homeShare')}</Button>
              </div>
              <div className={styles.miniStats}>
                <div className={styles.metric}>
                  <span>{t('homePrimaryAction')}</span>
                  <strong>{t('homeDefaultVariant')}</strong>
                </div>
                <div className={styles.metric}>
                  <span>{t('homeSecondaryAction')}</span>
                  <strong>{t('homeOutlineAndGhost')}</strong>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="status" className={styles.nestedPanel}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span className={styles.eyebrow}>{t('homeFlowHealth')}</span>
                <strong>{t('homeToggleAndProgress')}</strong>
              </div>
              <Switch
                checked={automationEnabled}
                onCheckedChange={handleAutomationChange}
                className={styles.switchRow}
              >
                <Switch.Control />
                <Switch.Label>{t('homeAutoReview')}</Switch.Label>
              </Switch>
              <ProgressLinear value={progressValue} className={styles.heroProgress}>
                <ProgressLinear.Label>{t('homeReleaseReadiness')}</ProgressLinear.Label>
                <ProgressLinear.ValueText />
                <ProgressLinear.Track>
                  <ProgressLinear.Range />
                </ProgressLinear.Track>
              </ProgressLinear>
              <div className={styles.statusRow}>
                <span>{automationEnabled ? t('homeChecksEnabled') : t('homeManualReview')}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setProgressValue((value) => Math.min(value + 9, 100))}
                >
                  {t('homeAdvance')}
                </Button>
              </div>
            </div>
          </Tabs.Content>
        </Tabs>
      </Tabs.Content>

      <Tabs.Content value="dialog" className={styles.showcasePanel}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.eyebrow}>{t('homeApprovalFlow')}</span>
            <strong>{t('homeOpenModal')}</strong>
          </div>
          <p className={styles.previewText}>{t('homeDialogPreviewDescription')}</p>
          <div className={styles.buttonRow}>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button>{t('homeReviewChanges')}</Button>
              </Dialog.Trigger>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{t('homePublishRelease')}</Dialog.Title>
                    <Dialog.Description>{t('homePublishReleaseDescription')}</Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <Button variant="outline">{t('homeBack')}</Button>
                    </Dialog.CloseTrigger>
                    <Dialog.CloseTrigger asChild>
                      <Button>{t('homeApprove')}</Button>
                    </Dialog.CloseTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
            <Button variant="outline">{t('homeInspectApi')}</Button>
          </div>
          <div className={styles.miniStats}>
            <div className={styles.metric}>
              <span>{t('homeFocusManagement')}</span>
              <strong>{t('homeBuiltIn')}</strong>
            </div>
            <div className={styles.metric}>
              <span>{t('homeShowcaseComposition')}</span>
              <strong>{t('homeTriggerContentFooter')}</strong>
            </div>
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="select" className={styles.showcasePanel}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.eyebrow}>{t('homeWorkspacePicker')}</span>
            <strong>{t('homeInteractiveSelect')}</strong>
          </div>
          <div className={styles.heroSelect}>
            <Select
              collection={workspaceCollection}
              value={workspaceValue}
              onValueChange={(details) => setWorkspaceValue(details.value)}
            >
              <Select.Label>{t('homeActiveWorkspace')}</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder={t('homeSelectWorkspace')} />
                  <Select.Indicator />
                </Select.Trigger>
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
              <span>{t('homeSelected')}</span>
              <strong>{workspaceLabel}</strong>
            </div>
            <div className={styles.metric}>
              <span>{t('homePattern')}</span>
              <strong>{t('homeFieldTriggerList')}</strong>
            </div>
          </div>
        </div>
      </Tabs.Content>
    </Tabs>
  );
}
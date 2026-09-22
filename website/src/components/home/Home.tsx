import { createListCollection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import {
  Dialog,
  DialogBackdrop,
  DialogCloseTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogTitle,
  DialogTrigger,
} from '@moduix/react/dialog';
import {
  ProgressLinear,
  ProgressLinearLabel,
  ProgressLinearValueText,
  ProgressLinearTrack,
  ProgressLinearRange,
} from '@moduix/react/progress-linear';
import {
  Select,
  SelectLabel,
  SelectControl,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@moduix/react/select';
import { Switch, SwitchControl, SwitchHiddenInput, SwitchLabel } from '@moduix/react/switch';
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from '@moduix/react/tabs';
import { useI18n } from '@rspress/core/runtime';
import { Link } from '@rspress/core/theme';
import {
  ArrowRight,
  BookOpen,
  Boxes,
  ClipboardList,
  Component,
  Database,
  Wrench,
} from 'lucide-react';
import { useState } from 'react';
import { FrameworkSupport } from '@/components/home/framework-support';
import { DataTable } from '@/components/recipes/data-table';
import { SidebarDashboard } from '@/components/recipes/sidebar-dashboard';
import { useLocalizedPath } from '@/utils/localized-path';
import styles from './Home.module.css';

export function Home() {
  const t = useI18n<typeof import('i18n')>();
  const docsPath = useLocalizedPath('/docs/');
  const changelogPath = useLocalizedPath('/docs/changelog');
  const componentsPath = useLocalizedPath('/docs/components');
  const collectionsPath = useLocalizedPath('/docs/collections');
  const utilitiesPath = useLocalizedPath('/docs/utilities');
  const formsPath = useLocalizedPath('/docs/forms');
  const guidesPath = useLocalizedPath('/docs/styling');
  const recipesPath = useLocalizedPath('/recipes');
  const documentationAreas = [
    {
      title: t('homeAreaComponents'),
      description: t('homeAreaComponentsDescription'),
      href: componentsPath,
      icon: Component,
    },
    {
      title: t('homeAreaCollections'),
      description: t('homeAreaCollectionsDescription'),
      href: collectionsPath,
      icon: Database,
    },
    {
      title: t('homeAreaUtilities'),
      description: t('homeAreaUtilitiesDescription'),
      href: utilitiesPath,
      icon: Wrench,
    },
    {
      title: t('homeAreaForms'),
      description: t('homeAreaFormsDescription'),
      href: formsPath,
      icon: ClipboardList,
    },
    {
      title: t('homeAreaGuides'),
      description: t('homeAreaGuidesDescription'),
      href: guidesPath,
      icon: BookOpen,
    },
    {
      title: t('homeAreaRecipes'),
      description: t('homeAreaRecipesDescription'),
      href: recipesPath,
      icon: Boxes,
    },
  ];
  return (
    <main className={`${styles.home} moduix-home`}>
      <div className={styles.spotlight} />
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.content}>
          <Link href={changelogPath} className={`${styles.badge} ${styles.releaseBadge}`}>
            <span className={styles.releaseDot} aria-hidden="true" />
            {t('homeReleaseBadge')}
          </Link>
          <h1 id="home-title" className={styles.title}>
            moduix
          </h1>
          <p className={styles.lead} dangerouslySetInnerHTML={{ __html: t('homeLead') }} />
          <FrameworkSupport />
          <p className={styles.frameworkStatus}>{t('homeFrameworkStatus')}</p>
          <div className={styles.actions}>
            <Link href={docsPath} className={styles.primary}>
              {t('homeGetStarted')}
              <ArrowRight size={18} aria-hidden="true" />
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

      <section className={styles.documentationSection} aria-labelledby="documentation-title">
        <div className={styles.documentationIntro}>
          <span className={styles.sectionEyebrow}>{t('homeDocumentationEyebrow')}</span>
          <h2 id="documentation-title">{t('homeDocumentationTitle')}</h2>
          <p>{t('homeDocumentationDescription')}</p>
        </div>
        <div className={styles.documentationGrid}>
          {documentationAreas.map(({ title, description, href, icon: Icon }) => (
            <Link key={title} href={href} className={styles.documentationCard}>
              <span className={styles.documentationIcon}>
                <Icon size={18} aria-hidden="true" />
              </span>
              <span className={styles.documentationCardContent}>
                <strong>{title}</strong>
                <span>{description}</span>
              </span>
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.dataTableSection} aria-labelledby="component-table-title">
        <div className={styles.dataTableIntro}>
          <div>
            <span className={styles.sectionEyebrow}>{t('homeCompositionInPractice')}</span>
            <h2 id="component-table-title">{t('homeComponentsTogether')}</h2>
            <p>{t('homeCompositionDescription')}</p>
          </div>
          <Link href={recipesPath} className={styles.tableLink}>
            {t('homeExploreRecipes')}
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <Tabs defaultValue="data-table" className={styles.componentTabs}>
          <TabsList className={styles.componentTabsList}>
            <TabsTrigger value="data-table">DataTable</TabsTrigger>
            <TabsTrigger value="sidebar">Sidebar</TabsTrigger>
            <TabsIndicator />
          </TabsList>

          <TabsContent value="data-table" className={styles.componentTabPanel}>
            <DataTable />
          </TabsContent>
          <TabsContent
            value="sidebar"
            className={`${styles.componentTabPanel} ${styles.componentTabPanelSidebar}`}
          >
            <SidebarDashboard />
          </TabsContent>
        </Tabs>
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
      <TabsList className={styles.showcaseTabsList}>
        <TabsTrigger value="button">Button</TabsTrigger>
        <TabsTrigger value="dialog">Dialog</TabsTrigger>
        <TabsTrigger value="select">Select</TabsTrigger>
        <TabsIndicator />
      </TabsList>

      <TabsContent value="button" className={styles.showcasePanel}>
        <Tabs defaultValue="actions" variant="line" className={styles.nestedTabs}>
          <TabsList className={styles.nestedTabsList}>
            <TabsTrigger value="actions">{t('homeShowcaseActions')}</TabsTrigger>
            <TabsTrigger value="status">{t('homeShowcaseStatus')}</TabsTrigger>
            <TabsIndicator />
          </TabsList>

          <TabsContent value="actions" className={styles.nestedPanel}>
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
          </TabsContent>

          <TabsContent value="status" className={styles.nestedPanel}>
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
                <SwitchControl />
                <SwitchHiddenInput />
                <SwitchLabel>{t('homeAutoReview')}</SwitchLabel>
              </Switch>
              <ProgressLinear value={progressValue} className={styles.heroProgress}>
                <ProgressLinearLabel>{t('homeReleaseReadiness')}</ProgressLinearLabel>
                <ProgressLinearValueText />
                <ProgressLinearTrack>
                  <ProgressLinearRange />
                </ProgressLinearTrack>
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
          </TabsContent>
        </Tabs>
      </TabsContent>

      <TabsContent value="dialog" className={styles.showcasePanel}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.eyebrow}>{t('homeApprovalFlow')}</span>
            <strong>{t('homeOpenModal')}</strong>
          </div>
          <p className={styles.previewText}>{t('homeDialogPreviewDescription')}</p>
          <div className={styles.buttonRow}>
            <Dialog>
              <DialogTrigger asChild>
                <Button>{t('homeReviewChanges')}</Button>
              </DialogTrigger>
              <DialogBackdrop />
              <DialogPositioner>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{t('homePublishRelease')}</DialogTitle>
                    <DialogDescription>{t('homePublishReleaseDescription')}</DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <DialogCloseTrigger asChild>
                      <Button variant="outline">{t('homeBack')}</Button>
                    </DialogCloseTrigger>
                    <DialogCloseTrigger asChild>
                      <Button>{t('homeApprove')}</Button>
                    </DialogCloseTrigger>
                  </DialogFooter>
                </DialogContent>
              </DialogPositioner>
            </Dialog>
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
      </TabsContent>

      <TabsContent value="select" className={styles.showcasePanel}>
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
              <SelectLabel>{t('homeActiveWorkspace')}</SelectLabel>
              <SelectControl>
                <SelectTrigger>
                  <SelectValueText placeholder={t('homeSelectWorkspace')} />
                </SelectTrigger>
                <SelectIndicator />
              </SelectControl>

              <SelectPositioner>
                <SelectContent>
                  {workspaceCollection.items.map((item) => (
                    <SelectItem key={item.value} item={item}>
                      <SelectItemText>{item.label}</SelectItemText>
                      <SelectItemIndicator />
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectPositioner>
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
      </TabsContent>
    </Tabs>
  );
}

import { createListCollection } from '@ark-ui/react/collection';
import { Button } from '@moduix/react/button';
import { Dialog } from '@moduix/react/dialog';
import { ProgressLinear } from '@moduix/react/progress-linear';
import { Select } from '@moduix/react/select';
import { Switch } from '@moduix/react/switch';
import { Tabs } from '@moduix/react/tabs';
import { useLang } from '@rspress/core/runtime';
import { ArrowRight, Component, Layers3, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { FrameworkSupport } from '@/components/home/framework-support';
import { DataTable } from '@/components/recipes/data-table';
import styles from './Home.module.css';

const getWorkspaceOptions = (isRussian: boolean) =>
  isRussian
    ? [
        { label: 'Дизайн-система', value: 'design-system' },
        { label: 'Оформление заказа', value: 'checkout-flow' },
        { label: 'Виджеты карт', value: 'maps-widgets' },
      ]
    : [
        { label: 'Design system', value: 'design-system' },
        { label: 'Checkout flow', value: 'checkout-flow' },
        { label: 'Maps widgets', value: 'maps-widgets' },
      ];

export function Home() {
  const isRussian = useLang() === 'ru';
  const t = (english: string, russian: string) => (isRussian ? russian : english);
  const docsPath = isRussian ? '/ru/docs/' : '/docs/';
  const componentsPath = isRussian ? '/ru/docs/components' : '/docs/components';

  return (
    <main className={`${styles.home} moduix-home`}>
      <div className={styles.spotlight} />
      <section className={styles.hero} aria-labelledby="home-title">
        <div className={styles.content}>
          <div className={styles.badges} aria-label={t('Design foundations', 'Основы дизайна')}>
            <a className={styles.badge} href="https://ark-ui.com/" target="_blank" rel="noreferrer">
              <Sparkles size={14} aria-hidden="true" />
              {t('Built on Ark UI', 'На базе Ark UI')}
            </a>
            <a
              className={styles.badge}
              href="https://ui.shadcn.com/"
              target="_blank"
              rel="noreferrer"
            >
              <Layers3 size={14} aria-hidden="true" />
              {t('shadcn-inspired', 'Вдохновлено shadcn')}
            </a>
          </div>
          <h1 id="home-title" className={styles.title}>
            moduix
          </h1>
          <p className={styles.lead}>
            {t(
              'Accessible React components with calm defaults, explicit composition, and a token-first CSS foundation you can theme or own.',
              'Доступные React-компоненты с продуманными настройками по умолчанию, явной композицией и CSS-основой на базе токенов, которую можно настраивать темой или хранить в проекте.',
            )}
          </p>
          <FrameworkSupport />
          <div className={styles.actions}>
            <a href={docsPath} className={styles.primary}>
              {t('Get started', 'Начать')}
              <ArrowRight size={18} aria-hidden="true" />
            </a>
            <a href={componentsPath} className={styles.secondary}>
              {t('Components', 'Компоненты')}
              <Component size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className={styles.showcase}>
          <div className={`${styles.panel} ${styles.panelMain}`}>
            <div className={styles.panelHeader}>
              <span />
              <span />
              <span />
            </div>
            <HomeShowcase isRussian={isRussian} />
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
            <span className={styles.sectionEyebrow}>
              {t('Composition in practice', 'Композиция на практике')}
            </span>
            <h2 id="component-table-title">
              {t(
                'A few components, working together.',
                'Несколько компонентов, работающих вместе.',
              )}
            </h2>
            <p>
              {t(
                'Search, selection, menus, and a wide table stay small and composable—ready for a product screen rather than a marketing mockup.',
                'Поиск, выбор, меню и широкая таблица остаются компактными и компонуемыми — готовыми для продуктового экрана, а не маркетингового макета.',
              )}
            </p>
          </div>
          <a href="/docs/data-table" className={styles.tableLink}>
            {t('Explore the table pattern', 'Изучить паттерн таблицы')}
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
        <DataTable />
      </section>
    </main>
  );
}

function HomeShowcase({ isRussian }: { isRussian: boolean }) {
  const t = (english: string, russian: string) => (isRussian ? russian : english);
  const workspaceOptions = getWorkspaceOptions(isRussian);
  const workspaceCollection = createListCollection({ items: workspaceOptions });
  const [automationEnabled, setAutomationEnabled] = useState(true);
  const [progressValue, setProgressValue] = useState(72);
  const [workspaceValue, setWorkspaceValue] = useState<string[]>(['design-system']);

  const workspaceLabel =
    workspaceOptions.find((item) => item.value === workspaceValue[0])?.label ??
    t('Select workspace', 'Выберите пространство');

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
            <Tabs.Trigger value="actions">{t('Actions', 'Действия')}</Tabs.Trigger>
            <Tabs.Trigger value="status">{t('Status', 'Статус')}</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>

          <Tabs.Content value="actions" className={styles.nestedPanel}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span className={styles.eyebrow}>
                  {t('Release controls', 'Управление выпуском')}
                </span>
                <strong>
                  {t('Fast actions with real states', 'Быстрые действия с реальными состояниями')}
                </strong>
              </div>
              <div className={styles.buttonRow}>
                <Button>{t('Publish update', 'Опубликовать обновление')}</Button>
                <Button variant="outline">{t('Preview', 'Предпросмотр')}</Button>
                <Button variant="ghost">{t('Share', 'Поделиться')}</Button>
              </div>
              <div className={styles.miniStats}>
                <div className={styles.metric}>
                  <span>{t('Primary CTA', 'Основной CTA')}</span>
                  <strong>{t('Default variant', 'Вариант по умолчанию')}</strong>
                </div>
                <div className={styles.metric}>
                  <span>{t('Secondary path', 'Вторичный путь')}</span>
                  <strong>{t('Outline and ghost', 'Outline и ghost')}</strong>
                </div>
              </div>
            </div>
          </Tabs.Content>

          <Tabs.Content value="status" className={styles.nestedPanel}>
            <div className={styles.previewCard}>
              <div className={styles.previewHeader}>
                <span className={styles.eyebrow}>{t('Flow health', 'Состояние процесса')}</span>
                <strong>
                  {t(
                    'Toggle and progress in one pass',
                    'Переключатель и прогресс в одном сценарии',
                  )}
                </strong>
              </div>
              <Switch
                checked={automationEnabled}
                onCheckedChange={handleAutomationChange}
                className={styles.switchRow}
              >
                <Switch.Control />
                <Switch.Label>
                  {t('Auto-review before release', 'Автопроверка перед выпуском')}
                </Switch.Label>
              </Switch>
              <ProgressLinear value={progressValue} className={styles.heroProgress}>
                <ProgressLinear.Label>
                  {t('Release readiness', 'Готовность к выпуску')}
                </ProgressLinear.Label>
                <ProgressLinear.ValueText />
                <ProgressLinear.Track>
                  <ProgressLinear.Range />
                </ProgressLinear.Track>
              </ProgressLinear>
              <div className={styles.statusRow}>
                <span>
                  {automationEnabled
                    ? t('Checks enabled', 'Проверки включены')
                    : t('Manual review only', 'Только ручная проверка')}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setProgressValue((value) => Math.min(value + 9, 100))}
                >
                  {t('Advance', 'Продолжить')}
                </Button>
              </div>
            </div>
          </Tabs.Content>
        </Tabs>
      </Tabs.Content>

      <Tabs.Content value="dialog" className={styles.showcasePanel}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.eyebrow}>{t('Approval flow', 'Сценарий согласования')}</span>
            <strong>
              {t('Open the modal directly in the hero', 'Откройте модальное окно прямо в герое')}
            </strong>
          </div>
          <p className={styles.previewText}>
            {t(
              'The preview stays compact, but the interaction is real and uses the shipped dialog API.',
              'Предпросмотр остаётся компактным, но взаимодействие настоящее и использует поставляемый API диалога.',
            )}
          </p>
          <div className={styles.buttonRow}>
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <Button>{t('Review changes', 'Проверить изменения')}</Button>
              </Dialog.Trigger>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content>
                  <Dialog.Header>
                    <Dialog.Title>{t('Publish release?', 'Опубликовать выпуск?')}</Dialog.Title>
                    <Dialog.Description>
                      {t(
                        'Push the updated components and docs to the shared workspace.',
                        'Отправьте обновлённые компоненты и документацию в общее рабочее пространство.',
                      )}
                    </Dialog.Description>
                  </Dialog.Header>
                  <Dialog.Footer>
                    <Dialog.CloseTrigger asChild>
                      <Button variant="outline">{t('Back', 'Назад')}</Button>
                    </Dialog.CloseTrigger>
                    <Dialog.CloseTrigger asChild>
                      <Button>{t('Approve', 'Подтвердить')}</Button>
                    </Dialog.CloseTrigger>
                  </Dialog.Footer>
                </Dialog.Content>
              </Dialog.Positioner>
            </Dialog.Root>
            <Button variant="outline">{t('Inspect API', 'Изучить API')}</Button>
          </div>
          <div className={styles.miniStats}>
            <div className={styles.metric}>
              <span>{t('Focus management', 'Управление фокусом')}</span>
              <strong>{t('Built in', 'Встроено')}</strong>
            </div>
            <div className={styles.metric}>
              <span>{t('Composition', 'Композиция')}</span>
              <strong>{t('Trigger, content, footer', 'Триггер, содержимое, подвал')}</strong>
            </div>
          </div>
        </div>
      </Tabs.Content>

      <Tabs.Content value="select" className={styles.showcasePanel}>
        <div className={styles.previewCard}>
          <div className={styles.previewHeader}>
            <span className={styles.eyebrow}>
              {t('Workspace picker', 'Выбор рабочего пространства')}
            </span>
            <strong>
              {t(
                'Interactive select with current value',
                'Интерактивный Select с текущим значением',
              )}
            </strong>
          </div>
          <div className={styles.heroSelect}>
            <Select
              collection={workspaceCollection}
              value={workspaceValue}
              onValueChange={(details) => setWorkspaceValue(details.value)}
            >
              <Select.Label>{t('Active workspace', 'Активное рабочее пространство')}</Select.Label>
              <Select.Control>
                <Select.Trigger>
                  <Select.ValueText placeholder={t('Select workspace', 'Выберите пространство')} />
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
              <span>{t('Selected', 'Выбрано')}</span>
              <strong>{workspaceLabel}</strong>
            </div>
            <div className={styles.metric}>
              <span>{t('Pattern', 'Паттерн')}</span>
              <strong>{t('Field, trigger, list', 'Поле, триггер, список')}</strong>
            </div>
          </div>
        </div>
      </Tabs.Content>
    </Tabs>
  );
}
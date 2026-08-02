import { useLang, usePages } from '@rspress/core/runtime';
import { Component as ComponentIcon } from 'lucide-react';
import { Card, Cards } from '../mdx/Components';
import styles from './component-gallery.module.css';

const categories = [
  {
    id: 'form-input',
    title: 'Form & Input',
    description: 'Inputs, selection controls, field composition, and form-ready controls.',
    slugs: [
      'checkbox',
      'color-picker',
      'combobox',
      'date-input',
      'date-picker',
      'editable',
      'field',
      'fieldset',
      'file-upload',
      'input',
      'input-group',
      'native-select',
      'number-input',
      'password-input',
      'pin-input',
      'radio-group',
      'rating-group',
      'segment-group',
      'select',
      'signature-pad',
      'slider',
      'switch',
      'tags-input',
      'textarea',
      'toggle',
      'toggle-group',
    ],
  },
  {
    id: 'layout-navigation',
    title: 'Layout & Navigation',
    description: 'Structure product screens, reveal content, and guide people through them.',
    slugs: [
      'accordion',
      'aspect-ratio',
      'bleed',
      'breadcrumbs',
      'container',
      'menu',
      'pagination',
      'scroll-area',
      'separator',
      'sidebar',
      'simple-grid',
      'splitter',
      'stack',
      'steps',
      'tabs',
      'tree-view',
    ],
  },
  {
    id: 'overlays-dialogs',
    title: 'Overlays & Dialogs',
    description: 'Focused surfaces for commands, details, help, and temporary workflows.',
    slugs: [
      'command-palette',
      'dialog',
      'drawer',
      'floating-panel',
      'hover-card',
      'lightbox',
      'popover',
      'tooltip',
      'tour',
    ],
  },
  {
    id: 'feedback-status',
    title: 'Feedback & Status',
    description: 'Communicate progress, empty states, loading, and actionable messages.',
    slugs: [
      'alert',
      'empty',
      'progress-circular',
      'progress-linear',
      'skeleton',
      'spinner',
      'toast',
    ],
  },
  {
    id: 'display-content',
    title: 'Display & Content',
    description: 'Present identity, media, data, keyboard hints, and supporting information.',
    slugs: [
      'avatar',
      'badge',
      'card',
      'heading',
      'highlight',
      'image',
      'image-cropper',
      'kbd',
      'list',
      'listbox',
      'marquee',
      'qr-code',
      'table',
      'tag',
      'text',
      'timer',
      'typeset',
    ],
  },
  {
    id: 'actions-utilities',
    title: 'Actions & Utilities',
    description: 'Small interaction primitives for common product actions and patterns.',
    slugs: [
      'angle-slider',
      'button',
      'carousel',
      'clipboard',
      'close-button',
      'collapsible',
      'split-button',
      'swap',
    ],
  },
] as const;

const russianCategories: Record<string, { title: string; description: string }> = {
  'form-input': {
    title: 'Формы и ввод',
    description: 'Поля ввода, элементы выбора, композиция полей и элементы управления для форм.',
  },
  'layout-navigation': {
    title: 'Макет и навигация',
    description:
      'Структурируйте экраны продукта, открывайте содержимое и направляйте пользователей.',
  },
  'overlays-dialogs': {
    title: 'Оверлеи и диалоги',
    description:
      'Сфокусированные поверхности для команд, подробностей, помощи и временных сценариев.',
  },
  'feedback-status': {
    title: 'Обратная связь и статус',
    description: 'Сообщайте о ходе выполнения, пустых состояниях, загрузке и доступных действиях.',
  },
  'display-content': {
    title: 'Отображение и содержимое',
    description:
      'Представляйте идентификационные данные, медиа, данные, подсказки клавиатуры и дополнительную информацию.',
  },
  'actions-utilities': {
    title: 'Действия и утилиты',
    description:
      'Небольшие примитивы взаимодействия для распространённых действий и паттернов продукта.',
  },
};

const russianDescriptions: Record<string, string> = {
  accordion:
    'Вертикально расположенный набор интерактивных заголовков, каждый из которых открывает раздел содержимого.',
  alert: 'Встроенная обратная связь для сообщений о состоянии, валидации и системы.',
  'angle-slider': 'Круговой элемент управления для выбора угла от 0 до 360 градусов.',
  'aspect-ratio':
    'Ограничивает медиа и встраиваемое содержимое адаптивным контейнером с фиксированным соотношением сторон.',
  avatar:
    'Компактное представление идентичности с загрузкой изображения и fallback-поведением Ark UI.',
  badge: 'Компактная метка статуса для коротких метаданных: состояния, категории и количества.',
  bleed:
    'Примитив макета, позволяющий содержимому намеренно выходить за пределы ограниченного контейнера.',
  breadcrumbs:
    'Семантическая навигация по пути в стиле Ark с явными частями и сокращённой формой узкого пути.',
  button:
    'Стилизованный элемент управления действием, построенный на модели композиции Ark factory.',
  card: 'Компонуемая поверхность для содержимого, относящегося к одной теме.',
  carousel:
    'Постраничная карусель с композицией Ark UI, автопрокруткой, состоянием провайдера и слайдами разного размера.',
  checkbox: 'Компонуемый примитив флажка для самостоятельного и группового выбора.',
  clipboard:
    'Композиция буфера обмена в стиле Ark для отображения, редактирования и копирования строковых значений.',
  'close-button':
    'Кнопка только с иконкой для закрытия оверлеев, уведомлений и других закрываемых поверхностей.',
  collapsible: 'Элемент раскрытия, открывающий и закрывающий одну область содержимого.',
  'color-picker':
    'Составной выбор цвета Ark UI для цветовых полей, элементов управления каналами и образцов.',
  combobox: 'Фильтруемое поле ввода для выбора одного или нескольких значений из коллекции Ark UI.',
  'command-palette':
    'Поверхность команд на базе диалога с поиском Ark Combobox и запуском с клавиатуры.',
  container:
    'Адаптивный примитив макета для единообразной ширины содержимого и гибких горизонтальных отступов.',
  'date-input':
    'Сегментированный ввод даты Ark UI для отдельных дат, диапазонов, редактирования с учётом локали и нативных форм.',
  'date-picker':
    'Выбор даты Ark UI с отдельным встроенным календарём, всплывающим списком, диапазоном и множественным выбором дат.',
  dialog:
    'Модальное окно для сфокусированных сценариев, включая подтверждения в destructive alert dialog.',
  drawer:
    'Доступная панель у края экрана с жестами смахивания, точками привязки и согласованием стека.',
  editable:
    'Встроенное редактирование текста Ark UI с предпросмотром, полем ввода, элементами управления и интеграцией состояния формы.',
  empty:
    'Составная поверхность пустого состояния для отсутствующих результатов, данных и первого запуска.',
  field:
    'Контекст поля Ark UI для меток, вспомогательного текста, ошибок и состояния элемента формы.',
  fieldset:
    'Группируйте связанные элементы управления с семантикой fieldset Ark UI, описаниями, ошибками и общим состоянием.',
  'file-upload':
    'Композиция загрузки файлов Ark UI для выбора, перетаскивания, валидации и предпросмотра файлов.',
  'floating-panel':
    'Немодальное окно Ark UI, которое можно перетаскивать, изменять размер, сворачивать и разворачивать.',
  heading:
    'Семантический примитив заголовка с композицией Ark factory и токенами типографики moduix.',
  highlight:
    'Встроенная подсветка текста для совпадающих поисковых терминов, ключевых слов и отфильтрованных фраз.',
  'hover-card':
    'Композиция hover card Ark UI для дополнительных предпросмотров при наведении или фокусе.',
  image:
    'Адаптивные изображения с поддержкой CDN и атрибутами srcset и sizes, сгенерированными Unpic.',
  'image-cropper':
    'Композиция кадрирования изображений Ark UI для кадрирования и преобразования изображений.',
  input: 'Обёртка поля ввода Ark Field с нативными событиями, семантикой формы и стилями moduix.',
  'input-group':
    'Композиция в стиле Ark для одного поля ввода с встроенными дополнениями, текстом и действиями.',
  kbd: 'Компактное обозначение клавиши для сочетаний клавиатуры и подсказок команд.',
  lightbox:
    'Композиция диалога Ark UI для модальных предпросмотров, сосредоточенных на изображении.',
  list: 'Семантическая обёртка списка с композицией в стиле Ark, токенами интервалов moduix и нативными стилями маркеров.',
  listbox:
    'Композиция listbox Ark UI для видимого одиночного, множественного и расширенного выбора с фильтрацией.',
  marquee: 'Непрерывная прокрутка Ark UI для логотипов, объявлений и повторяющегося содержимого.',
  menu: 'Привязанное к триггеру меню для действий, ссылок, выбора, вложенных команд и контекстных меню.',
  'native-select':
    'Стилизованный нативный select для простых списков вариантов и платформенного выбора.',
  'number-input':
    'Числовое поле ввода с элементами увеличения и уменьшения Ark UI, форматированием, валидацией и необязательным scrub-взаимодействием.',
  pagination: 'Навигация по страницам на основе примитива пагинации Ark UI.',
  'password-input': 'Поле пароля Ark UI с переключателем видимости для защищённого текста.',
  'pin-input': 'Композиция PIN-ввода Ark UI для PIN-кодов и коротких кодов подтверждения.',
  popover:
    'Доступное всплывающее окно Ark UI, привязанное к триггеру или пользовательскому опорному элементу.',
  'progress-circular':
    'Круговой индикатор выполнения для определённого или неопределённого прогресса.',
  'progress-linear':
    'Линейный индикатор выполнения для определённого или неопределённого прогресса.',
  'qr-code':
    'Примитив QR-кода Ark UI с SVG-выводом, оверлеями и поддержкой скачивания изображения.',
  'radio-group': 'Композиция radio group Ark UI для выбора одного значения из видимого набора.',
  'rating-group': 'Элемент управления звёздным рейтингом, построенный на Ark UI rating group.',
  'scroll-area': 'Нативный контейнер прокрутки с пользовательскими полосами прокрутки Ark UI.',
  'segment-group':
    'Композиция segment group Ark UI для выбора одного значения из компактного видимого набора.',
  select:
    'Композиция select Ark UI для выбора одного или нескольких значений из всплывающего списка.',
  separator:
    'Разделяет связанное содержимое или группы доступной горизонтальной или вертикальной линией.',
  sidebar:
    'Навигация приложения с изменяемым размером и сворачиванием, построенная на Ark UI Splitter.',
  'signature-pad': 'Панель подписи Ark UI для рукописного ввода указателем и касанием.',
  'simple-grid':
    'Сетка равных колонок, согласованная с Ark и автоматически адаптирующаяся к доступной ширине.',
  skeleton:
    'Блок-заполнитель на время загрузки для текста, карточек, медиа-объектов и пользовательских макетов.',
  slider: 'Элемент управления для выбора одного значения или диапазона значений.',
  spinner:
    'Компактный индикатор загрузки с семантикой статуса, выбором размера и необязательным пользовательским индикатором.',
  'split-button':
    'Сгруппированное основное действие и триггер выпадающего меню Ark Menu, построенные из частей moduix Button и Menu.',
  splitter: 'Примитив макета с изменяемым размером для разделения интерфейса на панели.',
  stack:
    'Небольшой примитив flex-макета, согласованный с Ark, для вертикальной и горизонтальной композиции.',
  steps: 'Проводите пользователей через многошаговый процесс с состоянием и навигацией Ark UI.',
  swap: 'Анимированно переключает два наложенных визуальных состояния, сохраняя семантику окружающего элемента управления.',
  switch: 'Компонуемый переключатель Ark UI для включения и выключения настройки.',
  table:
    'Нативный примитив таблицы с небольшими удобствами для оболочек ограниченного переполнения, числовых столбцов, подписей и пустых состояний.',
  tabs: 'Набор триггеров вкладок, переключающих связанные панели содержимого на одной странице.',
  tag: 'Компактный токен для выбранных значений, фильтров и назначений с необязательными начальной, конечной и закрывающей частями.',
  'tags-input':
    'Композиция ввода тегов Ark UI для ввода, редактирования, валидации и отправки строковых тегов.',
  text: 'Типографский корень для основного и встроенного текста, дополнительных описаний, семантического выделения и ограниченных предпросмотров.',
  textarea: 'Нативное многострочное поле ввода с интеграцией Field и стилями moduix.',
  timer: 'Секундомер или таймер обратного отсчёта с явными элементами управления Ark.',
  toast: 'Область уведомлений для временных сообщений, действий и контекстной обратной связи.',
  toggle: 'Двухпозиционная кнопка для компактных действий вкл./выкл. и сохранённых состояний.',
  'toggle-group': 'Набор двухпозиционных кнопок с общими выбранными значениями.',
  tooltip: 'Метка, отображающая информацию при наведении или фокусе.',
  tour: 'Пошаговое знакомство с продуктом с состоянием тура Ark UI, доступными частями оверлея и стилизованными действиями.',
  'tree-view':
    'Доступное представление дерева Ark UI для иерархических папок, файлов и вложенных ресурсов.',
  typeset:
    'Ритм чтения на основе CSS для семантического HTML, отрендеренного Markdown и потокового содержимого.',
};

export function ComponentGallery() {
  const isRussian = useLang() === 'ru';
  const { pages } = usePages();
  const components = pages
    .filter(
      (page) =>
        page.routePath.startsWith('/docs/') && typeof page.frontmatter.component === 'string',
    )
    .map((page) => ({
      slug: page.routePath.split('/').filter(Boolean).at(-1) ?? '',
      description: page.description ?? '',
      title: page.title,
      url: page.routePath,
    }))
    .sort((left, right) => left.title.localeCompare(right.title));
  const categorizedSlugs = new Set<string>(categories.flatMap((category) => [...category.slugs]));
  const uncategorized = components.filter((component) => !categorizedSlugs.has(component.slug));

  return (
    <div className={styles.gallery}>
      <p className={styles.summary}>
        {isRussian
          ? `Изучите ${components.length} компонуемых React-компонентов, построенных на Ark UI. Каждая карточка ведёт к руководству по использованию, работающему примеру и команде установки.`
          : `Browse ${components.length} composable React components built on Ark UI. Every card leads to usage guidance, a runnable example, and its install command.`}
      </p>

      {categories.map((category) => {
        const slugs: readonly string[] = category.slugs;
        const items = components.filter((component) => slugs.includes(component.slug));

        return (
          <section key={category.id} aria-labelledby={category.id}>
            <div className={styles.heading}>
              <div>
                <h2 id={category.id}>
                  {isRussian ? russianCategories[category.id].title : category.title}
                </h2>
                <p>
                  {isRussian ? russianCategories[category.id].description : category.description}
                </p>
              </div>
              <span>{items.length}</span>
            </div>
            <Cards>
              {items.map((component) => (
                <Card
                  key={component.slug}
                  description={
                    isRussian
                      ? (russianDescriptions[component.slug] ?? component.description)
                      : component.description
                  }
                  href={component.url}
                  icon={<ComponentIcon />}
                  title={component.title}
                />
              ))}
            </Cards>
          </section>
        );
      })}

      {uncategorized.length > 0 ? (
        <section aria-labelledby="more-components-title">
          <div className={styles.heading}>
            <div>
              <h2 id="more-components-title">
                {isRussian ? 'Другие компоненты' : 'More components'}
              </h2>
              <p>
                {isRussian
                  ? 'Новые компоненты остаются здесь видимыми, пока не получат категорию.'
                  : 'New components remain visible here until they receive a category.'}
              </p>
            </div>
            <span>{uncategorized.length}</span>
          </div>
          <Cards>
            {uncategorized.map((component) => (
              <Card
                key={component.slug}
                description={
                  isRussian
                    ? (russianDescriptions[component.slug] ?? component.description)
                    : component.description
                }
                href={component.url}
                icon={<ComponentIcon />}
                title={component.title}
              />
            ))}
          </Cards>
        </section>
      ) : null}
    </div>
  );
}
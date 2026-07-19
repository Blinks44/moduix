# Конкурентный аудит moduix относительно shadcn/ui

Дата среза: 19 июля 2026 года  
Локальный проект: moduix monorepo  
Эталон: публичный сайт и ветка `main` shadcn/ui, commit `d28738b183c5eaa69d8d540826e450f30d39ab6c`

## Статус выполнения

Аудит сохраняет исходный срез и рекомендации. Выполненные пункты не удаляются: их статус и
проверка фиксируются здесь.

| Дорожная карта | Инициатива                                     | Статус             | Завершено    | Результат                                                                                                                                                                                                                                                                    |
| -------------- | ---------------------------------------------- | ------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0             | Curated/generated `llms.txt` + canonical `.md` | ✅ Выполнено       | 19 июля 2026 | Группы `llms.txt` используют `apps/docs/content/docs/meta.json`; все компоненты добавляются автоматически; `/docs/<slug>.md` — единственный Markdown URL; legacy `/llms.mdx/docs/...` удалён; ссылка `llms.txt` видна в sidebar. `npm run build:docs` прошла.                |
| P0             | Hosted React registry namespace                | 🟡 Готово к deploy | —            | GitHub Registry и custom build script удалены. `shadcn build` напрямую создаёт public JSON из `registry/registry.json` в `apps/docs/public/r/react`; локально пройдены schema, dependency и docs-build проверки. Перед закрытием нужен smoke на опубликованном `moduix.dev`. |

## 1. Краткий вывод

moduix уже конкурентоспособен как **техническая библиотека компонентов**: в нём 82 компонентных
семейства, полный комплект публичных страниц, локальная документация, Storybook stories,
shadcn-совместимый registry и сильный Ark-first контракт. По глубине форм, сложных контролов,
коллекций и явной композиции moduix местами сильнее shadcn/ui.

Но shadcn сегодня конкурирует не только компонентами. Это цельная платформа:

- визуальный конструктор дизайн-системы и переносимые presets;
- blocks и templates, решающие пользовательские задачи целиком;
- CLI с init, add, apply, diff, docs, info, migrate, preset, search, view и MCP;
- curated registry и каталог сторонних registry;
- отдельные AI skills, MCP и LLM-friendly страницы;
- сильная продуктовая витрина, changelog, migration narrative, Figma и social proof.

Поэтому главная проблема moduix — **не нехватка базовых компонентов**, а разрыв между хорошим
набором primitives и готовым пользовательским результатом. Сейчас пользователь может собрать
практически всё, но shadcn быстрее доводит его от «я выбираю библиотеку» до «у меня уже есть экран
продукта».

Главная стратегическая рекомендация:

> Не пытаться стать ещё одним shadcn с другим CSS. Позиционировать moduix как Ark-first,
> native-CSS и package-or-copy платформу, а конкурентный разрыв закрывать в порядке:
> discoverability → registry/AI → blocks → presets → trust/quality → ecosystem.

### Итоговая оценка

Оценки ниже — продуктовая эвристика от 1 до 5, а не формальный benchmark.

| Область                          | moduix | shadcn/ui | Вывод                                                                        |
| -------------------------------- | -----: | --------: | ---------------------------------------------------------------------------- |
| Покрытие базовых компонентов     |    4.5 |       4.0 | У moduix больше компонентных семейств и сложных контролов.                   |
| Глубина component docs           |    4.5 |       4.5 | moduix системнее в anatomy/Ark-контрактах; shadcn проще для быстрого старта. |
| Готовые blocks и product recipes |    1.0 |       5.0 | Главный функциональный разрыв.                                               |
| Установка и project bootstrap    |    2.5 |       5.0 | Два режима moduix полезны, но onboarding и namespace заметно сложнее.        |
| Темизация и визуальная настройка |    2.5 |       5.0 | Токены сильные, но нет визуального builder и переносимых presets.            |
| AI/LLM readiness                 |    3.0 |       5.0 | База уже есть, но нет skill, MCP onboarding и AI actions на странице.        |
| Registry ecosystem               |    2.0 |       5.0 | Формат совместим, но нет hosted namespace, directory и item discovery.       |
| Проверяемое качество             |    2.5 |       4.5 | Stories и CI есть; unit/integration/a11y/visual tests не обнаружены.         |
| Changelog и migrations           |    2.0 |       5.0 | Changesets есть внутри, но публичной истории продукта практически нет.       |
| SEO, доверие и community         |    1.5 |       5.0 | Нужны sitemap/robots/OG, showcase, support policy и social proof.            |

## 2. Методика и границы аудита

Проверено:

- `packages/react/src/components`, public exports, styles и package metadata;
- все component-local markdown и публичные MDX-страницы;
- `registry.json` и сгенерированный registry;
- landing, navigation, search, Markdown и LLM routes;
- CI workflows, changesets, наличие test surfaces;
- официальный `llms.txt`, публичные страницы и GitHub tree shadcn/ui;
- текущие CLI, blocks, presets, MCP, Skills, registry и changelog shadcn.

Это source/docs/product audit. Pixel-perfect визуальное сравнение в браузере и ручной
keyboard/screen-reader прогон каждого компонента в этот документ не входят.

Основные внешние источники:

- [shadcn/ui llms.txt](https://ui.shadcn.com/llms.txt)
- [shadcn/ui GitHub](https://github.com/shadcn-ui/ui)
- [зафиксированный commit shadcn/ui](https://github.com/shadcn-ui/ui/tree/d28738b183c5eaa69d8d540826e450f30d39ab6c)
- [CLI](https://ui.shadcn.com/docs/cli)
- [Installation](https://ui.shadcn.com/docs/installation)
- [Blocks](https://ui.shadcn.com/blocks)
- [MCP](https://ui.shadcn.com/docs/mcp)
- [Skills](https://ui.shadcn.com/docs/skills)
- [Registry](https://ui.shadcn.com/docs/registry)
- [Registry Directory](https://ui.shadcn.com/docs/directory)
- [Changelog](https://ui.shadcn.com/docs/changelog)
- [Base UI as default, July 2026](https://ui.shadcn.com/docs/changelog/2026-07-base-ui-default)

## 3. Фактический срез

### moduix

| Метрика                                                          | Значение |
| ---------------------------------------------------------------- | -------: |
| Компонентных директорий                                          |       82 |
| Компонентных MDX-страниц                                         | 82 из 82 |
| Локальных component markdown                                     | 82 из 82 |
| Компонентов с registry item                                      | 82 из 82 |
| Публичных top-level MDX-страниц                                  |       99 |
| Видимых snippet includes на component pages                      |      748 |
| Component pages с API / Basic / Anatomy / Composition / Examples | 82 из 82 |
| Component pages с Install with shadcn                            | 82 из 82 |
| Component pages с Anatomy table                                  | 82 из 82 |
| Story files                                                      |      160 |
| Unit/spec files вне stories                                      |        0 |
| Changeset markdown files в текущем checkout                      |       68 |
| Registry items                                                   |       85 |
| Registry blocks/themes/templates/skills                          |        0 |

Сильный факт: документация moduix структурно очень ровная. Автоматическая проверка не нашла
компонентных страниц с нарушением обязательной последовательности разделов или отсутствующей
таблицей anatomy.

### shadcn/ui

На зафиксированном commit GitHub tree содержит:

| Метрика                                 |                                            Значение |
| --------------------------------------- | --------------------------------------------------: |
| Entries / files в repository tree       |                                         6321 / 5642 |
| MDX docs pages в `apps/v4/content/docs` |                                                 303 |
| Changelog MDX                           |                                                  51 |
| UI-файлы в Base/Radix registry          |                                               по 60 |
| UI-файлы в Aria registry tree           |                                                  57 |
| Blocks на primitive branch              | 30 пользовательских block names плюс registry index |
| Examples на Base/Radix branch           |                                               по 64 |
| CLI commands, обнаруженные в source     |                                                  15 |
| AI skill/rule/eval files                |                                                  22 |
| Project templates                       |                                                  10 |
| Files, совпавшие с test/spec patterns   |                                                 509 |
| Публичные theme JSON                    |                                                   5 |

Публичный `llms.txt` содержит 163 строки и 111 описанных ссылок. В component section
перечислено 59 пользовательских component/pattern pages.

Важно: repository `main` уже содержит дополнительные chat/AI-oriented UI-файлы
(`attachment`, `bubble`, `marker`, `message`, `message-scroller`), которых ещё нет в
публичном component index `llms.txt`. Поэтому published surface и source-head следует считать
разными срезами.

### Рыночный контекст

Это не сравнение качества кода, а оценка накопленного distribution moat на дату аудита:

| Сигнал                                 |               shadcn/ui |                  moduix |
| -------------------------------------- | ----------------------: | ----------------------: |
| GitHub stars                           |                 119 285 |                       1 |
| GitHub forks                           |                   9 450 |                       0 |
| npm downloads за 2026-06-19…2026-07-18 | 23 114 284 для `shadcn` | 285 для `@moduix/react` |

Источники: [GitHub shadcn/ui API](https://api.github.com/repos/shadcn-ui/ui),
[GitHub moduix API](https://api.github.com/repos/Blinks44/moduix),
[npm shadcn downloads](https://api.npmjs.org/downloads/point/last-month/shadcn),
[npm moduix downloads](https://api.npmjs.org/downloads/point/last-month/%40moduix%2Freact).

Следствие: выиграть «ещё одной таблицей компонентов» невозможно. Нужен более узкий и ясный reason
to switch, затем distribution loops, которые превращают документацию, blocks, registry и AI в
повторяемое привлечение пользователей.

## 4. Что уже лучше или потенциально сильнее в moduix

### 4.1. Два режима владения

moduix позволяет:

1. установить `@moduix/react` и получать package-managed updates;
2. установить source через shadcn registry и владеть кодом локально.

Это реальное преимущество над исключительно copy-owned ожиданием многих пользователей shadcn.
Один и тот же дизайн-контракт можно предложить командам с разной governance-моделью.

### 4.2. Ark-first композиция

moduix сохраняет parts, detail callbacks, refs, controlled/uncontrolled behavior, context hooks,
`RootProvider`, `asChild`, form participation и state attributes. Для сложных продуктовых
интерфейсов это понятнее и надёжнее, чем набор локальных wrappers с разной глубиной абстракции.

### 4.3. Native CSS без обязательного Tailwind

У moduix есть:

- CSS custom properties;
- cascade layers;
- CSS Modules-friendly hooks;
- стабильные `data-slot`;
- package и copy-owned CSS entrypoints;
- отсутствие обязательного styling runtime/framework.

Это сильное позиционирование для команд, которым нравится ownership-модель shadcn, но не нравится
Tailwind как обязательная часть контракта.

### 4.4. Более широкий набор сложных контролов

Семейства, которых нет в стандартном публичном component index shadcn:

- Angle Slider;
- Clipboard;
- Color Picker;
- Date Input;
- Editable;
- Fieldset;
- File Upload;
- Floating Panel;
- Image Cropper;
- Lightbox;
- Listbox;
- Number Input;
- Password Input;
- QR Code;
- Rating Group;
- Segment Group;
- Signature Pad;
- Split Button;
- Steps;
- Swap;
- Tags Input;
- Timer;
- Tour;
- Tree View.

Также есть отдельные layout/media primitives: Bleed, Container, Heading, Highlight, Image, List,
Marquee, Simple Grid, Stack и Text.

### 4.5. Системная component documentation

Каждый компонент имеет:

- API reference;
- basic path;
- shadcn install command;
- anatomy и part roles;
- composition contract;
- examples;
- styling contract.

В shadcn быстрее увидеть простое применение. В moduix легче понять сложную композицию и границы
Ark behavior. Это следует сохранить как отличительную черту.

### 4.6. Формы и native behavior

Документация moduix хорошо объясняет native submission, reset, autofill, invalid focus, detail
objects, Field/Fieldset context и integrations с React Hook Form, TanStack Form и Formisch.
Это одна из наиболее сильных зон библиотеки и хороший кандидат для отдельного marketing narrative.

## 5. Полная матрица публичных компонентов shadcn

Статусы:

- **Есть** — прямой публичный аналог.
- **Эквивалент** — та же пользовательская задача закрыта другим именем или частью.
- **Частично** — поведение можно собрать, но discovery или ergonomics хуже.
- **Нет** — заметный самостоятельный gap.

### Form & Input

| shadcn        | moduix                         | Статус                  | Решение                                                              |
| ------------- | ------------------------------ | ----------------------- | -------------------------------------------------------------------- |
| Field         | Field                          | Есть                    | Сохранить более глубокий Ark/form contract.                          |
| Button        | Button                         | Есть                    | Без действий.                                                        |
| Button Group  | SplitButton / Stack            | Нет как общий primitive | Добавить небольшой `ButtonGroup`, если API останется композиционным. |
| Input         | Input                          | Есть                    | Без действий.                                                        |
| Input Group   | InputGroup                     | Есть                    | Без действий.                                                        |
| Input OTP     | PinInput                       | Эквивалент              | Добавить migration/discovery alias только в docs/search, не в API.   |
| Textarea      | Textarea                       | Есть                    | Без действий.                                                        |
| Checkbox      | Checkbox                       | Есть                    | Без действий.                                                        |
| Radio Group   | RadioGroup                     | Есть                    | Без действий.                                                        |
| Select        | Select                         | Есть                    | Без действий.                                                        |
| Native Select | NativeSelect                   | Есть                    | Без действий.                                                        |
| Switch        | Switch                         | Есть                    | Без действий.                                                        |
| Slider        | Slider                         | Есть                    | Дополнительно продвигать AngleSlider.                                |
| Calendar      | Calendar внутри DatePicker     | Частично                | Выделить standalone calendar recipe или public composition.          |
| Date Picker   | DatePicker                     | Есть                    | moduix функционально глубже.                                         |
| Combobox      | Combobox                       | Есть                    | Без действий.                                                        |
| Label         | Field.Label и component labels | Частично                | Общий Label нужен только при доказанном использовании вне Field.     |

### Layout & Navigation

| shadcn          | moduix      | Статус     | Решение                                         |
| --------------- | ----------- | ---------- | ----------------------------------------------- |
| Accordion       | Accordion   | Есть       | Без действий.                                   |
| Breadcrumb      | Breadcrumbs | Эквивалент | Улучшить search keywords.                       |
| Navigation Menu | —           | Нет        | Высокий приоритет для marketing/app navigation. |
| Sidebar         | Sidebar     | Есть       | Сильный кандидат для blocks.                    |
| Tabs            | Tabs        | Есть       | Без действий.                                   |
| Separator       | Separator   | Есть       | Без действий.                                   |
| Scroll Area     | ScrollArea  | Есть       | Без действий.                                   |
| Resizable       | Splitter    | Эквивалент | Добавить migration/discovery wording.           |

### Overlays & Dialogs

| shadcn        | moduix                      | Статус                           | Решение                                                                |
| ------------- | --------------------------- | -------------------------------- | ---------------------------------------------------------------------- |
| Dialog        | Dialog                      | Есть                             | Без действий.                                                          |
| Alert Dialog  | `Dialog role="alertdialog"` | Эквивалент, плохо обнаруживается | Добавить dedicated recipe/page; не обязательно новый alias-компонент.  |
| Sheet         | Drawer                      | Частично/эквивалент              | Объяснить выбор Drawer vs edge Dialog; не копировать Sheet ради имени. |
| Drawer        | Drawer                      | Есть                             | moduix имеет swipe/snap behavior.                                      |
| Popover       | Popover                     | Есть                             | Без действий.                                                          |
| Tooltip       | Tooltip                     | Есть                             | Без действий.                                                          |
| Hover Card    | HoverCard                   | Есть                             | Без действий.                                                          |
| Context Menu  | `Menu.ContextTrigger`       | Эквивалент                       | Добавить отдельный recipe и search synonym.                            |
| Dropdown Menu | Menu                        | Эквивалент                       | Добавить migration mapping.                                            |
| Menubar       | —                           | Нет                              | Добавить после Navigation Menu, если подтверждён desktop-app спрос.    |
| Command       | CommandPalette              | Эквивалент                       | Сильнее показать standalone и dialog patterns.                         |

### Feedback & Status

| shadcn   | moduix                            | Статус       | Решение                                                      |
| -------- | --------------------------------- | ------------ | ------------------------------------------------------------ |
| Alert    | Alert                             | Есть         | Без действий.                                                |
| Toast    | Toast                             | Есть         | Без действий.                                                |
| Sonner   | Toast                             | Эквивалент   | Не добавлять отдельную facade без реального DX-преимущества. |
| Progress | ProgressLinear / ProgressCircular | Есть, глубже | Продвигать как преимущество.                                 |
| Spinner  | Spinner                           | Есть         | Без действий.                                                |
| Skeleton | Skeleton                          | Есть         | Без действий.                                                |
| Badge    | Badge                             | Есть         | Без действий.                                                |
| Empty    | Empty                             | Есть         | Использовать в blocks.                                       |

### Display & Media

| shadcn       | moduix                      | Статус               | Решение                                                              |
| ------------ | --------------------------- | -------------------- | -------------------------------------------------------------------- |
| Avatar       | Avatar                      | Есть                 | Без действий.                                                        |
| Card         | Card                        | Есть                 | Без действий.                                                        |
| Table        | Table                       | Есть                 | Без действий.                                                        |
| Data Table   | Table + Data Table guide    | Частично как pattern | Превратить лучшие варианты в registry blocks.                        |
| Chart        | —                           | Нет                  | Самый заметный component gap для dashboards.                         |
| Carousel     | Carousel                    | Есть                 | Без действий.                                                        |
| Aspect Ratio | AspectRatio                 | Есть                 | Без действий.                                                        |
| Typography   | Heading / Text / List / Kbd | Эквивалент           | Сделать общую typography landing/recipe.                             |
| Item         | List и локальные item parts | Частично             | Нужен нейтральный Item только если он упростит blocks и settings UI. |
| Kbd          | Kbd                         | Есть                 | Без действий.                                                        |

### Misc

| shadcn       | moduix                                | Статус   | Решение                                                                  |
| ------------ | ------------------------------------- | -------- | ------------------------------------------------------------------------ |
| Collapsible  | Collapsible                           | Есть     | Без действий.                                                            |
| Toggle       | Toggle                                | Есть     | Без действий.                                                            |
| Toggle Group | ToggleGroup                           | Есть     | Без действий.                                                            |
| Pagination   | Pagination                            | Есть     | Без действий.                                                            |
| Direction    | Ark LocaleProvider описан как utility | Частично | Нужен публичный RTL guide и стабильный moduix-owned entrypoint/contract. |

### Реальный component backlog

Если не считать уже существующие эквиваленты, краткий high-value backlog:

1. Chart.
2. Navigation Menu.
3. Button Group.
4. Standalone Calendar composition.
5. Generic Item, если он уменьшает повторение в blocks.
6. Menubar для desktop/admin use cases.
7. Публичный Direction/RTL contract.

Отдельные `AlertDialog`, `ContextMenu`, `DropdownMenu`, `Sheet` и `Sonner` не должны
появляться только ради совпадения названий. Для них разумнее docs recipes, search synonyms и
migration mapping поверх существующих Ark-shaped компонентов.

## 6. Что нравится пользователю в shadcn и чего не хватает moduix

### 6.1. Быстрое доверие

В shadcn пользователь за минуты видит:

- polished showcase;
- реальные blocks;
- live previews и source files;
- широкую поддержку framework и primitive bases;
- changelog;
- Figma;
- registry directory;
- integrations с v0 и AI tools.

В moduix landing уже показывает живые компоненты и data table, но почти не отвечает на вопросы:

- кто использует библиотеку;
- насколько она стабильна;
- как часто выпускаются версии;
- какие браузеры и React versions поддерживаются;
- как обновлять copy-owned код;
- есть ли accessibility test policy;
- можно ли начать не с primitive, а с готового экрана.

### 6.2. Путь «нашёл → примерил → установил»

shadcn сокращает путь:

1. открыть component или block;
2. увидеть preview;
3. посмотреть файлы;
4. скопировать команду;
5. открыть в v0/AI;
6. получить code-owned результат.

moduix чаще ведёт:

1. открыть документацию;
2. найти компонент в длинном sidebar;
3. прочитать подробный contract;
4. вручную выбрать package или GitHub registry path;
5. отдельно настроить aliases и CSS foundation;
6. самостоятельно собрать экран.

Документация moduix глубже, но первый результат требует больше решений.

### 6.3. Blocks вместо primitives

Shadcn blocks дают результат в терминах пользователя: login, signup, dashboard, sidebar layout.
В repository branch есть около 30 таких block names на каждую primitive family.

У moduix уже достаточно primitives, чтобы сделать качественные blocks, но registry не содержит ни
одного `registry:block`. Это самый большой продуктовый gap.

### 6.4. Визуальная настройка вместо чтения token reference

У moduix 3200 public variables в `theme.css`. Это мощно, но когнитивно тяжело.

Shadcn предлагает visual create flow: primitive base, style, theme, base color, chart color, font,
icon library, radius, preview, shareable preset. Пользователь принимает визуальные решения на
результате, а не редактирует тысячи переменных вслепую.

### 6.5. Уверенность в обновлениях

Shadcn CLI даёт `--dry-run`, `--diff`, `--view`, `docs`, `info`, `migrate`,
`preset` и `eject`. Публичный changelog объясняет не только что изменилось, но и почему.

moduix говорит повторно выполнить shadcn add и вручную merge diff. Это честно, но недостаточно
удобно и не создаёт ощущение управляемого lifecycle.

## 7. Как shadcn делает LLM-разводку

### 7.1. Curated `llms.txt`

Файл хранится статически в
[`apps/v4/public/llms.txt`](https://github.com/shadcn-ui/ui/blob/d28738b183c5eaa69d8d540826e450f30d39ab6c/apps/v4/public/llms.txt).

Это не просто dump sidebar. В нём:

- короткое позиционирование продукта;
- Overview;
- Installation по framework;
- Components, разбитые по пользовательским категориям;
- Dark Mode;
- RTL;
- Forms;
- Advanced;
- MCP;
- Registry и schemas;
- у каждой ссылки есть объясняющее предложение.

Плюс curated-подхода: LLM сразу понимает продукт и выбирает релевантную страницу. Минус:
ручной index может отставать от repository head — это уже видно по новым chat-oriented файлам.

### 7.2. Markdown URL для каждой docs page

В
[`next.config.mjs`](https://github.com/shadcn-ui/ui/blob/d28738b183c5eaa69d8d540826e450f30d39ab6c/apps/v4/next.config.mjs)
rewrite направляет `/docs/:path*.md` в `/llm/:path*`.

Route
[`app/(app)/llm/[[...slug]]/route.ts`](<https://github.com/shadcn-ui/ui/blob/d28738b183c5eaa69d8d540826e450f30d39ab6c/apps/v4/app/(app)/llm/%5B%5B...slug%5D%5D/route.ts>):

1. находит страницу через Fumadocs source;
2. читает raw MDX;
3. определяет primitive/style variant из slug;
4. пропускает content через LLM processor;
5. возвращает `text/markdown; charset=utf-8`;
6. статически генерируется и не revalidate-ится во время runtime.

### 7.3. Превращение preview в реальный код

[`lib/llm.ts`](https://github.com/shadcn-ui/ui/blob/d28738b183c5eaa69d8d540826e450f30d39ab6c/apps/v4/lib/llm.ts)
делает важную работу:

- заменяет dynamic component lists на Markdown links;
- находит `ComponentPreview`;
- получает demo или registry source;
- вставляет исходник в TSX code fence;
- переписывает внутренние registry imports в consumer paths;
- нормализует default exports.

Именно поэтому Markdown page полезна агенту: она содержит не MDX chrome, а код, который пользователь
может применить.

### 7.4. AI actions прямо в docs UI

[`DocsCopyPage`](https://github.com/shadcn-ui/ui/blob/d28738b183c5eaa69d8d540826e450f30d39ab6c/apps/v4/components/docs-copy-page.tsx)
даёт:

- Copy Page;
- View as Markdown;
- Open in v0;
- Open in ChatGPT;
- Open in Claude;
- Open in Scira.

Prompt передаёт URL текущей документации и просит AI объяснять, давать примеры или помогать с
debugging.

### 7.5. SEO и static docs

Docs page:

- статически генерируется;
- имеет title/description;
- Open Graph image;
- Twitter card;
- previous/next navigation;
- right-side TOC и Open in v0 CTA.

Исходник:
[`docs/[[...slug]]/page.tsx`](<https://github.com/shadcn-ui/ui/blob/d28738b183c5eaa69d8d540826e450f30d39ab6c/apps/v4/app/(app)/docs/%5B%5B...slug%5D%5D/page.tsx>).

### 7.6. Чего у shadcn нет

`https://ui.shadcn.com/llms-full.txt` на дату аудита возвращает 404. Поэтому moduix не следует
удалять собственный full corpus только ради совпадения.

## 8. Текущее LLM-состояние moduix

У moduix уже есть хорошая основа:

- `/llms.txt` через `llms(source).index()`;
- `/llms-full.txt`, объединяющий все processed pages;
- `/docs/<slug>.md`;
- legacy/alternative `/llms.mdx/docs/$`;
- Copy Markdown;
- Open Markdown;
- processed Markdown через Fumadocs;
- описание и canonical URL на HTML-странице.

Это сильнее, чем кажется на первом взгляде. Нужна не новая система с нуля, а productization.

### Проблемы

1. `llms.txt` генерируется из page tree и не содержит такого же curated positioning/category
   contract, как shadcn.
2. Нет явного CI-теста, что каждая ссылка из index отвечает и каждая публичная component page
   представлена.
3. Не проверено отдельным contract test, что `Preview`, `Preview.Code`, CSS и custom MDX
   превращаются в чистый, самодостаточный Markdown.
4. Одновременно существуют `/docs/*.md` и `/llms.mdx/docs/$`, что усложняет публичный contract.
5. Нет cache headers/ETag policy.
6. AI actions ограничены copy/open Markdown.
7. Нет публичного moduix Skill и onboarding для shadcn MCP.
8. `llms-full.txt` полезен, но потенциально слишком велик для прямой загрузки в контекст без
   guidance по выбору per-page Markdown.

### Рекомендуемая архитектура

#### A. Curated index, generated from typed metadata

Сохранить автоматизацию, но завести typed catalog с полями:

- title;
- description;
- category;
- aliases;
- component/pattern/guide/registry kind;
- recommended vs advanced;
- Markdown URL;
- registry item name.

Из одного catalog генерировать:

- docs navigation;
- `llms.txt`;
- component gallery;
- registry discovery metadata;
- search synonyms;
- sitemap entries.

Так index будет curated, но не начнёт отставать вручную.

#### B. Один canonical per-page Markdown URL

Оставить `/docs/<slug>.md` canonical. Старый `/llms.mdx/docs/$` превратить в permanent redirect
или удалить после migration window.

#### C. LLM processor contract

Добавить snapshot tests, которые гарантируют:

- preview заменён на полный consumer-facing TSX;
- internal imports отсутствуют;
- install command сохранён;
- headings и code fences валидны;
- CSS snippet не потерян;
- ссылки абсолютные;
- dynamic collections/examples раскрыты в коде.

#### D. AI action menu

Добавить рядом с Copy Markdown:

- Copy Page;
- View as Markdown;
- Ask ChatGPT;
- Ask Claude;
- Copy install command;
- Copy prompt with package/registry choice.

Open in v0 следует добавлять только если generated code действительно совместим и интеграция
даёт рабочий результат, а не ради визуального совпадения с shadcn.

#### E. Public AI guide

Новая страница `/docs/ai`:

- как использовать `llms.txt`;
- когда брать `llms-full.txt`;
- как открыть `.md` конкретного компонента;
- как настроить shadcn MCP для moduix registry;
- примеры prompts;
- ownership и review policy для generated code.

#### F. Public moduix Skill

У проекта уже есть качественные внутренние skills. Их consumer-safe subset можно превратить в
installable skill, который:

- определяет npm vs copy-owned mode;
- читает `components.json`;
- знает Ark-shaped composition;
- ищет docs/registry item до генерации;
- не создаёт shadcn aliases, нарушающие moduix contract;
- умеет строить blocks из moduix components;
- запускает consumer validation.

## 9. Registry и установка

### Текущее состояние

- Единственный public registry — hosted React namespace:
  `@moduix-react/<component>` → `https://moduix.dev/r/react/<component>.json`.
- Исходный manifest находится в `registry/registry.json`; его нельзя использовать как GitHub Registry,
  потому что в корне репозитория больше нет `registry.json`.
- `npm run build:registry` напрямую выполняет `shadcn build` из manifest в flat hosted catalog и item
  files в `apps/docs/public/r/react`; custom post-processing отсутствует.
- Все 85 items, их files и dependencies локально проверены; старых GitHub адресов в public JSON нет.
- README, package README, Quick Start и component install commands используют только
  `@moduix-react/*`.

### Ревью реализации, 19 июля 2026

| Проверка                    | Результат                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Hosted schema и flat layout | ✅ `registry.json` и 85 item JSON валидны; assets входят в TanStack Start build.                                               |
| Namespaced dependencies     | ✅ Все `@moduix-react/*` dependencies указывают на существующие public items.                                                  |
| Удаление GitHub Registry    | ✅ Корневой manifest и `packages/react/registry/default` удалены; GitHub install commands отсутствуют в пользовательских docs. |
| Standard shadcn build       | ✅ Нет custom script: source и public item names совпадают, `shadcn build` пишет JSON напрямую в hosted directory.             |
| Consumer docs и CI          | ✅ URL template добавлен в `components.json` examples; CI проверяет только hosted artifacts.                                   |
| Published smoke             | ⏳ После deploy нужно выполнить `list`, `view` и `add @moduix-react/button` против `https://moduix.dev`.                       |

Вердикт: реализация готова к deployment, но не должна быть отмечена выполненной до успешного smoke
на опубликованном URL. Отдельная подача в shadcn Registry Directory — следующий шаг, а не условие
работы hosted registry.

### Рекомендации

1. После deployment проверить hosted React index:
   `https://moduix.dev/r/react/registry.json` и `https://moduix.dev/r/react/{name}.json`.
2. Public namespace готов:
   `@moduix-react/button`, `@moduix-react/dialog`; будущие Vue, Solid и Svelte получат отдельные
   namespace.
3. Подать registry в [shadcn Registry Directory](https://ui.shadcn.com/docs/directory).
4. Документировать стандартные shadcn operations:
   `list`, `search`, `view`, `add --dry-run`, `add --diff`.
5. Добавить registry root item categories:
   `registry:ui`, `registry:block`, `registry:theme`, `registry:style`,
   `registry:page`, `registry:hook`, `registry:lib`.
6. Добавить contract check для namespace URLs, dependencies и consumer install smoke test.
7. Не документировать GitHub install: исходный `registry/registry.json` остаётся внутренним манифестом
   генерации hosted registry.

### Не делать пока

Не следует сразу писать полный fork shadcn CLI. Сначала можно получить 70–80% пользовательской
ценности через:

- корректный hosted registry;
- presets как registry items;
- shadcn MCP;
- стандартные `view/search/diff/dry-run`;
- маленький `create-moduix` только для setup, если метрики покажут необходимость.

## 10. Blocks, recipes и templates

### Почему это приоритет №1 после discoverability

Компонент решает локальную задачу. Block решает намерение:

- «сделать login»;
- «показать dashboard»;
- «добавить настройки аккаунта»;
- «собрать CRUD table»;
- «сделать sidebar shell»;
- «создать onboarding».

Blocks одновременно:

- демонстрируют качество нескольких компонентов;
- учат композиции;
- улучшают SEO;
- становятся AI training/reference surface;
- увеличивают registry usage;
- сокращают time-to-value.

### MVP: первые 12–15 blocks

#### Authentication

1. Login simple.
2. Login with image/brand.
3. Signup.
4. Forgot/reset password.
5. Verification/PIN flow.

#### Application shell

6. Sidebar dashboard shell.
7. Header + account menu + notifications.
8. Mobile drawer navigation.

#### Data workflows

9. Sort/filter/paginate data table.
10. Data table with selection and bulk actions.
11. Empty/loading/error states.
12. File upload manager.

#### Settings/forms

13. Profile settings form.
14. Team/member settings.
15. Multi-step onboarding.

Каждый block должен иметь:

- live preview;
- responsive states;
- keyboard and form behavior notes;
- file tree;
- install command;
- source view;
- npm и copy-owned variants, если они различаются;
- clean Markdown/LLM representation;
- registry dependencies;
- visual regression snapshot.

### Следующий слой templates

После проверки blocks:

- admin/dashboard starter;
- SaaS settings starter;
- content/media manager;
- checkout/account flow;
- design-system playground.

Templates не должны появляться раньше стабильных blocks: иначе поддержка дублированного code
surface станет слишком дорогой.

## 11. Темы, presets и визуальная идентичность

### Текущее состояние

Плюсы:

- semantic colors;
- spacing, radius, sizing, typography, motion, shadow и z-index;
- CSS variables;
- dark selectors в color foundation;
- framework-neutral styling.

Минусы:

- тысячи variables без guided entry point;
- нет preview matrix;
- нет named styles;
- нет theme sharing;
- нет preset diff/apply;
- нет chart colors, пока нет Chart;
- нет понятного «измените эти 20 variables, остальное наследуется».

### Рекомендуемая модель

Разделить contract на три уровня:

1. **Core semantic tokens** — 20–40 variables, с которых начинает пользователь.
2. **Component aliases** — derived defaults, обычно не меняются вручную.
3. **Expert overrides** — полный текущий contract.

### Первые presets

Не копировать названия shadcn. Сделать 3–5 собственных направлений, отражающих позиционирование:

- Calm — текущая база;
- Dense — admin/data-heavy UI;
- Soft — consumer/product UI;
- Contrast — high-clarity/accessibility-oriented;
- Mono — technical/developer tools.

Preset должен включать:

- semantic colors light/dark;
- radius;
- density/spacing;
- typography/font stack;
- shadows;
- motion profile;
- optional component defaults;
- shareable short code или JSON;
- registry item.

### Visual builder MVP

Первый builder не обязан переписывать component source. Достаточно:

- выбрать preset;
- менять core tokens;
- показывать 10–12 representative components;
- переключать light/dark, mobile/desktop, density;
- копировать CSS;
- получать registry/install command;
- сохранять shareable URL.

## 12. Документация и информационная архитектура

### Что уже хорошо

- 100% component page coverage;
- единая структура;
- хороший advanced path;
- search endpoint;
- Markdown endpoint;
- installation на каждой странице;
- GitHub links;
- сильные guides по forms, collections, styling и data table.

### Что нужно добавить

#### Верхний уровень

- Components gallery с preview cards, filters и search.
- Blocks.
- Themes/Create.
- Guides.
- Registry.
- AI.
- Changelog.
- Migration.
- Community/Directory.

#### Guide gaps

- Dark mode как отдельный end-to-end guide.
- RTL с реальными component examples и logical properties policy.
- Framework setup: Next.js, Vite, React Router, TanStack Start, Remix/Astro при поддержке.
- SSR/hydration.
- Browser and React support matrix.
- Accessibility policy.
- Testing installed source.
- Updating npm и copy-owned components.
- Migration from shadcn.
- Migration between major moduix versions.
- Performance/bundle-size guidance.

#### Component discovery

Sidebar со списком из 82 имён недостаточен. Нужны категории:

- Form controls;
- Selection and collections;
- Navigation;
- Overlays;
- Feedback;
- Data display;
- Media;
- Layout;
- Advanced/product controls.

Добавить aliases в search: Input OTP → Pin Input, Dropdown Menu → Menu, Resizable → Splitter,
Alert Dialog → Dialog role alertdialog и т. п.

### Landing page

Сохранить текущий interactive showcase, но добавить:

- одно чёткое positioning sentence;
- package vs copy-owned choice;
- component/block counts;
- 6–8 flagship components;
- blocks preview;
- native CSS / Ark / no Tailwind explanation;
- install command;
- support/status/changelog;
- adoption logos только после реального разрешения пользователей;
- ссылки на Registry, AI и GitHub.

## 13. Quality, accessibility и trust

### Обнаруженный риск

В workspace не обнаружены unit/spec tests, Playwright, Vitest, axe или отдельная accessibility
automation. Storybook stories есть, но story не доказывает behavior.

Ark UI снижает риск в primitive behavior, но wrapper может сломать:

- refs;
- focus;
- hidden form controls;
- reset/autofill;
- `asChild`;
- portal behavior;
- callback detail objects;
- state attributes;
- CSS layout at responsive widths.

### Минимальная test pyramid

#### Contract tests для каждого wrapper family

- part renders and ref target;
- controlled/uncontrolled state;
- callback detail shape;
- `asChild`;
- `RootProvider`/context;
- data-slot and Ark attributes.

#### Critical integration tests

Для Select, Combobox, Dialog, Menu, DatePicker, FileUpload, TagsInput, TreeView:

- keyboard navigation;
- focus return;
- escape/outside click;
- form submit/reset;
- validation and invalid focus;
- portal/custom container;
- RTL.

#### Accessibility

- axe smoke на representative stories;
- accessible names;
- dialog title/description;
- live region/toast;
- table semantics;
- color contrast для presets;
- reduced motion.

#### Visual regression

- light/dark;
- mobile/desktop;
- open/closed/invalid/disabled states;
- each preset;
- blocks.

#### Registry smoke

На чистых fixtures:

- npm install path;
- hosted namespace path;
- Vite;
- Next.js;
- TanStack Start;
- TypeScript build;
- CSS imports;
- add/diff/reinstall.

### Публичные trust surfaces

- support policy;
- semver policy;
- browser/React matrix;
- accessibility statement;
- security reporting;
- changelog;
- migration guides;
- release cadence;
- status badges для CI и package.

## 14. SEO, distribution и community

### Текущее состояние

Есть canonical links, page title/description, favicon manifest и docs search. Не обнаружены:

- sitemap;
- robots.txt;
- per-page Open Graph;
- Twitter cards;
- structured data;
- RSS/changelog feed.

### Рекомендации

1. Генерировать sitemap из того же typed content catalog.
2. Добавить robots, canonical validation и 404 checks.
3. Генерировать OG image для component, block, guide и changelog pages.
4. Добавить JSON-LD для SoftwareApplication/TechArticle там, где уместно.
5. Создать RSS/Atom для releases/changelog.
6. Публиковать blocks как отдельные индексируемые страницы.
7. Сделать public registry directory page.
8. Добавить showcase только из проверенных реальных проектов.
9. Подготовить Figma kit после стабилизации core tokens/presets.
10. Создать contribution path для blocks, themes и registry items, не только components.

## 15. Changelog и migrations

Внутренняя changeset infrastructure есть, но пользователь не видит цельную историю продукта.

Нужны:

- `/docs/changelog`;
- запись на каждую release group;
- breaking/deprecation sections;
- before/after;
- migration commands;
- affected components;
- package и registry implications;
- link на changeset/PR;
- Markdown/LLM representation.

Для copy-owned users migration особенно важна. Минимальный update flow:

1. `view` current registry item;
2. `add --dry-run`;
3. `add --diff`;
4. documented merge checklist;
5. component-specific migration note;
6. tests/build после merge.

Полноценный agent migration skill можно делать позже, когда накопятся реальные breaking cases.

## 16. Рекомендуемая дорожная карта

### P0 — фундамент роста, 0–6 недель

| Инициатива                                     |          Impact |         Effort | Результат                                  |
| ---------------------------------------------- | --------------: | -------------: | ------------------------------------------ |
| Curated/generated `llms.txt` + canonical `.md` |         Высокий |        Средний | Понятный AI и search index.                |
| Hosted `@moduix` registry namespace            |   Очень высокий |        Средний | Запоминаемые install/search/view commands. |
| Components gallery и category IA               |   Очень высокий |        Средний | Быстрая оценка библиотеки.                 |
| Public changelog + support/version policy      |         Высокий | Низкий/средний | Доверие к production adoption.             |
| Sitemap, robots, OG/Twitter                    |         Средний |         Низкий | Discoverability и shareability.            |
| Critical interaction + registry smoke tests    |   Очень высокий |        Высокий | Проверяемое качество.                      |
| Dark mode, RTL, update и migration guides      |         Высокий |        Средний | Закрытие adoption blockers.                |
| AI action menu и AI guide                      | Средний/высокий | Низкий/средний | LLM-friendly journey.                      |

### P1 — time-to-product, 6–12 недель

| Инициатива                                            |        Impact |          Effort | Результат                                   |
| ----------------------------------------------------- | ------------: | --------------: | ------------------------------------------- |
| 12–15 production blocks                               | Очень высокий |         Высокий | Первый реальный экран за минуты.            |
| Chart + NavigationMenu + ButtonGroup                  |       Высокий | Средний/высокий | Закрытие заметных component gaps.           |
| Standalone Calendar и AlertDialog/ContextMenu recipes |       Средний |         Средний | Совместимость ожиданий без alias pollution. |
| 3–5 theme presets                                     |       Высокий |         Средний | Визуальный выбор и differentiation.         |
| Public moduix Skill                                   |       Высокий |         Средний | Корректная AI-генерация.                    |
| MCP onboarding и registry discovery                   |       Высокий |  Низкий/средний | Natural-language install/search.            |
| Framework-specific setup pages                        |       Средний |         Средний | Меньше setup uncertainty.                   |

### P2 — platform, 3–6 месяцев

| Инициатива                               |          Impact |          Effort | Результат                                   |
| ---------------------------------------- | --------------: | --------------: | ------------------------------------------- |
| Visual theme builder + shareable preset  |   Очень высокий |         Высокий | Собственная design-system acquisition loop. |
| 3–5 templates                            |         Высокий |         Высокий | Быстрый project bootstrap.                  |
| Registry directory/community submissions |         Высокий |         Средний | Ecosystem growth.                           |
| Figma/token export                       | Средний/высокий |         Высокий | Designer-developer workflow.                |
| Visual regression matrix                 |         Высокий | Средний/высокий | Безопасное масштабирование presets/blocks.  |
| Public roadmap/RFC process               |         Средний |         Средний | Community trust и contribution focus.       |

### P3 — ecosystem, 6–12 месяцев

- migration assistant/skill на основе реальных upgrade cases;
- verified third-party registry;
- block/theme contribution program;
- framework targets только при измеренном спросе;
- optional create-moduix bootstrap;
- telemetry только privacy-safe и opt-in;
- partnerships/showcase.

## 17. Чего не следует копировать у shadcn

1. **Не форкать CLI раньше времени.** Registry и стандартный shadcn CLI уже дают большую часть
   нужных операций.
2. **Не создавать aliases только ради знакомых имён.** `Menu.ContextTrigger` и
   `Dialog role="alertdialog"` лучше документировать, чем дублировать API.
3. **Не поддерживать несколько primitive bases без спроса.** Ark-first — преимущество и ясность,
   а не недостаток.
4. **Не превращать 3200 variables в 3200 контролов builder.** Пользователю нужен curated core.
5. **Не публиковать десятки декоративных blocks без behavior quality.** Сначала form, keyboard,
   responsive и accessibility contract.
6. **Не обещать Figma parity до стабилизации presets и semantic token subset.**
7. **Не делать marketplace до появления собственного high-quality registry surface.**

## 18. Предлагаемое позиционирование

Вариант:

> moduix — Ark-first React components for teams that want production behavior, native CSS and a
> choice between package-managed updates and code ownership.

Коротко по-русски:

> Готовые Ark UI компоненты с нативным CSS: устанавливайте как пакет или забирайте исходники через
> shadcn registry.

Три доказательства рядом:

1. 82 documented component families.
2. Native CSS, no required Tailwind.
3. Package-managed or copy-owned.

Не нужно позиционировать продукт как «shadcn, но на Ark». Лучше:

- shadcn-inspired distribution;
- Ark-preserving behavior;
- native-CSS design system;
- deeper product controls;
- two ownership models.

## 19. Метрики успеха

### Activation

- первый компонент запущен менее чем за 5 минут;
- первый production block — менее чем за 20 минут;
- доля успешных registry installs выше 95%;
- доля пользователей, дошедших от gallery до install command.

### Quality

- critical component families покрыты keyboard/form integration tests;
- ноль undocumented breaking changes;
- все registry items проходят clean-project smoke fixtures;
- все public Markdown URLs и `llms.txt` links проверяются CI;
- visual regression для blocks и presets.

### Adoption

- npm weekly downloads;
- registry item installs, если это можно измерять без нарушения privacy;
- GitHub stars/contributors;
- block usage;
- external showcase projects;
- повторные visits к changelog/update guides.

### AI

- успешный MCP list/search/view;
- installable Skill;
- процент component pages с clean self-contained Markdown;
- zero internal imports в LLM output;
- prompt-to-valid-build success на наборе eval tasks.

## 20. Приоритетный backlog по файлам moduix

| Зона               | Текущая точка                                    | Следующее действие                                |
| ------------------ | ------------------------------------------------ | ------------------------------------------------- |
| LLM index          | `apps/docs/src/routes/llms[.]txt.ts`             | Перейти на curated typed catalog.                 |
| Full corpus        | `apps/docs/src/routes/llms-full[.]txt.ts`        | Сохранить, добавить guidance и caching.           |
| Per-page Markdown  | `apps/docs/src/routes/docs/{$}[.]md.ts`          | Сделать canonical и покрыть snapshots.            |
| Legacy Markdown    | `apps/docs/src/routes/llms[.]mdx.docs.$.ts`      | Redirect/deprecate.                               |
| Markdown processor | `apps/docs/src/lib/source.ts`                    | Гарантировать clean consumer code.                |
| Docs UI            | `apps/docs/src/routes/docs/$.tsx`                | AI actions, copy install, trust links.            |
| Navigation         | `apps/docs/content/docs/meta.json`               | Gallery, Blocks, Themes, AI, Changelog, Registry. |
| Landing            | `apps/docs/src/routes/index.tsx`                 | Positioning, install, blocks, trust.              |
| Registry           | `registry.json`                                  | Hosted namespace, blocks, themes, skill items.    |
| Theme              | `packages/react/src/lib/moduix/styles/theme.css` | Выделить curated core и presets.                  |
| Quality            | root scripts/workflows                           | Unit/integration/a11y/visual/registry smoke.      |
| SEO                | docs routes/public                               | Sitemap, robots, OG, Twitter, RSS.                |

## 21. Решение: где moduix может реально выиграть

Не нужно обгонять shadcn по числу community registries или копировать его визуальный язык. Реальная
ниша moduix:

- команды хотят Ark behavior и composition;
- не хотят обязательный Tailwind;
- иногда хотят обычный npm package;
- иногда хотят source ownership;
- строят сложные product interfaces, а не только landing pages;
- ценят native forms, collections, advanced controls и прозрачные contracts.

Если добавить blocks, presets, hosted registry, AI skill/MCP, public quality signal и сильный
changelog, moduix перестанет выглядеть как «большой набор хорошо документированных компонентов» и
станет полноценной продуктовой платформой.

Наиболее важная последовательность:

1. Сделать библиотеку легко найти и понять.
2. Сделать установку брендированной и предсказуемой.
3. Дать готовые продуктовые результаты через blocks.
4. Дать визуальную идентичность через presets.
5. Доказать качество tests/changelog/support policy.
6. Превратить docs/registry в AI и community distribution loop.
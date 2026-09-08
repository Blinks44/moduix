# Review: React Tailwind component migrations

Дата проверки: 2026-09-08

## Итог

Текущий `packages/react-tailwind` в целом сделан хорошо. Реализация уже близка к сильной стороне shadcn: стили находятся рядом с владельцем, публичные варианты собраны через `cva`, пользовательский `className` передается последним в `cn`, а компоненты остаются обычным копируемым кодом без лишнего внутреннего фреймворка.

При этом moduix не выглядит копией shadcn. Ark UI остается источником поведения и анатомии, поэтому `RootProvider`, контексты, явные input-части, orientation, autoplay, viewport и другие возможности сохранены там, где у shadcn их нет.

Блокирующих проблем не найдено. Основные улучшения точечные:

1. убрать reset-утилиты, которые уже гарантирует обязательный Tailwind Preflight;
2. ослабить или явно документировать `!important`-контракт tooltip у Chart;
3. решить, действительно ли Card должен автоматически распознавать все интерактивные потомки;
4. отдельно обсудить удаление обязательного `Alert.Content`, если хочется уменьшить consumer ceremony.

Длинные строки классов сами по себе не являются проблемой. Официальная документация Tailwind прямо показывает длинные локальные списки утилит и предупреждает, что дополнительная абстракция часто не дает выигрыша. В этом пакете длина обычно объясняется состояниями Ark, accessibility, motion reduction, orientation и поддержкой пользовательского переопределения.

## Охват

Проверены все 18 текущих компонентов `react-tailwind`:

- Accordion
- Alert
- AngleSlider
- AspectRatio
- Avatar
- Badge
- Bleed
- Breadcrumbs
- Button
- Card
- Carousel
- Chart
- Checkbox
- Clipboard
- CloseButton
- Collapsible
- Menu
- Spinner

Также проверены тесты, package exports, source registry и опубликованный registry artifact. `packages/react-tailwind/registry.json` и `website/docs/public/r/react-tailwind/registry.json` совпадают по содержимому и списку items.

## Что сделано хорошо

### 1. Правильное разделение поведения и оформления

Компоненты не воспроизводят state machine самостоятельно. Accordion, Checkbox, Carousel, Clipboard, Collapsible и Menu оставляют поведение Ark UI, а Tailwind отвечает только за визуальный слой. Это важнее внешнего сходства с shadcn.

Особенно хорошо:

- `RootProvider` не заменяется самодельным React context;
- Ark callbacks и state attributes проходят без перевода в локальные события;
- `HiddenInput` остается явной частью контракта;
- `asChild` сохраняется на публичных частях;
- `data-slot` используется как стабильный moduix hook;
- состояния стилизуются через Ark `data-*`, а не через параллельные modifier-классы.

### 2. `cva` используется по назначению

Button, Alert, Avatar, Badge, Bleed, Card, Menu и Spinner используют recipe только там, где публичный prop выбирает взаимоисключающий визуальный вариант. Это лучше, чем переносить каждое состояние в `cva` или собирать имена утилит динамически.

Хороший пример: `Alert.status` передается в `alertVariants`, а `data-status` остается hook для дочернего Indicator. Пользовательский `className` идет после recipe.

### 3. Длинные интерактивные кластеры в основном честные

Самые длинные отдельные кластеры находятся в Clipboard.Trigger, Checkbox.Control, Carousel controls, Accordion trigger, CloseButton и Menu. В них смешаны не случайные декоративные правила, а независимые обязанности:

- базовый layout;
- focus-visible;
- disabled и readonly;
- Ark state;
- reduced motion;
- forced colors;
- orientation;
- icon sizing.

Перенос этих правил в скрытую константу уменьшил бы строку JSX, но не сложность компонента. Перенос в общий context или provider был бы хуже.

### 4. Menu сложнее shadcn по уважительной причине

У moduix Menu 28 namespace members, у текущего shadcn Dropdown Menu 15 экспортируемых компонентов. Разница объясняется не Tailwind:

- generic Ark Menu вместо только dropdown wrapper;
- `RootProvider` и context API;
- context trigger;
- явные Positioner, Viewport, Arrow и ArrowTip;
- trigger item для вложенных Menu roots;
- более явная композиция ItemText;
- portal policy moduix.

Явный `Menu.Viewport` оправдан. Он отделяет scroll ownership от Content и не требует анализировать React children или DOM elements. Минимальная композиция длиннее shadcn, но предсказуема для SSR и кастомных children.

### 5. Chart проще сопоставимого shadcn Chart

moduix Chart содержит 257 строк, текущий shadcn Chart около 373. Это не прямое сравнение возможностей, потому что используются TanStack Charts и Recharts соответственно, но признаков копирования или лишнего слоя здесь нет. У moduix небольшой публичный набор частей и один понятный выбор renderer.

### 6. Тесты сильные

Тесты проверяют не только наличие классов. Есть coverage для Ark semantics, refs, `asChild`, controlled callbacks, lazy mount, orientation, keyboard navigation, portal behavior, explicit hidden inputs и consumer overrides. Это заметно надежнее обычного snapshot-подхода.

## Findings

### P2: обязательный Preflight частично дублируется компонентами

В 10 компонентах найдено 18 использований `box-border`, в трех местах `m-0`, в нескольких button-like частях `p-0` и `border-0`.

Примеры:

- `Accordion.Root`, `Collapsible.Root`, `AngleSlider`, `Bleed`, `Clipboard.Input`, `Checkbox.Control`;
- `CloseButton.Root` содержит сразу `m-0 box-border ... border-0 ... p-0`;
- `Carousel.Indicator` содержит `border-0` и `p-0`.

Для registry установка уже требует Tailwind и прямо сообщает, что reset предоставляет Preflight. Preflight задает `margin: 0`, `padding: 0`, `box-sizing: border-box` и `border: 0 solid` глобально. Поэтому эти utilities создают шум, но не добавляют контракт.

Как улучшить:

- удалить только подтвержденные Preflight-дубликаты: сначала `box-border` и `m-0`, затем проверить `p-0` и `border-0` по каждому host element;
- синхронизировать React Tailwind и Solid Tailwind;
- не менять CSS Modules, потому что там reset не является внешней гарантией;
- прогнать visual stories для button-like частей после cleanup.

Это non-breaking Tailwind-only cleanup. Он немного сократит самые длинные строки без новой абстракции.

### P2: Chart tooltip требует `!` от пользователя

`mergeTooltipClassName` добавляет все дефолты как important utilities: `!rounded-md`, `!border`, `!bg-popover`, `!p-3` и далее. Тест подтверждает, что для замены фона пользователь должен передать именно `!bg-muted`.

Проблема не в длине строки, а в override contract. Обычный `bg-muted` выглядит валидным consumer class, но не может победить component default. Это расходится с остальными публичными частями пакета, где `className` последним в `cn` достаточно.

Как улучшить:

1. В browser story проверить, какие конкретно стили TanStack действительно требуют important.
2. Убрать `!` со свойств, которые и без него выигрывают cascade.
3. Если TanStack требует important для части chrome, оставить его только на этих свойствах и явно описать contract.
4. Добавить тест, что обычный consumer utility заменяет хотя бы фон, padding и shadow, если upstream cascade это позволяет.

Это изменение затрагивает React и Solid Chart, их тесты, docs и registry artifacts. API не меняется, но visual override behavior меняется.

### P2: Card.Root содержит слишком широкий selector для интерактивных потомков

`cardRootVariants` автоматически ищет внутри Card `a`, `button`, `input`, `select`, `textarea`, несколько roles и любой non-negative `tabindex`, когда присутствует `Card.Link`. Затем он поднимает все найденное над overlay link.

Это решает реальную задачу: вложенная кнопка остается доступна поверх stretched link. Но selector:

- знает слишком много о consumer-owned content;
- связывает Card с HTML tags и roles;
- труден для локального изменения;
- составляет большую часть самой длинной строки Card;
- расширяет поведение Card на элементы, которые не являются его публичными частями.

Текущий shadcn Card не имеет stretched-link capability, поэтому просто копировать его нельзя.

Как улучшить:

- безопасный вариант: оставить selector и задокументировать его как цену `Card.Link`;
- более простой контракт: гарантировать поднятие только `Card.Action`, где `relative z-1` уже есть;
- если интерактивный контент нужен также в Body, лучше явный opt-in hook, например документированный `data-card-interactive`, чем автоматическое распознавание tags и roles.

Удаление автоматического распознавания является shared behavior change для всех четырех packages. Делать его как обычный Tailwind cleanup нельзя.

### P3: Alert.Content добавляет обязательную церемонию

У moduix Alert шесть публичных частей: Root, Indicator, Content, Title, Description и Actions. У shadcn три: Alert, AlertTitle и AlertDescription.

Разница статусов и Actions оправдана. `Content` вызывает больше вопросов, потому что его единственная обязанность в Tailwind варианте: `grid min-w-0 flex-1 gap-1`. Базовый Alert с title и description требует дополнительный wrapper:

```tsx
<Alert>
  <Alert.Content>
    <Alert.Title>Title</Alert.Title>
    <Alert.Description>Description</Alert.Description>
  </Alert.Content>
</Alert>
```

Возможная более простая композиция:

```tsx
<Alert>
  <Alert.Title>Title</Alert.Title>
  <Alert.Description>Description</Alert.Description>
</Alert>
```

Это можно реализовать grid layout на Root и owned positioning на Title, Description и Actions. Но такое изменение breaking: оно меняет анатомию четырех packages, CSS Modules styles, Tailwind classes, tests, stories, docs и registries.

Рекомендация: не менять автоматически. Если цель следующего этапа именно уменьшить consumer ceremony, это лучший кандидат на отдельный RFC или маленький breaking changeset.

### P3: три Carousel trigger повторяют почти одинаковый control recipe

PrevTrigger, NextTrigger и AutoplayTrigger повторяют длинный button-like набор состояний. shadcn Carousel уменьшает это через собственный Button, но у moduix Ark triggers имеют отличающийся контракт и состояния.

Не стоит экспортировать новый общий recipe только ради сокращения строк. Возможные варианты:

- оставить как есть, если части должны эволюционировать независимо;
- если visual contract должен всегда совпадать, рассмотреть композицию с moduix Button только после проверки refs, `asChild`, disabled data attributes и registry dependency;
- для одной только читаемости разделить `cn` на несколько статических строк: base, interaction, state, motion. Все полные utilities должны остаться статически видимыми.

Сейчас это maintainability observation, не bug.

## Сравнение сложности с shadcn

| Компонент   | moduix namespace members | shadcn exports | Оценка разницы                                                         |
| ----------- | -----------------------: | -------------: | ---------------------------------------------------------------------- |
| Accordion   |                        9 |              4 | RootProvider, contexts, horizontal orientation и явный Body оправданы  |
| Alert       |                        6 |              3 | statuses и Actions оправданы, Content можно обсудить                   |
| AspectRatio |                        1 |              1 | практически минимальная реализация                                     |
| Avatar      |                        5 |              6 | moduix даже уже по набору convenience parts                            |
| Badge       |                        3 |              1 | Label и Dot необязательны и дают owned truncation/status composition   |
| Breadcrumbs |                        8 |              7 | дополнительный Path является optional convenience API                  |
| Button      |                        1 |              1 | больше вариантов, loading и строгая asChild accessibility              |
| Card        |                       10 |              7 | Media, Background и Link дают реальные дополнительные возможности      |
| Carousel    |                       14 |              6 | Ark предоставляет indicators, autoplay, progress и RootProvider        |
| Chart       |                        7 |              6 | сопоставимый размер API при меньшем implementation LOC                 |
| Checkbox    |                        8 |              1 | Ark anatomy, explicit input, group, five sizes и indeterminate state   |
| Collapsible |                        7 |              3 | styled Indicator, animated Body и RootProvider                         |
| Menu        |                       28 |             15 | generic Ark Menu, portal/positioner/viewport и richer item composition |
| Spinner     |                        1 |              1 | moduix поддерживает asChild, decorative mode и размеры                 |

Для AngleSlider, Bleed, Clipboard и CloseButton точного официального shadcn counterpart нет. Сравнивать их с произвольным соседним компонентом было бы вводящим в заблуждение.

## Разбор самых длинных классов

### Checkbox.Control

Длина в основном оправдана: пять размеров, checked и indeterminate, invalid, readonly, focus-visible, hover media query и reduced motion. Делить это на новый context не нужно.

Можно убрать `box-border` после проверки Preflight. Остальные rules лучше оставить на Control, потому что он ими владеет.

### Clipboard.Trigger

Это полноценный styled trigger, а не тонкий Ark wrapper. Строка длиннее shadcn-style trigger, потому что moduix дает usable default без обязательной композиции с Button.

Переиспользование Button уменьшит utilities, но создаст component и registry dependency. Пока Clipboard.Trigger и Button не имеют идентичного visual contract, локальная длинная строка проще.

### Carousel controls

Повторение заметно, но перенос в общую абстракцию оправдан только при общем контракте. Простая приватная строковая константа скрывает ownership и почти ничего не выигрывает.

### Menu.Content и Menu item recipe

Content содержит positioning variables, available size, transform origin, enter/exit animation и reduced motion. Это нормальный длинный stateful cluster.

`menuItemStyles` является хорошим применением `cva`: layout, tone и indicator position являются настоящими вариантами. Его не нужно раскладывать на множество маленьких helper-функций.

### CloseButton

Один публичный part и один файл лучше общей внутренней button abstraction. Реальное сокращение здесь дает удаление Preflight-дубликатов, а не перенос классов в константу.

## Что не рекомендуется делать

- Не переносить статические строки в `styles`-объекты только ради короткого JSX.
- Не создавать context для Card, Alert или Checkbox size/status только ради nearest-parent isolation.
- Не превращать все классы с `data-*` в `cva`. Runtime state должен оставаться Tailwind variant на владеющей части.
- Не делать trigger parts полностью unstyled только потому, что shadcn ожидает композицию с Button. У moduix сейчас есть самостоятельный visual contract.
- Не убирать Ark части, hooks или RootProvider ради совпадения количества экспортов.
- Не копировать shadcn descendants selectors автоматически. У shadcn они тоже длинные и местами сильнее вмешиваются в consumer children.

## Практический порядок улучшений

### Этап 1, безопасный

1. Удалить подтвержденные Preflight-дубликаты в React Tailwind и Solid Tailwind.
2. Сохранить статически полные utility names.
3. Проверить targeted tests, package builds и visual stories.

### Этап 2, customization

1. Проверить реальный TanStack tooltip cascade.
2. Уменьшить область `!important`.
3. Зафиксировать обычный consumer override тестом.

### Этап 3, отдельное продуктовое решение

1. Решить, нужен ли универсальный stretched-link selector Card.
2. Решить, стоит ли убрать Alert.Content.
3. Только после решения синхронизировать все четыре packages, docs, stories, tests и registries.

## Simplification review

### Источники shadcn

Проверены актуальные official registry sources на 2026-09-08:

- [shadcn component index](https://ui.shadcn.com/docs/components)
- [shadcn registry source directory](https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/new-york-v4/ui)
- [Accordion](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/accordion.tsx)
- [Alert](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/alert.tsx)
- [Button](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx)
- [Card](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/card.tsx)
- [Carousel](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/carousel.tsx)
- [Checkbox](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/checkbox.tsx)
- [Collapsible](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/collapsible.tsx)
- [Dropdown Menu](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/dropdown-menu.tsx)
- [Tailwind utility guidance](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Tailwind Preflight](https://tailwindcss.com/docs/preflight)

### Public parts and component-owned wrappers

В текущем review код не менялся, поэтому before и after одинаковы.

- Всего namespace members у 18 компонентов: 132, включая `Root` aliases, Ark Context и ItemContext exports.
- Основные component-owned public wrappers: `Accordion.ItemBody`, `Alert.Content`, `Collapsible.Body`, `Menu.Viewport`.
- `Accordion.ItemBody` и `Collapsible.Body` отделяют inner layout от измеряемого animated content.
- `Menu.Viewport` владеет scrolling и оставляет Arrow рядом с viewport, а не внутри clipped region.
- `Alert.Content` отвечает только за внутренний layout и является самым реалистичным кандидатом на удаление.

### Минимальная consumer-разметка

- Button: один element, сократить нельзя.
- Card basic: Root плюс owned content parts по необходимости, обязательных wrappers нет.
- Alert с title и description: Root, Content, Title, Description. Content потенциально можно убрать.
- Collapsible styled basic: Root, Trigger, Content, Body. Body нужен, если библиотека продолжает владеть inner spacing отдельно от animation box.
- Menu basic: Root, Trigger, Positioner, Content, Viewport, Item. Positioner и Content принадлежат Ark positioning, Viewport принадлежит scrolling.

### Presentation-only или historical surface

- Явно historical aliases в текущем React Tailwind наборе не найдены.
- `Breadcrumbs.Path`, `Carousel.Indicators`, default icons и `Clipboard.CopyText` являются optional convenience parts, не обязательной церемонией.
- `Alert.Content` ближе всего к presentation-only wrapper.
- `Menu.ItemTextContent`, `ItemTextIcon` и `ItemTextLabel` являются optional owned layout parts. Удаление уменьшит API, но снова перенесет стили на arbitrary children.

### Примененные упрощения

В рамках review изменения не применялись. Текущее рабочее дерево сохранено без правок component implementation.

### Самое маленькое оставшееся улучшение

Самое маленькое non-breaking улучшение: удалить подтвержденные Preflight reset utilities из React Tailwind и Solid Tailwind. Оно влияет только на два Tailwind packages, их generated registry artifacts и visual verification.

Самое маленькое осмысленное API-упрощение: удалить `Alert.Content` и перенести layout ownership на Root и оставшиеся owned parts. Оно breaking и затрагивает все четыре packages, tests, stories, docs, snippets и registries.

## Проверки

- `pnpm --filter @moduix/react-tailwind test`: 18 test files, 134 tests passed.
- `pnpm --filter @moduix/react-tailwind tsc:check`: passed.
- `pnpm --filter @moduix/react-tailwind build`: passed, 57 files generated.
- Source и published React Tailwind registry: equal.

Полные root `fmt:fix`, `lint:check` и `tsc:check` не запускались, потому что review не менял исходный код и рабочее дерево уже содержит незакоммиченный перенос Collapsible.
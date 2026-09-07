# Ревью переноса компонентов

Дата: 2026-09-08. Проверены реализации в React CSS Modules, Solid CSS Modules, React Tailwind и Solid Tailwind. Ниже сохранены замечания к исходному состоянию и результат последующего исправления.

В целом перенос использует нативные механизмы Solid и Tailwind. В ходе ревью были воспроизведены ошибки Button, Menu, Card и Alert; все четыре замечания исправлены.

## Статус исправления

- Solid Button передаёт `onClick` в runtime Solid без ручного вызова, поэтому поддерживает как функцию, так и bound tuple handler. Disabled/loading guard остаётся на capture-фазе.
- Во всех четырёх Menu добавлен явный `Menu.Viewport`. `Menu.Content` больше не анализирует и не переставляет потомков, поэтому структура одинакова при client render и SSR. Все внутренние usages, stories, website examples и registry artifacts обновлены.
- React и Solid Tailwind Card получают размер ближайшего root через framework-native context и формируют конкретные cva-классы частей. Вложенные Card изолированы, а обычные consumer utilities снова заменяют defaults через `cn`.
- React и Solid Tailwind Alert получают status ближайшего root через framework-native context. Вложенные Alert изолированы, а consumer-класс Indicator имеет ожидаемый приоритет.

## Замечания

### 1. [P2] Button ломает нативный Solid bound event handler

Места: [Solid Button](packages/solid/src/components/button/Button.tsx#L71), [Solid Tailwind Button](packages/solid-tailwind/src/components/button/Button.tsx#L106).

`HTMLArkProps<'button'>` допускает Solid-обработчик в форме `[handler, data]`, но обёртка приводит `onClick` к функции и вызывает его напрямую. Например, `onClick={[(value: string) => calls.push(value), 'saved']}` не вызывает обработчик. Это именно потеря нативного Solid-контракта, а не различие с React.

Временный Rstest-тест воспроизвёл ошибку в обоих пакетах: ожидалось `['saved']`, получено `[]`. Существующие тесты покрывают только функцию. Нужно сохранить disabled/loading guard и поддержать обе формы обработчика; добавить одинаковую регрессионную проверку в два Solid-пакета. Временные тесты после проверки удалены.

### 2. [P2] Menu сортирует детей по DOM-признаку, недоступному при SSR

Места: [Solid Menu](packages/solid/src/components/menu/Menu.tsx#L149), [Solid Tailwind Menu](packages/solid-tailwind/src/components/menu/Menu.tsx#L186).

`isMenuArrow` проверяет `Element.hasAttribute('data-moduix-menu-arrow')`. При серверном рендеринге Solid возвращает представление HTML, а не DOM Element, поэтому стрелка не распознаётся. Воспроизведение через Solid `renderToString` для `Menu open portalled={false}` с `Menu.Arrow` внутри `Menu.Content` дало стрелку внутри `contentViewport`. Клиентская реализация выносит её перед viewport.

Это подтверждённое различие серверной и клиентской анатомии. Оно создаёт риск неправильного clipping и гидратации; конкретная ошибка гидратации отдельно не воспроизводилась. Существующие DOM-тесты проходят и этот путь не проверяют.

Рекомендация: убрать определение типа компонента по отрендеренному DOM. Сначала согласовать явную композицию стрелки и прокручиваемой области с контрактом React; затем проверить SSR и hydration для inline, portal и asChild. Не заменять эту проверку другой эвристикой чтения HTML.

### 3. [P2] Tailwind Card и Alert наследуют варианты чужого внешнего экземпляра

Места: [React Tailwind Card](packages/react-tailwind/src/components/card/Card.tsx#L62), [Solid Tailwind Card](packages/solid-tailwind/src/components/card/Card.tsx#L54), [React Tailwind Alert](packages/react-tailwind/src/components/alert/Alert.tsx#L64), [Solid Tailwind Alert](packages/solid-tailwind/src/components/alert/Alert.tsx#L59).

Именованная `group/card` или `group/alert` различает виды групп, но не ограничивает поиск ближайшим экземпляром. Поэтому внутренний компонент реагирует и на внешний root.

Проверено в Chrome на CSS, скомпилированном установленным Tailwind 4.3.3 с foundation и точными строками классов компонентов:

| Сценарий                                    | Ожидается        | Получено         |
| ------------------------------------------- | ---------------- | ---------------- |
| Header обычной Card `md`                    | 24 px по inline  | 24 px            |
| Header Card `md` внутри Card `lg`           | 24 px            | 32 px            |
| Indicator Alert `info`                      | muted foreground | muted foreground |
| Indicator Alert `info` внутри Alert `error` | muted foreground | destructive      |

CSS Modules устанавливают значения на каждом root и тем самым сбрасывают соответствующие значения для вложенного экземпляра. При Tailwind-переносе эта граница потерялась. Нужно ограничить связь с владельцем части, не запрещая существующую композицию, и добавить проверки вложенности в оба Tailwind-пакета.

### 4. [P2] Простой consumer utility не заменяет выбранный размер части Card

Места те же, что в пункте 3; текущий тест: [React Tailwind card.test](packages/react-tailwind/tests/card.test.tsx#L29).

В `Card size="lg"` класс `Card.Header className="px-2"` оставляет 32 px вместо ожидаемых 8 px. `cn` не удаляет `group-data-[size=lg]/card:px-8`, а групповой селектор сильнее обычного класса. В тесте передаётся тот же длинный group-модификатор, поэтому тест подтверждает только обходной путь, а не обычное переопределение default utility.

Это ограничение модели кастомизации, отдельно от ошибки вложенности. Оно затрагивает Header/Body/Footer и размер Title. Следует либо обеспечить обычные overrides выбранных defaults, либо явно сузить обещанный контракт и описать необходимость variant-aware overrides. Слепое добавление контекста только ради сокращения строки классов не рекомендуется.

## Проверка всех компонентов

Число частей ниже — ключи namespaced API, включая Root, RootProvider и Context; callable root не посчитан повторно. Состав ключей одинаков во всех четырёх пакетах. После исправления Menu получил один новый публичный ключ `Viewport`.

| Компонент    | Частей | Результат и оценка композиции                                                                                                             |
| ------------ | -----: | ----------------------------------------------------------------------------------------------------------------------------------------- |
| accordion    |      9 | Конкретных ошибок не обнаружено. Нативные Ark accessors и children; ItemBody отделяет внутренний padding от измеряемого animated content. |
| alert        |      6 | Исправлено: status ограничен ближайшим Tailwind Alert через framework-native context.                                                     |
| angle-slider |     12 | Конкретных ошибок не обнаружено. Нативный For, Ark HiddenInput, Dial и Marks — небольшие удобные композиции.                              |
| aspect-ratio |      1 | Конкретных ошибок не обнаружено. Проверка ratio и reactive style сохранены; Solid поддерживает строковый style.                           |
| avatar       |      5 | Конкретных ошибок не обнаружено. Ark state и RootProvider сохранены, размеры выбираются cva.                                              |
| badge        |      3 | Конкретных ошибок не обнаружено. Label локализует truncation, Dot владеет своим размером и цветом.                                        |
| bleed        |      1 | Конкретных ошибок не обнаружено. Фиксированные варианты переведены в cva без локальных styling variables.                                 |
| breadcrumbs  |      8 | Конкретных ошибок не обнаружено. Path использует For; nav/ol/li и текущая страница сохранены.                                             |
| button       |      1 | Исправлено: Solid tuple handler передаётся нативному runtime; варианты и размеры Tailwind остаются в cva.                                 |
| card         |     10 | Исправлено: размер ограничен ближайшей Card, а consumer utilities заменяют конкретные cva defaults.                                       |
| carousel     |     14 | Конкретных ошибок не обнаружено. Нативные context accessor и For; Ark остаётся владельцем состояния и измерений.                          |
| menu         |     28 | Исправлено: явный `Viewport` заменил скрытую обёртку и сортировку children во всех четырёх пакетах.                                       |
| spinner      |      1 | Конкретных ошибок не обнаружено. Семантика status/decorative и native asChild проверяются отдельно.                                       |

«Не обнаружено» означает отсутствие подтверждённой ошибки в проведённых проверках, а не сертификацию всех визуальных и интерактивных сценариев.

## Валидация и ограничения

- Полные package tests: React — 88 файлов / 488 тестов; Solid — 88 / 597; React Tailwind — 13 / 93; Solid Tailwind — 13 / 107. Все проходят.
- Все четыре package build и все четыре Storybook build проходят. `lint:check`, `tsc:check`, `fmt:check` проходят.
- Во всех 52 комбинациях component/package есть subpath export и registry item. Содержимое файлов и registryDependencies сгенерированных items совпадает с исходными manifests/files.
- Имена экспортированных Storybook-сценариев совпадают по всем 13 компонентам во всех четырёх playgrounds. Это проверка набора сценариев, не утверждение о попиксельной идентичности.
- CSS Modules совпадают у 11 компонентов. У Button и Menu Solid использует `useFocusVisible` и `:focus[data-focus-visible]` вместо React `:focus-visible`; у Button дополнительно сбрасывается outline. Это отдельная политика input modality, а не обязательное отличие CSS между фреймворками. Для Menu есть тест modality; явное обоснование различия стоит добавить в локальный контракт.
- Полного ручного прогона всех Storybook-сценариев не было. Browser computed-style проверки выполнены для описанных Card/Alert reproductions; не заявляется проверка всех анимаций, reduced motion и asChild visual defaults.
- `fmt:fix`, валидация registry и регенерация всех registry artifacts выполнены после исправлений. Изменения пользователя в документации Carousel не редактировались по существу.

## Simplification review

Официальные источники shadcn проверены 2026-09-08: [каталог](https://ui.shadcn.com/llms.txt), [исходники компонентов](https://github.com/shadcn-ui/ui/tree/main/apps/v4/registry/new-york-v4/ui). В частности: [Accordion](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/accordion.tsx), [Card](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/card.tsx), [DropdownMenu](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/dropdown-menu.tsx), [Spinner](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/spinner.tsx). Прямых counterparts AngleSlider и Bleed в проверенном каталоге нет. DropdownMenu — частичное сравнение: moduix Menu также поддерживает context menu. Carousel у shadcn основан на Embla, поэтому его внутреннее устройство не является контрактом Ark Carousel.

Ark: [Accordion](https://ark-ui.com/docs/components/accordion), [AngleSlider](https://ark-ui.com/docs/components/angle-slider), [Avatar](https://ark-ui.com/docs/components/avatar), [Carousel](https://ark-ui.com/docs/components/carousel), [Menu](https://ark-ui.com/docs/components/menu), [composition](https://ark-ui.com/docs/guides/composition). Общие MDX-страницы доступны; предполагаемые URL `/docs/solid/...` вернули 404 и не использовались как доказательство API. Solid-механика дополнительно проверена по локальным реализациям, декларациям сборки и исполняемым reproductions.

### Части, обёртки и минимальная композиция

API изменился только у Menu: добавлен явный `Menu.Viewport`. Неявные дополнительные элементы в обычной композиции: Spinner — indicator + default ring (2); Carousel — по span вокруг двух default navigation icons (2 при использовании обоих triggers). Dial добавляет Thumb, Marks и Indicators создают динамическое число соответствующих частей; это функциональные shorthand-композиции, а не общий runtime слой. У остальных перечисленных простых roots дополнительных скрытых контейнеров нет. Явные части вроде Menu.Viewport, Alert.Content и Accordion.ItemBody считаются пользовательской композицией, а не скрытой обёрткой.

Минимальные полезные формы: `<Button>Save</Button>`, `<Badge>New</Badge>`, `<Spinner />`, `<AspectRatio ratio={16 / 9}>…</AspectRatio>`, `<Bleed>…</Bleed>`; для Avatar — root + Fallback либо Image; Alert — root + Content + текст; Card — root + Body; Breadcrumbs — root + Path; AngleSlider — root + Label + Dial (и HiddenInput для формы); Accordion — root + Item(value) + Trigger + Content; Carousel — root(slideCount) + ItemGroup + Item(index); Menu — root + Trigger + Positioner + Content + Viewport + Item(value).

Root aliases не создают DOM и сохраняют callable/namespaced API; удаление даст breaking change без существенной экономии. Accordion.ItemBody нужен, когда требуются padding и измеряемая анимация: shadcn тоже использует внутренний div. Spinner шире одного SVG shadcn: custom indicator, decorative semantics и произвольный host объясняют часть дополнительной анатомии.

### Что действительно стоит упростить

1. Menu: выполнено — анализ и перестановка rendered children удалены, а scroll ownership вынесен в явный `Menu.Viewport`. Breaking-композиция синхронизирована в четырёх пакетах, tests, stories, contracts, website examples и registries.
2. Card: root содержит длинные селекторы для произвольных интерактивных потомков; Media/Background задают размеры и object-fit пользовательским детям. Наличие Background и stretched Link объясняет потребность в stacking, но не доказывает необходимость общей классификации детей по тегам/ролям. Следующий небольшой общий шаг — перенести media-fit policy в примеры, где изображения принадлежат потребителю. Это изменение визуального контракта всех четырёх пакетов, а не локальная Tailwind-чистка.
3. Preflight-дубли вроде `box-border` встречаются у Accordion, Alert, AngleSlider, Bleed, Carousel/Spinner, `m-0` — у Alert.Title и Bleed. Это кандидаты на удаление после проверки поддержанных asChild hosts; не подтверждённые функциональные дефекты.
4. Переменные Tailwind: фиксированные `--moduix-<component>-*` цепочки в проверенных компонентах не обнаружены. Menu сохраняет Ark positioning/measurement variables (`--available-*`, `--reference-width`, `--transform-origin`, `--layer-index`, `--z-index`, `--positioner-width`) и arrow coordination. `--color-*`, `--moduix-z-popup`, `--moduix-animation-spin` — shared foundation tokens. `--_aspect-ratio-value` задаётся из динамического ratio и читается aspect utility; это не фиксированный variant token, но его можно отдельно оценить против inline `aspect-ratio`, учитывая utility override contract.

В результате исправления Menu удалены скрытая production-обёртка и эвристика сортировки; вместо них добавлена одна явная публичная часть. Для accordion, angle-slider, aspect-ratio, avatar, badge, bleed, breadcrumbs, carousel и spinner: **No simplification recommended** по результатам этого прохода, кроме перечисленных небольших кандидатов на проверку resets. Не следует сокращать Ark providers, hidden inputs или доступность ради сходства с shadcn.

Все подтверждённые замечания этого ревью закрыты. Отдельным будущим решением остаётся возможное упрощение descendant media/interactive policy Card; оно не является найденной ошибкой переноса.
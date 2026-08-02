# Аудит компонентов `accordion` — `typeset`

Дата аудита: 2026-08-01  
Диапазон: 83 компонента из `packages/react/src/components` и 83 соответствующие страницы в
`apps/docs/docs/en/docs`.

## Итог

Библиотека уже находится в хорошем production-состоянии. Блокирующих ошибок Ark-контракта,
опасных типовых адаптеров, дублирования state machine или системной CSS-проблемы не найдено.
Массовый рефакторинг, редизайн или новая волна sugar API сейчас принесут больше риска, чем пользы.

- **P0:** нет.
- **P1:** укрепить поведенческие тесты `CommandPalette`; добавить отсутствующий раздел CSS
  Properties для `SplitButton`.
- **P2:** синхронизировать несколько строк публичных CSS variables в документации `Alert`,
  `Badge`, `CommandPalette` и `Switch`.
- **Без изменений:** 78 из 83 компонентов. Это осознанный результат аудита, а не пропуск.

**Статус исправлений от 2026-08-01:** все P1/P2 выполнены без изменения public API и
production CSS. Для `CommandPalette` оставлены три коротких focused-теста; документация CSS
Properties синхронизирована для пяти затронутых страниц.

Главная сильная сторона moduix — библиотека уже не выглядит копией. Ark остаётся видимым в
advanced composition, а локальные `Field`, `Option`, `Items`, `Body`, `CloseIcon`,
`Sidebar.Tooltip`, `Lightbox.Bind`, `CommandPalette.Panel` и `Typeset.Scroll` сокращают именно
частый boilerplate. Этот баланс следует сохранять.

## Проверенная база

- У всех 83 компонентов есть implementation, CSS, component-local markdown, Storybook story,
  тест, публичная MDX-страница и registry item; в manifest не отсутствуют shipped TSX/CSS-файлы.
- Локальный диапазон содержит около 14 918 строк TSX, 17 357 строк component CSS и 19 013 строк
  MDX. Большой размер сложных компонентов объясняется Ark anatomy и визуальными parts, а не
  скрытыми state machine.
- Локальная зависимость `@ark-ui/react@^5.37.2` совпадает с актуальной npm-версией на дату аудита:
  `5.37.2`. Поэтому live Ark docs и установленный contract не расходятся по версии.
- Во всём component CSS нет raw hex-цветов, `transition: all` и runtime-импортов
  `variables-moduix.css` / `variables-ark.css`. Есть только два `!important` — оба локализованы в
  edge handles `ImageCropper`, где визуальная ось должна переопределить inline geometry Ark.
- Все MDX-страницы имеют frontmatter description, API Reference, Basic, Anatomy, Composition,
  Examples и локальные preview snippets. Небольшие отклонения в названиях внутренних composition
  headings у `HoverCard`, `Tour` и `TreeView` не ухудшают понимание и не стоят отдельной правки.
- Точечно в браузере проверены `CommandPalette`, `Sidebar` в expanded/collapsed состояниях,
  `Tour` и `Typeset`. `CommandPalette` дополнительно проверен при viewport `390×844`: content
  занимает `358×544`, сохраняет 16 px боковых отступов и не клиппится. В console проверенных
  страниц нет warning/error.

## Что действительно стоит сделать

### P1. Укрепить тесты `CommandPalette`

**Статус: исправлено.**

Сейчас единственный тест проверяет только игнорирование повторного global shortcut. Для
704-строчного composition component с собственным shortcut listener и локальным
`closeOnSelect` этого мало.

Минимальный полезный набор:

1. Проверить открытие/закрытие shortcut, игнорирование editable target и сохранение Ark Dialog
   focus lifecycle.
2. Проверить, что `CommandPalette.Combobox` передаёт исходный Ark `details` в `onSelect`, а
   `closeOnSelect={false}` оставляет dialog открытым.
3. Проверить `CommandPalette.Search`: доступное имя по умолчанию, появление/работу clear trigger и
   возврат фокуса в input.

Менять production-код заранее не нужно: сначала добавить тесты и исправлять только подтверждённое
падение.

### P1. Документировать CSS Properties `SplitButton`

**Статус: исправлено.**

В `packages/react/src/styles/variables-moduix.css` есть 10 публичных переменных, но на странице
`split-button.mdx` присутствуют только Styling hooks. Нужно добавить стандартный CSS Properties
блок и `cssProperties` в `apps/docs/src/components/examples/split-button.tsx`:

- `--moduix-split-button-separator-color`
- `--moduix-split-button-separator-inset`
- `--moduix-split-button-separator-offset`
- `--moduix-split-button-separator-opacity`
- `--moduix-split-button-separator-width`
- `--moduix-split-button-trigger-padding-x-xs`
- `--moduix-split-button-trigger-padding-x-sm`
- `--moduix-split-button-trigger-padding-x-md`
- `--moduix-split-button-trigger-padding-x-lg`
- `--moduix-split-button-trigger-padding-x-xl`

### P2. Досинхронизировать строки CSS variables

**Статус: исправлено.**

Добавить отсутствующие строки в существующие массивы CSS Properties:

- `Alert`: `--moduix-alert-bg-default`, `--moduix-alert-border-color-default`,
  `--moduix-alert-color-default`, `--moduix-alert-indicator-color-default`.
- `Badge`: `--moduix-badge-focus-ring-color`, `--moduix-badge-focus-ring-offset`,
  `--moduix-badge-focus-ring-width`.
- `CommandPalette`: `--moduix-command-palette-group-label-color`.
- `Switch`: `--moduix-switch-thumb-translate-default`.

Править следует только docs data в `apps/docs/src/components/examples/*.tsx`; CSS contract уже
существует и менять его не требуется.

## Что намеренно не предлагается

- Не добавлять responsive object API в layout primitives: без общей responsive-prop системы это
  создаст локальный DSL ради одного компонента.
- Не добавлять `loadingText`, `spinnerPlacement`, `startElement`/`endElement` и другие prop bags
  туда, где текущая composition короче и прозрачнее.
- Не превращать popup `Content` в скрытый bundle из Portal + Positioner + Content. Текущая явная
  anatomy — важное преимущество над более закрытыми wrapper APIs.
- Не выравнивать alphabetic order примеров и названия внутренних headings отдельной задачей: это
  низкая пользовательская ценность.
- Не дробить большие Ark wrappers только из-за LOC. `ColorPicker`, `DatePicker`, `Menu`, `Select`
  и `TreeView` велики из-за количества публичных parts; разнесение по файлам без изменения API не
  упростит использование.

## Аудиты компонентов

### Accordion

**Вердикт:** оставить. TSX — тонкая Ark-обёртка без локального state; CSS использует Ark state и
runtime size variables корректно; docs покрывают controlled state, provider/context, disabled и
animation. `ItemIndicator` с default icon и `ItemBody` — полезный sugar. Новые props не нужны.

### Alert

**Вердикт:** код и визуальный API оставить; исправить только docs variables. Локальный status API,
автоматический role и `Context` дают понятный контракт без имитации несуществующего Ark primitive.
Одна recipe вместо Chakra-подобной матрицы size/palette/variant — правильная простота.

### Angle Slider

**Вердикт:** оставить. Автоматический hidden input сохраняет native form/reset и убирает частую
ошибку consumer composition; `Dial` собирает только Control + Thumb и не скрывает parts. Child
cloning здесь нужен исключительно для корректного `asChild`, поэтому упрощать его нельзя.

### Aspect Ratio

**Вердикт:** оставить. 36 строк TSX и минимальный CSS — правильный размер для root-only layout
primitive. Numeric `ratio`, `asChild`, media autofill и radius token достаточны; preset aliases не
нужны.

### Avatar

**Вердикт:** оставить. Size API, initials из `Fallback name`, refs, loading state и Ark Context
сохраняют простой и advanced paths. Docs явно отделяют удобство moduix от Ark types; нового sugar
не требуется.

### Badge

**Вердикт:** component оставить; добавить три focus-ring variables в docs. `Dot` — удачный
декоративный part, variants остаются локальными и не раздуваются до Chakra colorPalette matrix.

### Bleed

**Вердикт:** оставить. Компонент остаётся CSS/layout primitive с `asChild`, data slots и theme
lengths. Любые breakpoint objects или directional presets добавили бы больше API, чем ценности.

### Breadcrumbs

**Вердикт:** оставить. Явные semantic parts и `Path` для обычного anchor trail дают оба пути.
Автоматический collapse/ellipsis не нужен: он требует product-specific приоритетов и viewport
state, которые лучше оставить composition.

### Button

**Вердикт:** оставить. Variant/size плюс узкий `loading` API покрывают common path; custom spinner
и loading copy уже выражаются children. Не стоит добавлять Chakra-подобные `loadingText`,
`spinnerPlacement` и `spinner` props.

### Card

**Вердикт:** оставить. Anatomy и size/variant достаточно близки к привычному Chakra contract, но
layout остаётся composition-driven. Отдельный `horizontal` prop не нужен; docs показывают
производственные составы без скрытой разметки.

### Carousel

**Вердикт:** оставить. `Indicators` устраняет повторяемый pager boilerplate, а raw IndicatorGroup и
Indicator остаются доступны. CSS следует Ark orientation/state variables; большой набор примеров
оправдан реальным количеством поведения.

### Checkbox

**Вердикт:** оставить. Default checked/indeterminate icons и size — полезные visual defaults;
HiddenInput, RootProvider, context и explicit custom Control path сохранены. Дополнительный
single-node API сузил бы Ark anatomy.

### Clipboard

**Вердикт:** оставить. Default status copy и icons — ровно тот sugar, который снимает boilerplate,
не переводя Ark callback details. CSS и docs подробно объясняют copied state и custom controls.

### Close Button

**Вердикт:** оставить. Default glyph, `type="button"` и accessible-name fallback делают компонент
безопасным из коробки. Новые props не нужны: это намеренно узкий icon button.

### Collapsible

**Вердикт:** оставить. `Indicator` и `Body` убирают повторяемые icon/padding wrappers, но Root,
Content, Context и lifecycle остаются Ark-shaped. CSS open/closed animation не ломает presence.

### Color Picker

**Вердикт:** оставить. Размер TSX/CSS обусловлен большой Ark anatomy; собственных state machine
нет. Default visual children у Area/ChannelSlider/Swatch/Trigger заметно упрощают happy path, а
explicit parts сохраняют сложные color workflows.

### Combobox

**Вердикт:** оставить. `Option`, Field visuals, clear action и default indicators сокращают часто
повторяемые строки, но collection/filtering/positioning не спрятаны. Не добавлять shadcn-shaped
monolithic Command/Input/List API поверх Ark.

### Command Palette

**Вердикт:** component и дизайн оставить; добавить тесты и одну docs variable. Dialog + Combobox
остаются явными, `Panel`, `Search`, row helpers и opt-in global shortcut создают самостоятельный
moduix character. Визуально desktop/mobile состояние современное и не клиппится. Основной риск —
не implementation complexity сама по себе, а слабая regression coverage этой локальной логики.

### Container

**Вердикт:** оставить. Max-width и fluid gutter contract просты, tokenized и хорошо документированы.
Breakpoint object API не нужен.

### Date Input

**Вердикт:** оставить. `Segments` снимает locale-aware SegmentContext boilerplate, а
автоматический hidden input сохраняет form/reset. Range и explicit segment composition доступны;
добавлять formatter props поверх Ark не следует.

### Date Picker

**Вердикт:** оставить. Большой файл в основном зеркалит Ark parts. `Field`, `RangeField`, calendar
and preset helpers сокращают стандартные сценарии, но popup, calendar grids, multiple/range state и
date types остаются видимыми. Упрощение через один prop-heavy DatePicker сломало бы advanced path.

### Dialog

**Вердикт:** оставить. Portal ownership на root, explicit Backdrop/Positioner/Content и узкие
CloseIcon/Header/Body/Footer helpers — правильная середина между Ark и Chakra. Focus lifecycle,
contexts и provider path документированы.

### Drawer

**Вердикт:** оставить. Directional animation, island variant, explicit overlay anatomy и shared
CloseButton выглядят зрелыми. Не объединять Drawer с Dialog/Popover через общий config component:
семантика и responsive поведение различаются.

### Editable

**Вердикт:** оставить. Default controls и icons помогают happy path, но Preview/Input/Edit/Submit/
Cancel parts остаются доступны. `activationMode="dblclick"` и control alignment явно
документированы; дополнительный boolean API не нужен.

### Empty

**Вердикт:** оставить. Moduix-owned anatomy понятна, близка к современным empty-state patterns и не
выдаётся за Ark primitive. Явные Header/Media/Title/Description/Content parts лучше, чем prop slots.

### Field

**Вердикт:** оставить. Callable root, Ark context и локальный styleable `Item` дают хороший form
foundation. Не добавлять label/error strings на Root: composition сохраняет семантику и сложные
формы.

### Fieldset

**Вердикт:** оставить. Wrapper остаётся тонким, а legend/helper/error и disabled state принадлежат
Ark contract. Дополнительный Content wrapper не даёт заметной пользы.

### File Upload

**Вердикт:** оставить. `Items`, DropzoneIcon и preview fallbacks снимают повторение, но MIME-specific
preview и explicit parts доступны. Многочисленные `:has()` selectors описывают реальное
content-dependent item layout; механический отказ от них сделал бы TSX сложнее.

### Floating Panel

**Вердикт:** оставить. Default stage icons и CloseIcon полезны, position/resize/stage state остаются
Ark-owned. Не вводить prop-level toolbar config.

### Heading

**Вердикт:** оставить. Semantic `as`, visual size/weight, `asChild` и token variables покрывают
задачу без typographic DSL. Root alias сохраняет namespace consistency.

### Highlight

**Вердикт:** оставить. Нужны только query matching, mark styling и data slots; chunk render API
создал бы вторую модель поверх Ark без частой потребности.

### Hover Card

**Вердикт:** оставить. Explicit popup tree, root-owned portal и default ArrowTip соответствуют
семейству overlays. Composition section понятен, даже если первый подпункт не называется дословно
`Recommended composition`; отдельная косметическая миграция не нужна.

### Image

**Вердикт:** оставить. Тонкая Unpic surface с `Image.Source` и Root alias не маскирует provider
contract. Не добавлять Next-specific adapter в общий registry item.

### Image Cropper

**Вердикт:** оставить. `CropArea` собирает только Selection/Grid/handles и сохраняет raw parts.
Два `!important` на осевых handle dimensions локальны и нужны против Ark inline geometry; это не
повод переписывать весь CSS.

### Input

**Вердикт:** оставить. Разделение visual `size` и native `htmlSize` снимает HTML-name collision,
ref остаётся на input, Field integration сохранён. Value adapters и custom callbacks не нужны.

### Input Group

**Вердикт:** оставить. Небольшой size context синхронизирует Input и Button, а explicit Addon/Text/
Button лучше `startElement`/`endElement` prop bags. Нового sugar не требуется.

### Kbd

**Вердикт:** оставить. Root/Group, semantic `<kbd>`, visual tokens и data slots — достаточный
локальный primitive. Shortcut parsing или platform detection сюда добавлять не следует.

### Lightbox

**Вердикт:** оставить. Dialog contract сохранён, а Gallery и `Bind` решают реальные image/CMS
workflows. `Bind` документирован только для semantic button/link selectors, поэтому keyboard path
не теряется; перенос этой логики в Root был бы хуже.

### List

**Вердикт:** оставить. Native ul/ol semantics, marker/tone/spacing и Item дают полезную середину.
Автоматический data rendering или item renderer API превратил бы layout primitive в collection
component.

### Listbox

**Вердикт:** оставить. Filtering visuals и default indicators помогают, но selection collection и
state остаются явными. Не сливать с Select: visible listbox и popup select имеют разные UX.

### Marquee

**Вердикт:** оставить. Root нейтрален, Ark motion contract и CSS variables сохранены, consumer
владеет item visuals. Framed/card presets не нужны.

### Menu

**Вердикт:** оставить. Большой файл зеркалит submenu/checkbox/radio/context anatomy; local sugar —
только icons, shortcut/command/description и layout helpers. Не добавлять nested item config arrays.

### Native Select

**Вердикт:** оставить. Native semantics, equivalent Root alias и узкий `controlProps` contract
понятны. Не переносить popup Select API и collection abstraction на native element.

### Number Input

**Вердикт:** оставить. `Field` и default steppers сокращают стандартный control, при этом format,
scrub, form submission и Ark details остаются доступны. Size/variant matrix не нужна.

### Pagination

**Вердикт:** оставить. `Items`, default edge icons/ellipsis и accessible label дают хороший happy
path. Data slicing остаётся consumer responsibility, что правильно.

### Password Input

**Вердикт:** оставить. `Field` и default visibility icons заметно упрощают common case; explicit
Input/Control/Trigger/Indicator сохраняют password-manager, form и custom icon paths. Root-level
placeholder/value props возвращать не следует.

### Pin Input

**Вердикт:** оставить. `Inputs`, Separator и automatic native form control полезны. Локальный form
reset effect необходим из-за ownership hidden input; упрощение его удалением сломает native reset.

### Popover

**Вердикт:** оставить. Positioner/Content остаются явными, Arrow/CloseIcon только добавляют
визуальные defaults. Не делать bundled Content helper, иначе positioning и portal станут скрытыми.

### Progress Circular

**Вердикт:** оставить. Отдельный public wrapper снижает смешение linear/circular anatomy, а Ring
снимает повторяемый SVG circle setup. Ark value/state contract сохраняется.

### Progress Linear

**Вердикт:** оставить. Отдельный wrapper и narrow visual defaults понятнее универсального Progress
с branch props. Дополнительный percentage formatter не нужен — ValueText уже composable.

### QR Code

**Вердикт:** оставить. Ark SVG/download behavior, RootProvider и useQrCode доступны; styling и
data slots не добавляют state. Form integration для display component не нужна.

### Radio Group

**Вердикт:** оставить. `Option`, size и automatic native input сокращают обычный labelled item,
explicit parts остаются. Не возвращать старые flat aliases — namespace contract проще.

### Rating Group

**Вердикт:** оставить. `Items`, default star и size полезны, half-rating и custom indicator доступны
через Ark path. Новая icon/precision abstraction не требуется.

### Scroll Area

**Вердикт:** оставить. Variant `always`, fade masks и styled scrollbars — заметный visual sugar;
Viewport/Scrollbar/Thumb/Corner остаются Ark parts. Не возвращать старый high-level scroll API.

### Segment Group

**Вердикт:** оставить. `Items` собирает фиксированный standard item tree и автоматически сохраняет
native form input; explicit per-item path доступен. Variant explosion не нужен.

### Select

**Вердикт:** оставить. `Field`, `Option`, default indicators и clear action снимают boilerplate,
но collection, Positioner, Content и RootProvider остаются явными. Не добавлять data/options prop,
который спрятал бы Ark collection.

### Separator

**Вердикт:** оставить. Orientation/variant/size — понятный локальный visual surface над semantic
separator. Дополнительные label/children modes не нужны.

### Sidebar

**Вердикт:** оставить. Это один из сильнейших отличительных компонентов: реальный Ark Splitter,
256/48 px defaults, side-aware Trigger, Label contract и Tooltip для collapsed rail. Визуально оба
состояния аккуратны. Не копировать shadcn cookie/provider/mobile state machine: mobile drawer уже
показан как отдельная composition.

### Signature Pad

**Вердикт:** оставить. `Canvas`, default clear control и hidden form ownership дают простой путь,
explicit Ark parts сохраняют custom toolbars. Не переводить callback details в data URL prop API.

### Simple Grid

**Вердикт:** оставить. Fixed columns и intrinsic auto-fit покрывают две реальные CSS-grid задачи.
Responsive object API без общей system-wide модели добавлять не стоит.

### Skeleton

**Вердикт:** оставить. `boxSize` и tokenized `borderRadius` — узкий полезный sugar. Circle/Text
components легко выражаются composition и не требуют новых exports.

### Slider

**Вердикт:** оставить. `Thumbs` убирает повторение range thumbs и сохраняет explicit custom path;
HiddenInput, marks, provider/context и collision behavior доступны. Большая docs page соответствует
реальной ширине Ark API.

### Spinner

**Вердикт:** оставить. Default status semantics, decorative mode, size и replaceable ring делают
standalone spinner безопасным. Loading button остаётся composition с Button, что лучше скрытой
связки.

### Split Button

**Вердикт:** component оставить; исправить CSS Properties docs. Shared Button variant/size и default
Menu chevron — достаточный sugar; action и menu structure остаются явными. Нового поведения не
требуется.

### Splitter

**Вердикт:** оставить. Wrapper сохраняет Ark panel sizing, collapse, keyboard и context APIs; default
resize indicator — полезная визуальная мелочь. Не добавлять layout-specific panel aliases сюда —
для navigation уже есть Sidebar.

### Stack

**Вердикт:** оставить. Direction/gap/alignment и `asChild` — достаточный flex primitive. Responsive
objects и divider rendering не нужны.

### Steps

**Вердикт:** оставить. Default numeric/completed Indicator помогает common path, остальная anatomy
и Ark state явны. Старый one-based Stepper API не возвращать.

### Swap

**Вердикт:** оставить. Четыре маленькие CSS recipes плюс open custom animation hook дают узнаваемый
эффект без JS events/state. Специализированный button wrapper не нужен.

### Switch

**Вердикт:** component оставить; добавить одну docs variable. Size и automatic Thumb — правильный
visual sugar; label, HiddenInput и custom Control composition остаются видимыми.

### Table

**Вердикт:** оставить. Native table anatomy, `Empty`, `numeric` и `htmlWidth` полезны и не превращают
компонент в data grid. Sorting/filtering/virtualization должны оставаться отдельной consumer или
recipe задачей.

### Tabs

**Вердикт:** оставить. Local variants и CSS defaults достаточны; Indicator не вставляется скрыто,
поэтому Ark composition остаётся честной. Не добавлять tab data arrays.

### Tag

**Вердикт:** оставить. Explicit parts и CloseTrigger понятнее flat aliases; variants остаются в
языке moduix tokens. Select/tag state не должен жить внутри визуального Tag.

### Tags Input

**Вердикт:** оставить. `Items`, default delete/clear controls и automatic hidden input сокращают
основной form path. Manual reset listener оправдан internalized native control; serializer/value
translation добавлять не надо.

### Text

**Вердикт:** оставить. Constrained semantic `as`, tone/variant, `asChild` и variables дают простой
typography primitive. Не расширять `as` до произвольного component type — для этого уже есть
`asChild`.

### Textarea

**Вердикт:** оставить. Прямой `Field.Textarea`, native `onChange`, Ark `autoresize`, ref и styling
hook — максимально простой контракт. Отсутствие `.Root` здесь намеренно: это single native control,
а не namespace family.

### Timer

**Вердикт:** оставить. `Segments`, default action icon sizing и tabular display помогают обычному
timer UI, state остаётся Ark-owned. Formatter/config props не нужны.

### Toast

**Вердикт:** оставить. Ark toaster contract, contextual Title/Description и default CloseTrigger
дают композиционный API без Sonner-like global opinion layer. Не заменять его competitor API ради
знакомства.

### Toggle

**Вердикт:** оставить. Variant/size и short root достаточно; pressed state и `asChild` остаются
Ark-shaped. Icon-only accessibility уже выражается normal aria-label.

### Toggle Group

**Вердикт:** оставить. Item наследует visual defaults Root, а controlled/multiple/context paths
сохранены. Не добавлять data-driven items prop.

### Tooltip

**Вердикт:** оставить. `Body` снимает только Positioner + Content ceremony, raw parts и positioning
остаются доступны; default ArrowTip безопасен. Это хороший пример допустимого sugar.

### Tour

**Вердикт:** оставить. `Body`, `ActionList`, CloseIcon и default ArrowTip сокращают типовой step UI,
а `useTour`, explicit overlay parts и Ark action objects сохраняются. Визуально dialog step и
spotlight layer выглядят завершённо. Нестандартные имена composition subheadings содержательно
понятны и не требуют отдельной миграции.

### Tree View

**Вердикт:** оставить. `Node` заметно упрощает recursive renderer, не удаляя NodeProvider и raw
branch/item parts. Default file/folder/checkbox icons полезны; collection, selection, loading и
rename остаются Ark-owned.

### Typeset

**Вердикт:** оставить. CSS-first contract чистый: 372 строки без raw colors, px hacks, `!important`
или `:has()`, с low-specificity `:where()` и локальным `.scroll`. `Typeset.Scroll`, `asChild` и
`data-not-typeset` отличают moduix от css-only shadcn/typeset, не усложняя основной путь. Визуальный
ритм в docs выглядит современно; presets/prop-driven typography не нужны.

## Upstream sources

Источники проверены 2026-08-01:

- [Ark UI full current documentation](https://ark-ui.com/llms-full.txt)
- [Ark UI npm package metadata](https://registry.npmjs.org/@ark-ui/react/latest)
- [Chakra UI v3 full documentation](https://chakra-ui.com/llms-full.txt)
- [shadcn/ui documentation index](https://ui.shadcn.com/llms.txt)
- [shadcn Accordion](https://ui.shadcn.com/docs/components/accordion)
- [shadcn Command](https://ui.shadcn.com/docs/components/command)
- [shadcn Sidebar](https://ui.shadcn.com/docs/components/sidebar)
- [shadcn Typeset](https://ui.shadcn.com/docs/typeset)
- [shadcn Table](https://ui.shadcn.com/docs/components/table)
- [shadcn Empty](https://ui.shadcn.com/docs/components/empty)
- [Rspress current documentation index](https://rspress.rs/llms.txt)

## Acceptance criteria для последующих правок

Если выполнять P1/P2 отдельно:

1. Не менять public component API и CSS behavior без падающего теста.
2. Для docs variables сверить массивы с `packages/react/src/styles/variables-moduix.css` и оставить
   стандартный CSS Properties UI.
3. Для `CommandPalette` добавить только focused behavior tests; не снимать Ark ownership и не
   дублировать Dialog/Combobox state.
4. После изменений выполнить validation matrix из `AGENTS.md`; registry rebuild нужен только если
   изменится shipped source в `packages/react`.
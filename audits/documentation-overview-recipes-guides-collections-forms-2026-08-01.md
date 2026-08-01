# Аудит документации: Overview, Recipes, AI, Guides, Collections и Forms

Дата аудита: 1 августа 2026 года.

Охват: все 35 страниц, перечисленные в `apps/docs/docs/en/docs/_meta.json` внутри разделов
Overview, Recipes, AI, Guides, Collections и Forms.

## Статус после исправлений

Разделы «Нужно исправить» ниже фиксируют состояние документации на момент исходного аудита, а не
список незавершённых задач. После исправлений проведён второй технический и редакторский проход по
каждой странице. Примеры сверены с package exports, registry manifest, shipped CSS, установленными
типами и актуальной upstream-документацией. Recipes в sidebar отсортированы по алфавиту, а
runnable-примеры Collections используют компоненты moduix там, где это не скрывает семантику
изучаемого collection API.

Второй проход отдельно устранил неточный корневой импорт npm-пакета, расхождение AI-страницы с
реальными Copy/Open controls, преувеличенное обещание полного token reference, неверное описание
`resetSelection()`, неточные callback details `useAsyncList` и отсутствие `aria-current` у активных
recipe links. В avatar-рецепте по продуктовому решению сохранены визуальные fixture-фотографии;
страница прямо просит заменить их на собственный источник перед production. Пользовательская
документация не фиксирует версию Ark UI: установка и обновление всегда ведут к актуальной
совместимой версии.

Публичная страница Formisch намеренно не привязана к статусу конкретного релиза: она описывает
актуальный пользовательский контракт и ссылается на canonical documentation.

## Итог

После исправлений страницы дают короткий рекомендуемый путь, затем объясняют production boundary:
что предоставляет moduix, что принадлежит Ark UI и что должно остаться в приложении. Auth и upload
recipes теперь явно покрывают pending/error/retry и server-owned поведение; Collections начинают с
runnable moduix UI, не выдавая data hooks за готовые accessible widgets; Guides используют только
существующие exports, variables и state contracts.

Известных технических противоречий или редакторских блокеров в проверенном охвате не осталось.
Документация сохраняет сильную сторону moduix — точные Ark-shaped contracts — и быстрее приводит
пользователя от выбора сценария к рабочему, безопасно адаптируемому примеру.

## Проверенная база

- Проверены 35 MDX-страниц, 82 внутренние ссылки, 40 уникальных внешних URL и 34 ссылки на
  подключаемые source/snippet-файлы.
- Все внутренние маршруты и все 34 source/snippet-файла существуют.
- Все 40 реальных внешних ссылок доступны. Шаблон registry URL
  `https://moduix.dev/r/react/{name}.json` отдельно исключён из HTTP-проверки как template.
- Все 42 упоминания package import paths существуют в `packages/react/package.json`.
- Все упомянутые registry items существуют в `registry/registry.json`.
- Все 274 точных упоминания `--moduix-*` variables существуют в shipped CSS; wildcard prefixes
  проверены как группы, а не как копируемые имена переменных.
- `npm run tsc:check` проходит для `@moduix/react` и docs app.
- Актуальная локальная база: `@moduix/react`, `@ark-ui/react`, `react-hook-form`,
  `@tanstack/react-form` и `@formisch/react`.
- Актуальные Ark UI collection pages и forms guide сверены онлайн. Collection imports и основные
  form integration contracts совпадают с текущей Ark UI.
- В браузере проверены `Changelog`, `App header` и `Forms`. Якорь
  `#v200--july-19-2026` действительно корректен; Rspress генерирует H1 для `Changelog` из
  frontmatter. Desktop и mobile layouts не создают горизонтальный overflow документа, а проверенные
  страницы не оставили warnings или errors в консоли.
- После второго прохода дополнительно проверены `Quick start`, `AI`, `Recipes`, `Async List`,
  `List Selection` и `Expandable avatar group`: runnable-примеры отрисовываются, новые controls и
  avatars видимы, горизонтального overflow и console warnings/errors нет.
- Для benchmark просмотрены актуальные installation/forms/composition материалы shadcn и Chakra.
  Их сильные стороны — быстрый выбор сценария, runnable production examples и короткие pitfall
  callouts. Сильная сторона moduix — более точное объяснение Ark contracts и ownership.

## Приоритеты исходного аудита

### P1 — исправить в первую очередь

1. Заменить несуществующий token в `Composition Patterns`.
2. Синхронизировать `Changelog` с выпущенными версиями после `2.0.0`.
3. Разделить patch/minor update и major migration в `Updating`; `npm update` не должен выглядеть как
   универсальная команда для перехода на новый major.
4. Добавить production states в auth/upload recipes: pending, success, server error, retry и
   route-specific failure states.
5. Добавить canonical upstream links на все form-library pages.

### P2 — следующий проход по качеству

1. Дать каждой Collections page один законченный runnable пример, связанный с `Select`, `Combobox`,
   `Listbox` или `TreeView`.
2. Добавить в `Quick start` короткий default path, success check и troubleshooting.
3. Сделать `Components` и `Recipes` настоящими chooser pages: категории, ограничения и подсказки
   «когда выбрать что».
4. Добавить runnable advanced examples для field arrays, invalid focus и async submission в Forms.
5. Сократить механическое дублирование upstream API там, где важнее moduix-specific workflow.

### P3 — редакторская и инфраструктурная полировка

1. Обновить redirecting URL `rspack.dev` на `rspack.rs`.
2. В production заменять fixture avatar URLs на стабильный application-owned источник.
3. Убрать жёстко прошитые количества вроде «13 supported surfaces» либо проверять их тестом.
4. Унифицировать sentence case в названиях guides и recipes, не меняя уже опубликованные routes.

## Рекомендуемый стандарт для этих страниц

Не каждой странице нужны все секции, но пользователь должен быстро получить ответы в таком порядке:

1. Что решает страница и когда этот путь не нужен.
2. Самый короткий рабочий пример.
3. Как адаптировать пример к данным, роутеру или серверу.
4. Loading, empty, success, error, reset и retry states, если они возможны.
5. Accessibility и native form semantics там, где они относятся к сценарию.
6. Ownership: что предоставляет moduix, что остаётся приложению, что принадлежит Ark/upstream.
7. Troubleshooting и связанные страницы.

Это позволит сохранить преимущество moduix — точные Ark-shaped contracts — и добавить то, за что
пользователи ценят лучшие страницы shadcn: быстрый путь от примера к реальному продукту.

## Overview

### Introduction

Файл: `apps/docs/docs/en/docs/index.mdx`.

**Уже хорошо:** позиционирование конкретное и без ложного обещания совместимости с shadcn. Таблица
ownership models, объяснение Ark-backed поведения и маршруты `Start Here` / `Continue With` дают
хорошую карту сайта. Отдельно хорошо, что документация называет callback detail objects,
`asChild`, native form controls и state attributes уже на входе.

**Нужно исправить:** до первого практического действия читатель проходит через много терминов. Фраза
про «AI-assisted customization» звучит маркетингово и слабее остального текста. `Acknowledgements`
занимает заметную часть первой страницы и отдаляет следующий шаг.

**Как исправить:** добавить сразу после intro короткий блок «Render your first component» с
package import и ссылкой на полный `Quick start`; ownership и архитектурные детали оставить ниже.
`Acknowledgements` можно свернуть или вынести на отдельную project page. Заменить AI-формулировку на
проверяемое преимущество: source ownership и локальный diff.

**Приоритет:** P2.

### Changelog

Файл: `apps/docs/docs/en/docs/changelog.mdx`.

**Уже хорошо:** breaking changes отделены от общего описания, есть migration steps, SemVer policy и
явная поддержка React 18/19 и синхронизация с актуальными релизами Ark UI. Browser check подтвердил корректный H1 и рабочий якорь
релиза.

**Нужно исправить:** package version уже `2.2.3`, но журнал заканчивается на `2.0.0`. Пользователь не
может понять, что изменилось в `2.1`, `2.2` и patch releases. Migration to v2 перечисляет классы
изменений, но не даёт списка самых затронутых компонентов или before/after mappings.

**Как исправить:** добавить записи для всех публичных релизов после `2.0.0` либо явно объявить эту
страницу major-only changelog и дать ссылку на полный release log. Для major entries использовать
одинаковую схему: Added, Changed, Fixed, Breaking, Affected components, Package/Registry action.
Добавить 3–5 наиболее частых before/after migration examples.

**Приоритет:** P1.

### Components

Файл: `apps/docs/docs/en/docs/components.mdx`.

**Уже хорошо:** intro правильно называет компоненты styled Ark wrappers, а `Before you compose`
отправляет к setup, composition, themes/tokens и recipes. Встроенная gallery даёт визуальный вход в
каталог.

**Нужно исправить:** narrative часть слишком тонкая для chooser page. Не объяснено, как искать между
близкими компонентами, чем component отличается от recipe/utility и где видеть stability или
form/collection capabilities.

**Как исправить:** сгруппировать gallery по product need: Inputs, Selection, Navigation, Overlays,
Feedback, Data display, Layout. Добавить компактные chooser links для частых развилок: Select vs
Combobox, Dialog vs Drawer, Menu vs Popover, Table vs Data Table recipe. В карточках можно показать
короткие capability badges, не превращая страницу в API catalog.

**Приоритет:** P2.

### Quick start

Файл: `apps/docs/docs/en/docs/quick-start.mdx`.

**Уже хорошо:** две ownership models сравниваются до команд. Package path объясняет peer runtime,
required styles и portal layering; registry path содержит `components.json`, Vite/Rsbuild aliases,
search/view/dry-run и реальные import paths. Все package exports и registry names из страницы
существуют.

**Нужно исправить:** страница одновременно служит quick start и полной installation reference,
поэтому первый success state находится слишком далеко. Нет короткого prerequisites блока,
проверки «установка действительно работает» и troubleshooting. Узкий iOS 26 workaround прерывает
основной setup flow и выглядит как обязательный шаг без объяснения симптома.

**Как исправить:** вверху дать рекомендуемый трёхшаговый package path: install, import stylesheet,
render Button. Затем разделить подробности на Package reference и Copy-owned reference. Добавить
Prerequisites и Troubleshooting: missing styles, unresolved alias, overlay under app content,
duplicate stylesheet, peer mismatch. iOS workaround перенести в callout «Only if you see…».
Для registry URL с `{name}` явно подписать, что это template, а не URL для открытия.

**Приоритет:** P2.

### Themes

Файл: `apps/docs/docs/en/docs/themes.mdx`.

**Уже хорошо:** plain CSS model, порядок layers, preset comparison, package/registry setup и custom
theme показаны ясно. Правильно сказано, что `Calm` — foundation и не требует отдельного preset
import. Portal inheritance объяснено рядом с root attributes.

**Нужно исправить:** preset chooser описывает размеры и настроение, но не помогает выбрать по
продуктовому сценарию и не объясняет, что название `Contrast` не является гарантией конкретного
WCAG contrast level. Нет короткого примера runtime theme switching.

**Как исправить:** добавить колонки Best for и Accessibility note. Для Contrast использовать
формулировку про stronger visual separation, не про compliance. Добавить минимальный theme switch,
который меняет `data-moduix-theme`, и сразу сослаться на `Dark mode` для color-scheme ownership.

**Приоритет:** P2.

### Tokens

Файл: `apps/docs/docs/en/docs/tokens.mdx`.

**Уже хорошо:** token hierarchy, fallback logic, existing design-system mapping, density scale,
mass overrides и portal scope объяснены лучше, чем в большинстве component libraries. Страница
отделяет Ark runtime variables от public moduix tokens и не обещает управление чужими tokens.

**Нужно исправить:** объём reference UI велик, а workflow «как найти правильный token для одной
задачи» остаётся неявным. Wildcard prefixes визуально похожи на копируемые token names. Неясно, где
canonical source для component-specific variables: здесь или на component page.

**Как исправить:** добавить короткое дерево решения: theme primitive → semantic alias → family
default → component alias. Явно маркировать prefixes как prefixes, а не variables. Сказать, что эта
страница — system-level reference, а component page — canonical source для локальных aliases и
state hooks. Если reference генерируется, показывать package version рядом с ним.

**Приоритет:** P2.

## AI

### AI guide

Файл: `apps/docs/docs/en/docs/ai.mdx`.

**Уже хорошо:** страница разделяет page-level Markdown context, `llms.txt`, `llms-full.txt`, public
Skill, shadcn MCP и CLI fallback. Команды discovery → view → dry-run → diff соответствуют текущему
shadcn workflow и не разрешают агенту без проверки перезаписывать copy-owned source.

**Нужно исправить:** исходная версия обещала меню **Open** и клиенты Cursor/Scira на каждой странице,
хотя общий theme всегда показывает только **Copy Markdown**, а **Open** доступен только component
pages и содержит другой набор действий. Package-managed imports также были описаны как корневой
`@moduix/react` import, которого нет в public package exports.

**Как исправлено:** общий путь теперь начинается с **Copy Markdown** и canonical `.md` URL; точный
состав **Open** описан только для component pages. Package workflow использует
`@moduix/react/*`, пример — `@moduix/react/dialog`. MCP, Skills.sh и CLI команды повторно сверены с
актуальными официальными страницами.

**Приоритет:** P1, исправлено.

## Recipes

### Browse recipes

Файл: `apps/docs/docs/en/docs/recipes.mdx`.

**Уже хорошо:** карточки короткие, конкретные и ведут к copy-owned examples. Набор покрывает app
shell, auth, uploads, data и compact identity pattern, не смешивая их с primitives.

**Нужно исправить:** плоский список не помогает выбрать последовательность и не сообщает, какой
recipe требует сервер, router, extra dependency или отдельный mobile counterpart.

**Как исправить:** сгруппировать карточки в App shell, Authentication, Data, Files и Identity.
Добавить неброские метки: server integration required, desktop-first, mobile, TanStack dependency.
В intro дать короткое правило: recipe копируется вместе с CSS, но бизнес-логика остаётся у
приложения.

**Приоритет:** P2.

### App header

Файл: `apps/docs/docs/en/docs/app-header.mdx`.

**Уже хорошо:** рецепт полностью перестроен как минималистичный одноуровневый header. В нём меньше
визуального шума, active route использует `aria-current`, все действия являются настоящими links
или menu controls, avatar имеет image fallback, а mobile navigation не исчезает, а переезжает в
доступное меню.

**Нужно исправить:** готовых route и account contracts у универсального рецепта быть не может;
fixture values должны остаться явно обозначенными как точки интеграции приложения.

**Как исправить:** выполнено. Раздел Adapt it to your app связывает каждую fixture с router,
workspace и account data, объясняет `asChild`, а Responsive behavior задаёт границу между compact
menu и отдельным Mobile drawer navigation.

**Приоритет:** выполнено.

### Data Table

Файл: `apps/docs/docs/en/docs/data-table.mdx`.

**Уже хорошо:** одна из лучших страниц раздела. Она правильно называет Data Table pattern, а не
экспортируемым component, отделяет client и server transforms, объясняет stable references,
durable row IDs, URL/query ownership и native table accessibility. Runnable examples и ссылки на
TanStack хорошо подобраны.

**Нужно исправить:** большой copy-ready recipe состоит примерно из 570 строк и может скрыть
минимальный mental model. Не хватает готового production-state pattern для loading, empty, error и
refetch. Virtualization упомянута, но не показано, как сохранить table semantics.

**Как исправить:** визуально разделить Minimal table и Production table. Добавить компактный
Async states пример с caption/status, empty row с корректным `colSpan`, retry и disabled pagination.
Virtualization оставить advanced section с прямой ссылкой на отдельный пример, а не расширять
основной recipe ещё сильнее.

**Приоритет:** P2.

### File upload manager

Файл: `apps/docs/docs/en/docs/file-upload-manager.mdx`.

**Уже хорошо:** страница честно говорит, что recipe управляет только local list. Source уже содержит
rejected-file feedback, `aria-live` count и понятные remove labels.

**Нужно исправить:** `Connect an upload` слишком короток для главного production boundary. Нет
progress, cancel, retry, partial failure, server rejection, duplicate file и security guidance.

**Как исправить:** добавить runnable controlled upload example: accepted file → pending → progress →
success/error, с per-file retry/remove. Показать, где читать `details.acceptedFiles`, где хранить
server IDs и как очищать local file только после подтверждения. Отдельным callout напомнить, что
client MIME/size checks не заменяют server validation.

**Приоритет:** P1.

### Forgot password

Файл: `apps/docs/docs/en/docs/forgot-password.mdx`.

**Уже хорошо:** минимальная форма имеет visible label, `type="email"`, `autocomplete="email"` и
ясный submit boundary.

**Нужно исправить:** нет pending, generic success, request error и защиты от account enumeration.
Пользователь видит только пустой callback contract.

**Как исправить:** добавить route example с disabled submit, form-level `role="alert"` для network
failure и одинаковым success message независимо от существования email. Описать ожидаемый
`onSubmit`/action contract и сохранение введённого значения при retry.

**Приоритет:** P1.

### Login simple

Файл: `apps/docs/docs/en/docs/login-simple.mdx`.

**Уже хорошо:** native names, email/current-password autocomplete, visible labels, remember-me и
recovery links делают happy path корректным и понятным.

**Нужно исправить:** отсутствуют pending/error states, объяснение remember-me semantics и пример
перенаправления после входа. Recipe не предупреждает, что authentication/security принадлежат
серверу.

**Как исправить:** показать async route adapter с generic credentials error, disabled submit и
safe redirect. Объяснить, что checkbox передаёт preference, а cookie/session lifetime определяет
сервер. Не добавлять auth framework внутрь самого recipe.

**Приоритет:** P1.

### Mobile drawer navigation

Файл: `apps/docs/docs/en/docs/mobile-drawer-navigation.mdx`.

**Уже хорошо:** CloseTrigger around links, Escape/backdrop/focus behavior Ark и mobile-specific
scope объяснены правильно. Preview компактный и не создаёт page overflow.

**Нужно исправить:** остаются fixture hash links и статический active marker. Не показана router
composition, `aria-current`, breakpoint ownership и связь с desktop Sidebar.

**Как исправить:** добавить router-link example через `asChild`, active-link rule и короткую схему
Desktop Sidebar + Mobile Drawer. Указать, что breakpoint, route data и восстановление active route
принадлежат приложению.

**Приоритет:** P2.

### Reset password

Файл: `apps/docs/docs/en/docs/reset-password.mdx`.

**Уже хорошо:** оба поля имеют visible labels и `autocomplete="new-password"`; страница честно
говорит, что verified link и submit handler принадлежат route.

**Нужно исправить:** нет password requirements, matching validation, invalid/expired token,
pending, success и server policy errors. Native `required` проверяет только пустые значения.

**Как исправить:** добавить минимальный schema/native custom validation example, а также три route
state: token invalid, submitting, password changed. Ошибки policy показывать у password field,
expired token — как page-level state, network failure — как retryable form alert.

**Приоритет:** P1.

### Sidebar dashboard

Файл: `apps/docs/docs/en/docs/sidebar-dashboard.mdx`.

**Уже хорошо:** scope явно desktop-first; collapse, keyboard resize, nested navigation, tooltips и
workspace menu дают полезный составной example. Страница не притворяется mobile solution.

**Нужно исправить:** не показаны controlled/provider state, persistence ширины/свёрнутости, router
active state и связь с mobile recipe.

**Как исправить:** добавить Composition with mobile link и отдельный Persistence snippet с
SSR-safe чтением сохранённого состояния. Для router integration использовать `aria-current` и
application route data вместо ручного `data-active`.

**Приоритет:** P2.

### Sign up

Файл: `apps/docs/docs/en/docs/sign-up.mdx`.

**Уже хорошо:** visible labels, autocomplete values, email type и required terms control создают
правильную native baseline. Страница явно говорит, что authentication остаётся приложению.

**Нужно исправить:** password matching и requirements только упомянуты, но не показаны. Нет
pending, duplicate email, form-level failure и success/verification handoff.

**Как исправить:** добавить production adapter с matching/password policy validation, field-level
duplicate email error и disabled submit. После success показать переход к Verification code, не
встраивая конкретный auth provider.

**Приоритет:** P1.

### Verification code

Файл: `apps/docs/docs/en/docs/verification-code.mdx`.

**Уже хорошо:** `PinInput` даёт native form value, mobile OTP autofill, keyboard flow и понятную
локальную ошибку для неполного кода. Страница объясняет `FormData` и отсутствие fake server.

**Нужно исправить:** нет invalid/expired code, pending, resend cooldown, retry count и перехода
после success. Локальная six-digit проверка выглядит почти полной, хотя серверная часть важнее.

**Как исправить:** добавить route-state table и runnable adapter: incomplete → local error, invalid →
field error, expired → resend action, network failure → form alert, success → redirect. Resend
таймер должен иметь доступный status text и не полагаться только на disabled button.

**Приоритет:** P1.

### Expandable avatar group

Файл: `apps/docs/docs/en/docs/expandable-avatar-group.mdx`.

**Уже хорошо:** group label, per-person button label, keyboard focus и non-essential tooltip
описаны корректно. CSS-only motion и semantic-control advice — хорошая граница recipe.

**Нужно исправить:** avatar images загружаются с внешнего Unsplash CDN, что добавляет сетевую
нестабильность и tracking surface. Нет поведения для большого количества участников, reduced
motion и узкого контейнера.

**Как исправить:** использовать project-owned/local images, добавить `+N` overflow pattern и
`prefers-reduced-motion` note. Показать, когда avatar должен быть link, button или неинтерактивным
элементом; tooltip не должен создавать интерактивность сам по себе.

**Принятое решение:** сохранить визуальные Unsplash fixtures в preview и явно попросить
пользователя заменить URLs на собственный источник перед production.

**Приоритет:** P2.

## Guides

### Animations

Файл: `apps/docs/docs/en/docs/animations.mdx`.

**Уже хорошо:** shared и component-local contracts, portal scope, entry/exit symmetry, Ark state,
reduced motion, Drawer/Toast exclusions и `present` объяснены очень точно. Есть live playground и
готовые recipes.

**Нужно исправить:** длинная серия почти одинаковых CSS blocks тяжело сканируется. Число «13
supported surfaces» и вручную перечисленные prefixes могут устареть независимо от CSS.

**Как исправить:** оставить 3 рекомендуемых recipes видимыми, остальные перенести в searchable
gallery/collapsible reference. Для каждого recipe добавить одну строку «best for / avoid for».
Список surfaces и prefixes генерировать из public token metadata либо проверять тестом.

**Приоритет:** P2.

### Composition Patterns

Файл: `apps/docs/docs/en/docs/composition-patterns.mdx`.

**Уже хорошо:** customization ladder, explicit anatomy, `asChild`, shared `ids`, re-export first,
narrow wrappers, detail objects и RootProvider state ownership создают сильный guide. Это одна из
страниц, где moduix уже яснее Chakra и shadcn.

**Нужно исправить:** CSS example использует несуществующий
`--moduix-border-color-subtle`; из-за undefined `var()` копируемый border declaration становится
invalid. В wrapper section дважды повторена одна мысль. Не хватает короткого checklist про ref,
props, event composition и semantic child.

**Как исправить:** заменить token на `--moduix-color-border`. Сжать повтор и добавить checklist:
forward ref, spread remaining props, preserve callback details, keep one semantic child for
`asChild`, do not render Root with RootProvider for one state instance.

**Приоритет:** P1.

### Dark mode

Файл: `apps/docs/docs/en/docs/dark-mode.mdx`.

**Уже хорошо:** приложение владеет preference, moduix реагирует на root attribute; portal
inheritance, SSR flash, preset independence и scoped preview описаны чётко.

**Нужно исправить:** нет законченного theme-toggle example с system preference, persistence и
accessible label. Читатель понимает contract, но всё ещё должен самостоятельно собрать обычный
workflow.

**Как исправить:** добавить маленький framework-agnostic example: resolve system/light/dark, менять
attribute, сохранять preference, выполнять early initialization. Для framework-specific SSR
решений дать ссылки, а не раздувать основной guide.

**Приоритет:** P2.

### Right-to-left (RTL)

Файл: `apps/docs/docs/en/docs/rtl.mdx`.

**Уже хорошо:** нативный `dir` и Ark locale context разделены правильно; есть Arabic Select,
portal scope, logical properties и release checklist.

**Нужно исправить:** не рассмотрены mixed-direction values, LTR identifiers внутри RTL UI,
mirroring directional icons и автоматизированная regression check.

**Как исправить:** добавить callout про `dir="ltr"`/`dir="auto"` для email, URL, code и IDs;
разделить icons, которые зеркалируются, и icons с физическим направлением. Дать короткий visual/
keyboard test recipe для одного RTL locale.

**Приоритет:** P2.

### Styling

Файл: `apps/docs/docs/en/docs/styling.mdx`.

**Уже хорошо:** одна component composition показана в CSS Modules, Panda и Tailwind; reader видит,
что API не зависит от styling tool. Override ladder и `data-slot` как escape hatch сформулированы
правильно.

**Нужно исправить:** три большие реализации одной UI задачи делают страницу тяжёлой. Не описаны
import order, cascade/specificity и базовая диагностика ситуации «class есть, style не победил».

**Как исправить:** оставить CSS Modules как основной runnable path, Panda/Tailwind поместить в tabs
или отдельные recipes. Добавить troubleshooting table: foundation not imported, wrong part,
portalled part outside scope, token overridden earlier, state attribute on another part, selector
specificity.

**Приоритет:** P2.

### Updating and migration

Файл: `apps/docs/docs/en/docs/updating.mdx`.

**Уже хорошо:** package-managed и copy-owned updates разделены; `view`, `dry-run`, `diff`, preset
updates и major migration описаны без обещания автоматического merge.

**Нужно исправить:** `npm update @moduix/react @ark-ui/react` уважает существующие version ranges и
не является явной командой major upgrade. Нет clean-branch/backup шага, rollback и checklist после
registry merge.

**Как исправить:** разделить «Update within current range» и «Install a chosen/new major» с явными
командами и объяснением lockfile. Перед registry add рекомендовать commit/clean working tree. После
update перечислить typecheck, tests, affected component pages, styles, generated shared files и
visual smoke test. Добавить короткий rollback path.

**Приоритет:** P1.

### Utilities

Файл: `apps/docs/docs/en/docs/utilities.mdx`.

**Уже хорошо:** chooser table, точные Ark links, runnable examples и `When to stay in moduix`
удерживают правильную ownership boundary. Presence и EnvironmentProvider объяснены особенно хорошо.

**Нужно исправить:** формулировка о focus behavior для dialog, drawer, popover, menu и tooltip может
быть прочитана как одинаковый focus-management contract, хотя эти primitives решают разные задачи
и Tooltip не является focus trap. Exact import paths видны не для каждой строки chooser table.

**Как исправить:** заменить общий тезис на «use the focus behavior documented by that component;
do not add FocusTrap around it by default». Для каждой recommended utility показать exact import
рядом с первым example. Добавить version/ownership note: это Ark API и его нужно сверять с direct
dependency version.

**Приоритет:** P1 для wording, P2 для структуры.

## Collections

### Collections

Файл: `apps/docs/docs/en/docs/collections.mdx`.

**Уже хорошо:** direct dependency, import entrypoint, chooser table и ownership boundary объяснены
очень ясно. Отдельно полезно предупреждение, что Select/Combobox/Listbox уже владеют selection.

**Нужно исправить:** нет одного первого end-to-end example, который связывает collection object с
реальным moduix component. Для новичка разница между collection data, selection state и rendered
component остаётся абстрактной.

**Как исправить:** добавить 25–30 строк runnable Select example и маленькую схему: application data →
Ark collection → moduix component → selected values. После этого chooser table будет читаться
значительно легче.

**Приоритет:** P2.

### Async List

Файл: `apps/docs/docs/en/docs/async-list.mdx`.

**Уже хорошо:** `autoReload`, cancellation signal, load contract, filtering, cursor pagination,
server/client sorting, dependencies, error и retry behavior покрыты подробно. Примеры совпадают с
текущей Ark UI и компилируются.

**Нужно исправить:** страница показывает hook fragments, но не законченный accessible UI со
loading/empty/error/load-more states. API tables дублируют upstream и требуют ручной синхронизации.

**Как исправить:** добавить один runnable Combobox/Listbox example с debounce, `aria-live` loading,
empty result, retry и load more. Полный method inventory либо генерировать/проверять по типам, либо
сократить до методов, нужных moduix workflow, оставив direct Ark reference canonical.

**Приоритет:** P2.

### List Collection

Файл: `apps/docs/docs/en/docs/list-collection.mdx`.

**Уже хорошо:** custom item mappings, disabled values, queries, traversal, typeahead, immutable
updates, React-managed collections и locale-aware filtering описаны точно и последовательно.

**Нужно исправить:** exhaustive API идёт раньше нескольких практических задач и конкурирует с Ark
reference. Typeahead `searchState` и большой update table могут перегрузить пользователя, которому
нужен только Select.

**Как исправить:** начать с runnable Select/Combobox recipes: static options, custom objects,
grouping/disabled, React filtering. Остальные методы оставить в compact API reference после задач.
Явно отметить typeahead section как advanced custom-interface path.

**Приоритет:** P2.

### List Selection

Файл: `apps/docs/docs/en/docs/list-selection.mdx`.

**Уже хорошо:** страница прямо говорит, что hook не предоставляет roles, keyboard interaction,
focus и labels, и советует Listbox для стандартного pattern. Disabled, multiple, range и collection
change behavior описаны аккуратно.

**Нужно исправить:** basic custom list всё равно может подтолкнуть к созданию неполной accessible
listbox. Нет runnable example для действительно подходящего custom use case.

**Как исправить:** сделать предупреждение «Prefer Listbox» визуально сильнее. В качестве первого
example использовать семантически простой checklist/native-button grid, где приложение явно
владеет interaction model. Advanced range selection оставить ниже и дать ссылку на APG pattern или
moduix Listbox.

**Приоритет:** P2.

### Tree Collection

Файл: `apps/docs/docs/en/docs/tree-collection.mdx`.

**Уже хорошо:** custom shapes, index/value paths, relationships, traversal, filtering, immutable
updates и file paths покрыты лучше upstream quick examples. Есть полезная ссылка на Tree View для
rendering.

**Нужно исправить:** материал очень плотный и весь статический. Не сказано явно, что numeric index
paths могут стать stale после reorder/insert/remove. Lazy node count упомянут в option table, но не
связан с async TreeView workflow.

**Как исправить:** добавить runnable file-tree preview и callout «re-derive index paths after
structural updates; persist stable node values, not numeric paths». Связать
`nodeToChildrenCount` с Tree View async-loading page и перенести редкие traversal methods в
reference subsection.

**Приоритет:** P2.

## Forms

### Forms

Файл: `apps/docs/docs/en/docs/forms.mdx`.

**Уже хорошо:** одна из самых сильных страниц. Native vs library chooser, responsibility matrix,
automatic native-control inventory, reset/focus rules, Field/Fieldset semantics, repeated fields и
server errors дают более полный mental model, чем типичный guide shadcn. Формулировки сверены с Ark
forms guide и локальными wrappers.

**Нужно исправить:** большая native-control matrix появляется до первого example и замедляет happy
path. Нет готового pattern для async submit, error summary/focus и демонстрации итогового `FormData`.
Chooser table слишком коротка для решения между тремя libraries.

**Как исправить:** перенести first native form выше, matrix оставить reference section. Добавить
async submission checklist: pending, preserve values, field errors, form alert, focus summary/first
invalid, retry. Показать `FormData` output для Select и одного multi-value control. Расширить chooser
criteria: controlled/uncontrolled, schema, field arrays, bundle/team familiarity.

**Приоритет:** P2.

### React Hook Form

Файл: `apps/docs/docs/en/docs/react-hook-form.mdx`.

**Уже хорошо:** register/Controller boundary, scalar-array mapping, blur/ref wiring, native Select,
Checkbox boolean, reset, field arrays и server/root errors описаны подробно. Server-error и hidden
input guidance уже полезнее базовой страницы shadcn.

**Нужно исправить:** нет ссылки на exact upstream guide/version, runnable resolver example,
submission pending state и runnable field-array flow. RadioGroup/Switch не представлены в mapping.

**Как исправить:** добавить upstream link и tested version note. Сделать один advanced runnable
example с resolver, `useFieldArray`, `isSubmitting`, server field/root errors и reset. Mapping table
дополнить RadioGroup/Switch либо явно отправить на их component pages.

**Приоритет:** P2.

### TanStack Form

Файл: `apps/docs/docs/en/docs/tanstack-form.mdx`.

**Уже хорошо:** controlled mapping, blur ownership, Standard Schema, array IDs, async submit
validator, `form.Subscribe`, reset и отсутствие встроенного DOM focus management сформулированы
точно.

**Нужно исправить:** `onSubmitInvalid` рекомендуется без готового focus example. Array/server
sections остаются fragments, а API быстро меняется между minor versions. Нет pending/retry pattern.

**Как исправить:** добавить tested version и upstream link. Показать runnable invalid-focus helper,
который ищет первый rendered `[aria-invalid='true']`, и submit-state example через
`form.Subscribe`. Advanced preview должен объединить async submit, server errors и reset.

**Приоритет:** P2.

### Formisch

Файл: `apps/docs/docs/en/docs/formisch.mdx`.

**Уже хорошо:** редкая integration документирована последовательно: alias двух `Field`, Valibot
schema, `validate`/`revalidate`, controlled values, field arrays, `setErrors` и reset. Примеры
компилируются с установленной версией.

**Нужно исправить:** нет достаточно наглядного invalid-focus и async pending/retry pattern.

**Как исправить:** добавить ссылки на canonical Formisch и Valibot docs. Показать, как форма сообщает
pending, где рендерится form-level error и как фокусируется первый invalid control. Проверять
snippets при каждом dependency update.

**Приоритет:** P2.

## Что уже лучше shadcn и Chakra и это нужно сохранить

- Ownership model объясняется до кода, а не спрятана в installation details.
- Ark callback details, native controls, reset, refs, providers и portal scope не скрыты за sugar.
- `Data Table` не превращён в универсальный component API.
- Forms объясняют server errors, repeated fields и duplicate hidden-input risk глубже обычного
  component example.
- CSS tokens имеют ясную hierarchy от system decision до local exception.
- Copy-owned registry flow включает inspect/dry-run/diff, а не только команду add.

При улучшении документации не стоит копировать слабость конкурентов: гигантские страницы из
десятков почти одинаковых snippets без явного recommended path. Лучший следующий шаг для moduix —
сохранить точность и добавить меньшее количество законченных production examples.

## Предлагаемый порядок реализации

1. Исправить stale CSS token и `Updating` commands.
2. Дополнить `Changelog` до текущей `2.2.3`.
3. Сделать общий production-state pattern для auth recipes и применить его к Forgot password,
   Login, Reset password, Sign up и Verification code.
4. Сделать полноценный upload mutation example.
5. Добавить по одному runnable example на каждую Collections page.
6. Перестроить Quick start/Components/Recipes как быстрые chooser flows.
7. Дополнить Forms advanced examples и version notes.
8. Провести финальный редакторский pass: redirect URLs, owned assets, hardcoded counts и sentence
   case.
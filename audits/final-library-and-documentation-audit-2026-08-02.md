# Итоговый аудит moduix

**Дата:** 2 августа 2026 года  
**Охват:** `@moduix/react`, hosted shadcn registry, документация Rspress, recipes и пользовательский путь  
**Точка зрения:** новый пользователь библиотеки, пользователь shadcn/Chakra и сопровождающий дизайн-систему

## Таблица готовности

Эта таблица — рабочая точка входа для следующих агентов. Пункты со статусом «готово» повторно
прорабатывать не нужно.

| Приоритет | Пункт                            | Статус                | Результат                                                                                                                                                             |
| --------- | -------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1        | Переход с shadcn                 | ✅ Готово, 02.08.2026 | [Центральная migration-страница](../apps/docs/docs/en/docs/migrate-from-shadcn.mdx) с картой компонентов, imports, styling и ownership.                               |
| P1        | React stacks compatibility       | ✅ Готово, 02.08.2026 | [Quick start](../apps/docs/docs/en/docs/quick-start.mdx) с плитками и шесть страниц в свёрнутой группе: Vite, Rsbuild, TanStack Start, React Router, Astro и Next.js. |
| P1        | Спокойная навигация документации | ✅ Готово, 02.08.2026 | `Overview` и компактный `Get started`, полный алфавитный список компонентов, Recipes только в header, упрощённый outline и единые landing cards.                      |
| P2        | Три product recipes              | ⬜ Не начато          | Account settings, Command search и CRUD workspace — только после проверки реального спроса.                                                                           |
| P2        | Chart recipe                     | ⬜ Не начато          | Один copy-owned recipe без chart API и зависимости в основном пакете.                                                                                                 |
| План      | Локализация документации         | ⏳ Следующий этап     | Начинать после adoption polish; English оставить каноническим техническим контрактом.                                                                                 |
| План      | Vue → Solid → Svelte             | ⏳ После локализации  | Делать реализации последовательно, по одному framework.                                                                                                               |

## Короткий вердикт

**moduix уже готова к публичному использованию. P0-проблем нет.**

Техническое качество больше не является главным ограничением проекта. Компоненты, Ark-контракты,
стили, registry, примеры и документация уже собраны в цельную систему. Следующая задача — не ещё
один большой проход по компонентам, а более лёгкий переход от интереса к первому использованию.

Самое точное позиционирование библиотеки:

> **Поведение и доступность Ark UI, цельность Chakra и владение кодом в духе shadcn — без
> обязательного Tailwind и без скрытого сложного слоя.**

Это уже не обещание, а фактическое состояние проекта. moduix выглядит самостоятельным продуктом,
а не очередным набором обёрток.

## Итоговая оценка

Оценки ниже — продуктовая эвристика, а не результат автоматического теста.

| Область                     | Оценка | Вывод                                                               |
| --------------------------- | -----: | ------------------------------------------------------------------- |
| Компоненты и Ark-контракты  | 9.5/10 | Полный, последовательный и production-ready слой                    |
| Визуальная система          |   9/10 | Спокойный узнаваемый стиль и хорошие mobile/desktop состояния       |
| Документация компонентов    |   9/10 | Очень точная и полная, местами тяжелее, чем нужно новичку           |
| Установка и ownership model |   9/10 | npm и copy-owned registry объяснены лучше большинства библиотек     |
| Поиск нужного решения       |   8/10 | Хороший chooser и gallery, но длинная навигация усложняет обзор     |
| Переход с shadcn            |   9/10 | Есть единая карта компонентов, imports, styling и ownership         |
| Экосистема и охват          | 7.5/10 | Основные React stacks закрыты; языки и другие UI frameworks впереди |

**Общая оценка: 8.8/10.** Библиотеке не нужен новый фундамент. Ей нужен короткий adoption-pass.

## Проверенная база

На момент аудита:

- опубликованная версия — `@moduix/react@2.2.3`;
- 83 component family;
- все 83 имеют public docs, local docs, registry item и стабильные `data-slot` hooks;
- 90 package exports;
- 92 registry items: компоненты плюс foundation, themes, icons и служебные entrypoints;
- 771 consumer-facing TSX snippet только на страницах компонентов;
- 86 stories;
- 83 test files и 279 проходящих тестов;
- React 18 и 19 поддерживаются через peer dependencies;
- package и copy-owned installation используют один компонентный контракт;
- документация содержит отдельные guides по forms, collections, composition, styling, animations,
  RTL, dark mode, updating и AI;
- есть 11 законченных recipes с живыми previews и install-командами.

Предыдущие аудиты от 1 августа изучены. Их P1/P2 уже закрыты, поэтому этот документ не предлагает
повторно менять component API, расширять тестовый слой или снова переписывать подробные страницы.

Технический baseline чистый:

- `npm run fmt:check` — пройден, 1737 файлов;
- `npm run lint:check` — 0 warnings, 0 errors;
- `npm run tsc:check` — пройден для React и docs;
- `npm test` — 83/83 test files, 279/279 tests;
- docs production build внутри test pipeline — пройден;
- `publint` — `All good`;
- package entrypoints прошли ESM-профиль `@arethetypeswrong/cli` с ожидаемо игнорируемыми CJS/legacy
  resolutions.

## Что уже особенно хорошо

### 1. Правильная середина между shadcn и Chakra

moduix берёт у shadcn право владеть исходниками и понятные визуальные defaults, но не повторяет его
раздробленный набор локальных соглашений. У Chakra взята системность, но без обязательного runtime
styling engine и без большого абстрактного API поверх примитивов.

Пользователь может выбрать:

- npm package для минимальной настройки и обычных обновлений;
- shadcn-compatible registry для полного владения кодом.

Это сильнее, чем один жёстко заданный способ распространения.

### 2. Ark остаётся видимым там, где это полезно

Документация не прячет controlled state, callback details, provider/context paths, native form
controls, portal ownership, `asChild`, refs и state attributes. При этом частый boilerplate уже
сокращён локальными частями вроде `Field`, `Items`, `Body`, `CloseIcon`, `Sidebar.Tooltip`,
`Lightbox.Bind` и `Typeset.Scroll`.

Это хороший баланс: простой happy path и честный advanced path.

### 3. Визуальная документация уже продаёт продукт

Главная страница выглядит современно и уверенно, показывает интерфейс, а не набор изолированных
кнопок. Component gallery сгруппирована по пользовательским задачам. Recipes демонстрируют реальные
экраны. Desktop и viewport 390 × 844 не показали горизонтального overflow, а браузерная консоль
осталась без warnings и errors.

### 4. Документация глубже конкурентов там, где глубина нужна

Особенно хорошо объяснены:

- native form submission, reset и invalid focus;
- граница между готовым UI и data hooks;
- ownership application/server logic в auth и upload recipes;
- portal и positioning contracts;
- CSS token hierarchy и локальные styling hooks;
- безопасная адаптация Data Table без универсального god component.

Эти темы часто остаются между строк и в shadcn, и в более крупных component systems.

## Чего мне не хватает как пользователю

### P1. Одна страница «Переход с shadcn»

**Статус: ✅ выполнено 2 августа 2026 года.**

Создана единая страница [Migrate from shadcn](../apps/docs/docs/en/docs/migrate-from-shadcn.mdx).
Она закрывает главный пробел без новых alias components.

Сейчас migration notes распределены по `Card`, `Collapsible`, `Combobox`, `Drawer`, `Menu`,
`Sidebar`, `Tooltip` и другим страницам. Они полезны после того, как пользователь уже нашёл
компонент, но не отвечают на первый вопрос: «чем заменить привычный shadcn API?»

Нужна одна компактная таблица:

| Привычное имя shadcn   | moduix                | Комментарий                                           |
| ---------------------- | --------------------- | ----------------------------------------------------- |
| Alert Dialog           | `Dialog`              | Использовать alert-dialog composition, не новый alias |
| Sheet                  | `Drawer`              | Edge panel с Ark-shaped lifecycle                     |
| Dropdown Menu          | `Menu`                | Обычный trigger path                                  |
| Context Menu           | `Menu.ContextTrigger` | Тот же primitive, другой trigger                      |
| Input OTP              | `PinInput`            | Native form и SSR contract уже описаны                |
| Resizable              | `Splitter`            | Явные panels и ids                                    |
| Sonner / Toast         | `Toast`               | Единая moduix notification surface                    |
| Command                | `CommandPalette`      | Готовый application workflow                          |
| Calendar / Date Picker | `DatePicker`          | Не нужно собирать два разных public components        |

На этой же странице достаточно показать различия в imports, CSS ownership, tokens, compound parts
и callbacks. Новые alias components для этого создавать не нужно.

**Почему P1:** shadcn — самый вероятный источник новых пользователей. Снижение migration friction
даст больше adoption value, чем ещё один компонент.

### P1. Короткая compatibility-страница для популярных React stacks

**Статус: ✅ выполнено 2 августа 2026 года.**

[Quick start](../apps/docs/docs/en/docs/quick-start.mdx) оставлен единым коротким входом и получил
плитки фреймворков. Точные инструкции вынесены в шесть небольших страниц: Vite, Rsbuild, TanStack
Start, React Router, Astro и Next.js. В sidebar они находятся в свёрнутой по умолчанию группе
`Framework setup`: страницы легко найти, но они не создают постоянный визуальный шум.

На страницах показаны точное место CSS import, source alias, copy-owned path, client/SSR boundary и
минимальная проверка результата. Общий контракт React 18/19, Ark peer dependency и два ownership
model остаётся в Quick start, поэтому одинаковая информация не размножается.

Рядом стоит добавить короткую accessibility boundary: Ark отвечает за primitive behavior, moduix —
за wrapper contract и defaults, приложение — за labels, контент, validation messages и product flow.
Это честнее и полезнее, чем обещание абстрактной «полной доступности».

### P1. Сократить визуальный шум длинной навигации

**Статус: ✅ выполнено 2 августа 2026 года.**

Sidebar следует приоритетам продукта: `Overview`, компактный `Get started`, `Components`, `AI`,
`Collections`, `Forms`, `Guides`. В `Get started` оставлены только `Quick start` и сворачиваемый
`Framework setup`. Его штатный chevron расположен слева, в одном ряду с остальными sidebar icons.

Все 83 компонента снова видны полным алфавитным списком: это главный каталог библиотеки, поэтому его
не стоит прятать за дополнительными группами. Recipes убран из sidebar и остаётся самостоятельным
пунктом верхнего меню со входом через Browse Recipes. Так глобальная навигация сохраняет быстрый путь
к сценариям, а длинный sidebar не дублирует второй каталог. Маршруты и MDX-файлы не изменены.

В page outline оставлены H2, поэтому многочисленные H3 отдельных examples больше не конкурируют с
основными разделами.

Разводные страницы Introduction, Components, Recipes, Collections и Forms используют общий
`Cards`/`Card` pattern с одинаковой высотой и hover. Контент не удалён; изменены только порядок,
первый уровень навигации и визуальный вход.

### P2. Ещё три product recipes, а не новые primitives

По покрытию primitives moduix уже не уступает shadcn в важных задачах и во многих местах превосходит
его. Разница заметнее в количестве готовых product outcomes. Текущие 11 recipes хороши, но сильно
сосредоточены на auth, navigation и upload.

Я бы добавил ровно три:

1. **Account settings** — profile, password, notifications, validation и save state.
2. **Command search** — global search, recent items, empty/error/loading и keyboard path.
3. **CRUD workspace** — table/list, filters, create/edit dialog и mobile adaptation.

После этого снова остановиться и смотреть на реальный спрос. Не нужно догонять каталог shadcn
Blocks количеством.

### P2. Chart как recipe, не как component family

У shadcn есть Chart поверх Recharts, а Chakra отдельно продвигает charts. В moduix такого готового
пути нет, и это заметно в dashboard-сценариях.

Добавлять Recharts в основную библиотеку не стоит. Лучше сделать один copy-owned recipe:

- связать chart colors с moduix tokens;
- показать tooltip, legend, empty/loading/error;
- оставить chart engine заменяемым;
- не обещать универсальный chart API.

Так закрывается пользовательская задача без новой тяжёлой зависимости и без чужого domain API в
ядре moduix.

## Чем moduix пока хуже shadcn

Это не дефекты компонентов, а разница зрелости продукта и экосистемы.

1. **У shadcn проще узнаваемость названий.** Пользователь уже знает `Sheet`, `Sonner`, `Input OTP`,
   `Resizable` и `Dropdown Menu`; в moduix нужно сначала найти их более системные эквиваленты.
2. **У shadcn больше готовых blocks и публичных примеров целых приложений.** moduix уже имеет более
   качественные contracts, но пока меньше готовых product outcomes.
3. **У shadcn шире ecosystem surface.** Базовые installation paths популярных React stacks теперь
   закрыты, но у shadcn остаются registry directory, Figma и v0 paths. Копировать их без спроса не
   нужно.
4. **Страницы shadcn быстрее сканируются.** Страницы moduix точнее, но compound API и большой набор
   examples требуют более спокойной навигации.
5. **У shadcn сильнее network effect.** Его нельзя воспроизвести кодом. moduix должна выигрывать
   последовательностью, предсказуемостью и качеством реальных recipes.

## Что не нужно делать

- Не проводить девятый массовый рефакторинг 83 компонентов.
- Не добавлять тесты ради покрытия: текущих 279 focused tests достаточно для выбранной стратегии.
- Не создавать shadcn aliases вроде `Sheet`, `Sonner` или `Resizable` только ради знакомого имени.
- Не добавлять универсальные `Form`, `DataTable`, `Chart` или prop-heavy wrappers.
- Не делать Tailwind обязательной зависимостью.
- Не строить theme builder, Figma kit, marketplace или собственный CLI до появления реального
  пользовательского запроса.
- Не создавать десятки blocks. Три сильных новых recipes полезнее двадцати поверхностных.
- Не пытаться выпускать React, Vue, Solid и Svelte parity одновременно.

## Рекомендуемый roadmap

### Этап 1. Adoption polish

Один короткий цикл без изменений component API:

1. ✅ центральная страница migration from shadcn;
2. ✅ Quick start и compact framework setup;
3. ✅ единая структура sidebar, свёрнутые группы компонентов и упрощённый page outline.

После этого библиотеку уже можно активно показывать пользователям и собирать вопросы вместо новых
внутренних аудитов.

### Этап 2. Локализация документации

План локализации правильный. Чтобы он не утроил сопровождение:

- не переводить code snippets, public API names и install commands;
- переводить prose, navigation и metadata;
- держать English canonical для технического контракта;
- сначала перевести Overview, Get started, Components, Themes, migration page и 10–15 самых
  востребованных компонентов;
- только после проверки процесса расширять перевод на все 118 страниц.

Это даёт полезный результат раньше полного перевода каталога.

### Этап 3. Vue → Solid → Svelte

Такой путь логичен: Ark UI уже документирует React, Vue, Solid и Svelte, поэтому поведенческая база
существует. Но переносить следует принципы, а не React implementation.

- CSS tokens, визуальные defaults и component naming можно делить между frameworks.
- Wrapper code, refs, composition и framework idioms должны оставаться нативными для каждого
  framework.
- Делать frameworks по одному.
- Перед следующим framework доводить предыдущий до устойчивого core-набора: forms, overlays,
  collections, feedback и layout.
- Не строить генератор wrappers до тех пор, пока два независимых implementation не покажут
  действительно одинаковый повторяемый слой.

Это медленнее на старте, но проще и надёжнее в сопровождении.

## Минимальные критерии завершения следующего этапа

Adoption-pass можно считать завершённым, когда:

- ✅ пользователь shadcn за две минуты находит соответствие для 15–20 популярных компонентов;
- ✅ пользователь Next.js видит точное место CSS import и client boundary без поиска по issues;
- ✅ sidebar показывает все 83 компонента единым алфавитным списком без скрытых категорий;
- ✅ в page outline `Basic` и install path находятся сразу, а длинный список advanced examples не
  конкурирует с ними за внимание;
- новые recipes имеют один живой preview, одну install-команду и ясную application boundary;
- public component API, production CSS и текущая тестовая стратегия не меняются.

## Финальный вывод

moduix уже достигла той точки, к которой многие библиотеки идут годами: у неё есть собственный
визуальный язык, предсказуемая архитектура, глубокая документация, два ownership model и достаточно
широкий набор компонентов для реальных приложений.

Сейчас проекту важнее оставаться **простым для входа**, а не становиться **больше по объёму**.
Migration map, framework setup и спокойная навигация уже закрыты, поэтому moduix убедительно
занимает своё место между shadcn и Chakra:

- проще и последовательнее shadcn;
- легче и прозрачнее Chakra;
- практичнее чистого Ark UI для продуктовой разработки.

После этого локализация и последовательные Vue/Solid/Svelte implementations будут естественным
расширением уже устойчивого продукта, а не попыткой компенсировать незавершённую React-базу.

## Источники и дата сравнения

Upstream-сравнение проверено 2 августа 2026 года по официальным источникам:

- [Ark UI documentation index](https://ark-ui.com/llms.txt)
- [Chakra UI documentation index](https://chakra-ui.com/llms.txt)
- [shadcn documentation index](https://ui.shadcn.com/llms.txt)
- [shadcn components](https://ui.shadcn.com/docs/components)
- [shadcn registry](https://ui.shadcn.com/docs/registry)
- [shadcn MCP](https://ui.shadcn.com/docs/mcp)

Локально проверены component sources, package exports, registry manifest, public docs, recipes,
desktop/mobile rendering и действующий validation pipeline.
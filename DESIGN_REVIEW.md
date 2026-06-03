# Design Review — Antares v2
**Дата:** 2026-06-03
**Скиллы:** ui-visual-validator · vibe-code-auditor · ui-ux-pro-max
**Охват:** все секции landing page (hero, migration paths, analyzer, converter, services, pricing, guides, cta, footer)

---

## Краткое резюме

| Критерий | Оценка |
|---|---|
| Визуальное качество | 7/10 — сильный десктоп, слабый мобайл |
| Технический долг | 6/10 — нет токенов, нет next/image |
| Доступность | 4/10 — нет мобильной навигации, нет focus states |
| UX консистентность | 6/10 — несогласованные кнопки и иконки |
| Готовность к продакшну | **65/100** — deployable с оговорками |

---

## 🔴 КРИТИЧЕСКИЕ замечания

### C-1. Нет мобильной навигации
**Файл:** `src/components/nav.tsx:45`
**Скилл:** ui-visual-validator + ui-ux-pro-max

Пункты меню скрыты на мобильном `hidden md:flex` — hamburger-меню не существует. Пользователь на мобильном устройстве видит только логотип и кнопку CTA, но не может перейти ни в одну секцию страницы. Это прямой потери конверсии.

```tsx
// Сейчас:
<ul className="hidden md:flex items-center gap-8">
// На мобильном — полностью исчезает, замены нет
```

**Исправление:** добавить hamburger + drawer/sheet для мобильного меню.

---

### C-2. Сфера рендерится разрушенной на полной странице
**Файл:** `src/components/ui/ascii-sphere.tsx`
**Скилл:** ui-visual-validator

`v2-final.png` (full-page снимок) показывает ASCII-символы разбросанными плоской сеткой по белому фону без сферической формы. Canvas-элемент резайзится через ResizeObserver, но при рендеринге в нестандартном контексте (headless, print, некоторые Screenshot-инструменты) форма разваливается. Скорее всего связано с тем что `clientWidth/clientHeight` возвращают 0 при offscreen рендере.

**Исправление:** добавить fallback `min-width/min-height` на контейнер или guard в `resize()`:
```tsx
function resize() {
  const w = wrap.clientWidth || radius * 2;  // fallback
  const h = wrap.clientHeight || radius * 2;
  ...
}
```

---

### C-3. Анимации без `prefers-reduced-motion`
**Файлы:** `ascii-sphere.tsx:103`, `converter.tsx:153-158`
**Скилл:** ui-ux-pro-max + vibe-code-auditor

Ни canvas-анимация сферы, ни `framer-motion` переходы в Converter не проверяют `prefers-reduced-motion`. Нарушение WCAG 2.1 SC 2.3.3 (AAA) и де-факто стандарт для продакшн-сайтов.

```tsx
// ascii-sphere.tsx — добавить в useEffect:
const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!motionOK) return; // не запускать rAF-цикл

// converter.tsx — AnimatePresence:
const prefersReduced = useReducedMotion(); // framer-motion hook
<motion.div
  initial={prefersReduced ? false : { opacity: 0, y: 10, scale: 0.99 }}
  ...
```

---

## 🟠 ВЫСОКИЙ РИСК

### H-1. `<img>` вместо `<Image>` из Next.js
**Файлы:** `analyzer.tsx:47`, `converter.tsx:177`
**Скилл:** vibe-code-auditor

Оба места используют нативный `<img>` с eslint-disable-комментарием как banda-aid. Next.js `<Image>` даёт автоматическую оптимизацию (WebP, lazy loading, blur placeholder, Core Web Vitals). Особенно критично для analyzer-screenshot.png — большое изображение без оптимизации.

```tsx
// Сейчас:
{/* eslint-disable-next-line @next/next/no-img-element */}
<img src="/analyzer-screenshot.png" .../>

// Должно быть:
import Image from "next/image";
<Image src="/analyzer-screenshot.png" width={800} height={600} alt="..." />
```

---

### H-2. Нет визуального выделения featured тарифа в Pricing
**Файл:** `src/components/pricing.tsx:86-129`
**Скилл:** ui-ux-pro-max + ui-visual-validator

Данные содержат `featured: true` для "Antares Converter License", но в рендере это поле никак не используется — все три карточки выглядят идентично. Визуально нет иерархии между тарифами. На скриншоте `v2-pricing.png` это хорошо видно: три одинаковые белые карточки без акцента.

**Исправление:** выделить featured-тариф: border-blue, scale, badge "Recommended", или тёмный фон.

---

### H-3. Несогласованный стиль кнопок
**Файлы:** `hero.tsx:38`, `cta.tsx:39`, `services.tsx` (нет кнопок)
**Скилл:** ui-ux-pro-max

Hero использует `rounded` (закруглённые) кнопки. CTA-секция использует `rounded-none` (прямоугольные) с `tracking-[0.1em] uppercase`. Pricing и Analyzer используют `rounded`. Это три разных визуальных языка на одной странице без намеренного обоснования.

| Секция | Стиль кнопки |
|---|---|
| Hero | `rounded`, no uppercase |
| Analyzer | `rounded`, no uppercase |
| Pricing | `rounded`, no uppercase |
| CTA | `rounded-none`, uppercase, `tracking-[0.1em]` |

**Исправление:** унифицировать CTA-секцию под общий стиль, или осознанно задокументировать исключение.

---

### H-4. Цветовые значения разбросаны без токенов
**Файлы:** все компоненты
**Скилл:** vibe-code-auditor

`#3B82F6` встречается в 6+ файлах, `#2563EB` — в 4+, цвета сферы `#FA2101`, `#FC6D02` — только в ascii-sphere. Нет единого источника правды. Смена брендового цвета потребует ручного поиска по всему проекту.

**Исправление:** вынести в Tailwind config:
```js
// tailwind.config.ts
colors: {
  brand: { DEFAULT: '#3B82F6', hover: '#2563EB' },
  fire: { from: '#FA2101', to: '#FC6D02' },
}
```

---

## 🟡 СРЕДНИЕ ПРОБЛЕМЫ

### M-1. Unicode-символы как иконки
**Файлы:**
- `analyzer.tsx:28` — `⟶`
- `converter.tsx:107,145` — `✓`, `⏱`
- `pricing.tsx:108` — `✓`
- `guides.tsx:56` — `→`
- `migration-paths.tsx:87` — `→`

**Скилл:** ui-ux-pro-max

Unicode-символы нестабильны: рендерятся по-разному в разных ОС, шрифтах, и браузерах. `⟶` в Linux может выглядеть как прямоугольник. `⏱` — эмодзи, может иметь цвет на некоторых системах.

**Исправление:** заменить на SVG-иконки (Lucide, Heroicons). Для `→` в Guides и Migration Paths — допустимо оставить как типографический элемент.

---

### M-2. Низкий контраст у `text-neutral-400`
**Файлы:** `converter.tsx:112`, `migration-paths.tsx:23,73`, несколько мест
**Скилл:** ui-ux-pro-max

`neutral-400` в Tailwind = `#a3a3a3` на белом фоне = соотношение контраста ~3.0:1. Норма WCAG AA для нормального текста — 4.5:1. Используется для label-текста (uppercase caps) и secondary descriptions.

**Затронутые места:**
- `text-[0.58rem]` uppercase labels в PathCard и Converter (очень маленький + низкий контраст — двойное нарушение)
- Secondary descriptions в Converter step list

**Исправление:** поднять до `neutral-500` (`#737373`, ~4.6:1) для текста < 14px.

---

### M-3. `aria-hidden` на CTA-сфере, но нет skip-link
**Файл:** `cta.tsx:19`, общая структура
**Скилл:** ui-ux-pro-max

`aria-hidden="true"` на сфере в CTA — хорошо. Но на всей странице нет `<a href="#main" class="skip-link">` для screen reader / keyboard users чтобы пропустить nav.

---

### M-4. Нет `cursor-pointer` на PathCard
**Файл:** `migration-paths.tsx:22`
**Скилл:** ui-ux-pro-max

PathCard имеет `cursor-default` хотя визуально выглядит как кликабельный элемент. Пользователи будут пробовать кликать, не получат отклика, и не поймут почему. Либо добавить hover-состояние и курсор, либо убрать визуальную похожесть на кнопку.

---

### M-5. Сфера Hero скрыта на мобильном и планшете, но секция всё равно имеет большой padding
**Файл:** `hero.tsx:8,11`
**Скилл:** ui-visual-validator

`<div className="... hidden lg:flex ...">` — сфера не рендерится на < 1024px. Секция Hero имеет `pt-[180px] pb-[140px]` — этот padding остаётся. На мобильном получается огромное пустое пространство.

---

### M-6. `motion/react` вместо `framer-motion`
**Файл:** `converter.tsx:4`
**Скилл:** vibe-code-auditor

```tsx
import { motion, AnimatePresence } from "motion/react";
```

`motion/react` — это альтернативное имя пакета Motion (бывший Framer Motion). Убедитесь что в `package.json` именно `motion`, не `framer-motion`, и что версии совместимы. Если в проекте смешаны оба — будет конфликт.

---

## 🔵 НИЗКИЙ ПРИОРИТЕТ

### L-1. Нет фавиконки / OG-тегов
**Файл:** `src/app/layout.tsx`
**Скилл:** vibe-code-auditor

Проверить наличие `<meta property="og:image">`, `og:title`, `og:description` и canonical URL для SEO / соцсети.

---

### L-2. `v2-final.png` не представляет финальное состояние
**Скилл:** ui-visual-validator

Скриншот `screenshots/v2-final.png` — это явно устаревший снимок (или снято в неправильном контексте). Рекомендуется пересоздать референсные скриншоты после применения исправлений.

---

### L-3. Дублирование SVG-логотипа
**Файлы:** `nav.tsx:8-43`, `footer.tsx:10-45`
**Скилл:** vibe-code-auditor

Один и тот же SVG-код логотипа дублируется в nav и footer (только цвет отличается: `#0A0A0A` vs `#A3A3A3`). Вынести в компонент `<AntaresLogo color="..." />`.

---

## Матрица приоритетов исправлений

| # | Замечание | Приоритет | Усилие | Влияние |
|---|---|---|---|---|
| C-1 | Мобильная навигация | P0 | L | Критично для конверсии на мобайл |
| H-2 | Featured тариф в Pricing | P1 | S | Прямо влияет на выбор тарифа |
| H-3 | Единый стиль кнопок | P1 | S | Визуальная консистентность |
| C-3 | prefers-reduced-motion | P1 | S | Доступность, WCAG |
| H-1 | next/image | P2 | M | Core Web Vitals, LCP |
| H-4 | Design tokens | P2 | M | Поддерживаемость |
| C-2 | Fallback для сферы | P2 | S | Корректный рендер |
| M-1 | SVG вместо unicode-иконок | P3 | M | Кросс-платформенность |
| M-2 | Контраст neutral-400 | P3 | S | WCAG AA |
| M-4 | cursor-pointer на PathCard | P3 | S | UX ожидания |
| M-5 | Padding Hero на мобайл | P3 | S | Мобильный UX |
| L-3 | Компонент логотипа | P4 | S | DRY |
| M-3 | Skip-link | P4 | S | Доступность |
| L-1 | OG-теги | P4 | S | SEO/соцсети |

---

## Что работает хорошо (не трогать)

- **Структура страницы** — логичная последовательность секций, хороший ритм
- **Migration Paths bento grid** — strong visual, правильный контраст
- **Converter carousel** — плавная анимация с прогресс-баром, хорошая step UX
- **Floating nav** — `top-4 left-4 right-4` правильно реализован
- **Consistent max-width 1200px** — везде одинаково, хорошо
- **Analyzer section layout** — чистый двухколоночный layout с хорошей copy
- **Hero headline** — `clamp(3rem,7.5vw,5.5rem)` правильная адаптация
- **Guides section** — минималистичный список с hover, работает хорошо
- **aria-hidden на декоративных элементах** — правильно применён в CTA

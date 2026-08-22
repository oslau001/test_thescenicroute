# Wandering the Avant-Garde

An ongoing publishing project exploring the work of Barbro Östlihn in New York.

---

## Project structure

```
index.html

css/
    style.css
    typography.css

js/
    script.js

images/

README.md
```

---

## Publishing workflow

For each new publication:

1. Add new images to `/images/`
2. Add a new text block in `index.html`
3. Add accompanying image panels
4. Save (`⌘S`)
5. Commit
6. Sync

GitHub Pages publishes the newest version automatically.

---

## HTML structure

Each publication is organised as a chapter:

```html
<!-- DAY 001 -->

<section class="text-block">

    ...

</section>

<section class="panel image-panel">

    ...

</section>

<!-- END DAY 001 -->
```

---

## Image panels

Available panel types:

```html
panel
```

Standard image.

```html
panel image-panel large
```

Large image.

```html
panel image-panel panel-wide
```

Wide image.

---

## Typography

Body text

Block quotations

Footnotes

Captions

Small text

---

## Daily routine

Open project

↓

Write

↓

Add images

↓

Save

↓

Commit

↓

Sync

---

## Notes

Keep HTML clean.

Avoid inline styling.

Use semantic markup whenever possible.

Continue building horizontally.
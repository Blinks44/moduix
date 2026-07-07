---
'@moduix/react': patch
---

AspectRatio: make root sizing and CSS ratio overrides easier.
The root now stores `ratio` in an internal CSS variable, which makes responsive `aspect-ratio` overrides easier while preserving the existing API.
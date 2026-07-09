---
'@moduix/react': patch
---

Improve Button loading ergonomics and simplify SplitButton trigger composition.
Adds a narrow `loading` prop to `Button`, tunes default button interaction styling, and removes the extra `asChild` escape hatch from `SplitButton.Trigger`.
Also keeps native `disabled` off `Button asChild` hosts, adds inline icon styling hooks, and syncs the Button docs with the shipped contract.
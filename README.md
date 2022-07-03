# Teeter totter game

This is a game where you should balance a teeter totter. On the right side figures with different weight randomly fall,
on the left side you can position figure to balance the platform.

## General overview & thoughts

* Here used Vue 3 + Typescript + Pinia for state management.
* The game logic is located mostly in the `store/game.ts`, but DOM-related code as well as some general (stop, pause, continue) is in the `components/Playground.vue`.
* Common types located in the `types` folder, but local ones are placed in dedicated files.
* General idea is to get profit from default browser behavior without caring to much about *real* physics

## Some ideas for improvement

- [ ] Add more precise function to calculate intersection
- [ ] Add intersetion logic for figures
- [ ] User configuration
- [x] Better animation (rn transition is used, it seems laggy a bit)
- [x] Horizontal movement need some adjustmens & improvements

## Build steps

They are pretty default

```
npm i
npm run dev
```


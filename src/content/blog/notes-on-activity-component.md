---
title: "Some notes on the React 19.2 Activity component"
description: "Fun and profit with prefetching and tabs"
pubDate: "Oct 07 2025"
heroImage: "/blog-placeholder-3.jpg"
---

I was playing around with the [Activity](https://react.dev/reference/react/Activity) component from React 19.2 over the weekend in between talks at React Alicante. It's a fun little component that will pre-render components that are offscreen, at a lower priority than onscreen components, and they make some prefetching patterns. Let's see what it can do.

## Using with Tanstack Query

Being a big fan of [Tanstack React Query](https://tanstack.com/query), I decided to try it with that. The setup I was playing with looked like this:

```tsx
// pokemon-card.tsx

// Fetch data from Pokeapi
const { data, isLoading, isError, error } = useQuery({
 queryKey: ["pokemon-non-suspending", pokemonName],
  queryFn: () => fetchPokemon(pokemonName),
});

// pokemon-tabs.tsx

// Embed the card component inside the Activity Component

<React.Fragment>
  <Activity mode={activePokemon === "bulbasaur" ? "visible": "hidden"}>
    <PokemonComponent pokemonName="bulbasaur">
  </Activity>
  <Activity mode={activePokemon === "charmander" ? "visible" : "hidden"}>
    <PokemonComponent pokemonName="charmander">
  </Activity>
  <Activity mode={activePokemon === "squirtle" ? "visible" : "hidden"}>
    <PokemonComponent pokemonName="squirtle">
  </Activity>
</React.Fragment>

```

The idea here is that if `activePokemon` is Bulbasaur, only the `bulbasaur` card will be visible, but the `useQuery` for the other hidden `<Activity/>`'s will still prefetch (after Bulbasaur because of the deprioritization), so you don't trigger a loading state when switching the cards.

Now, this actually won't work (I kinda knew it wouldn't), because `useQuery` is not a suspense hook, so it fetches inside an Effect (or useSyncExternalStore which I think counts as the same thing here) which is disabled (see the note [here](https://react.dev/reference/react/Activity#pre-rendering-content-thats-likely-to-become-visible)). So were gonna have to use `useSuspenseQuery` instead:

```tsx
// pokemon-card.tsx

// Now we use useSuspenseQuery
const { data, isLoading, isError, error } = useSuspenseQuery({
 queryKey: ["pokemon-suspending", pokemonName],
  queryFn: () => fetchPokemon(pokemonName),
});

// pokemon-tabs.tsx

// Wrap this in Suspense boundary

<Suspense fallback={<SkeletonPokemonCard />}>
  <Activity mode={activePokemon === "bulbasaur" ? "visible": "hidden"}>
    <PokemonComponent pokemonName="bulbasaur">
  </Activity>
  <Activity mode={activePokemon === "charmander" ? "visible" : "hidden"}>
    <PokemonComponent pokemonName="charmander">
  </Activity>
  <Activity mode={activePokemon === "squirtle" ? "visible": "hidden"}>
    <PokemonComponent pokemonName="squirtle">
  </Activity>
</Suspense>

```

Now it works! Bulbasaur fetched first, then the two hidden ones are pre-fetched, and the switch doesn't trigger the loading state! Hooray!

## Using with the shadcn Tabs component

This is a smaller thing in my project, but it's worth going over. The project I built this on was using shadcn components like `Button` and `Card`, and shadcn has a `Tabs` component as well, based on Radix (I rebased my `Tab` component on base-ui just to try it out, but the api is mostly the same). Now the nice thing about the shadcn component is it adheres to the [ARIA Tabs pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/) out of the box, so you get nice keyboard nav and roles by default.

Using the Tabs component with Activity isn't that hard, but it does require a bit of digging. The main thing you have to do is not have the existing Tab's component handle component mounting. Fortunately, there is a flag in Radix/base-ui for this:

```tsx
// We need to use controlled state here
<Tabs
  value={activePokemon}
  onValueChange={(value) => {
    setActivePokemon(value);
  }}
>
  <TabsList>
    <TabsTrigger value="bulbasaur">Bulbasaur</TabsTrigger>
    <TabsTrigger value="charmander">Charmander</TabsTrigger>
    <TabsTrigger value="squirtle">Squirtle</TabsTrigger>
  </TabsList>
  <Suspense fallback={<SkeletonPokemonCard />}>
    <Activity mode={activePokemon === "bulbasaur" ? "visible" : "hidden"}>
      {/* keepMounted keeps the tabs mounted so the Activity component can control the mounting instead. Radix version is `forceMount` */}
      <TabsPanel value="bulbasaur" keepMounted>
        <PokemonComponent pokemonName="bulbasaur" />
      </TabsPanel>
    </Activity>
    <Activity mode={activePokemon === "charmander" ? "visible" : "hidden"}>
      <TabsPanel value="charmander" keepMounted>
        <PokemonComponent pokemonName="charmander" />
      </TabsPanel>
    </Activity>
    <Activity mode={activePokemon === "squirtle" ? "visible" : "hidden"}>
      <TabsPanel value="squirtle" keepMounted>
        <PokemonComponent pokemonName="squirtle" />
      </TabsPanel>
    </Activity>
  </Suspense>
</Tabs>
```

And you get the best of both worlds. Nice.

Hope you find this experiment useful. The code is hosted at https://github.com/DogPawHat/test-activity-query, and the side is hosted at https://activity-query.dogpawhat.tech/. Enjoy!

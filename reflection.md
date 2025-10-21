# Clean Code Reflection

**Author:** Benjamin Boswell
**Course:** 1DV610
**Assignment:** L3

---

## Chapter 2: Meaningful Names

This chapter made me think about how i name things in my code. I used to just pick whatever came to mind first, but now i try to make names that actually reveal intent. For example, in my component i use `isLoadingImage` instead of just `loading` because it tells you exactly what is loading. The book talks about using pronounceable names and avoiding mental mapping, which i applied by naming my function `renderPortrait()` instead of something like `rp()` or `doImg()`. I also tried to use solution domain names like `personData` in my API endpoint, which makes sense to other developers who understand REST APIs.

```typescript
// From generate-portrait.post.ts
interface PersonData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  profession: string;
  // ...
}

const personData = await readBody<PersonData>(event);
```

```typescript
// From personComponent.vue
const imageSrc = ref("/blank-profilepic.svg");
const isLoadingImage = ref(false);

async function renderPortrait() {
  isLoadingImage.value = true;
  // ...
}
```

---

## Chapter 3: Functions

I learned that functions should be small and do one thing. Looking at my code, i tried to follow this by splitting up my component functions. `renderPortrait()` only handles the API call and image loading, while `generateWithImage()` and `generateWithoutImage()` are separate functions that do specific things. The book says to avoid flag arguments, which i did by creating two separate functions instead of one function with a boolean parameter like `generate(withImage: boolean)`. I also tried to keep functions at one level of abstraction. My error handling uses try-catch which the book says is better than returning error codes.

```typescript
// From personComponent.vue - small functions doing one thing
async function renderPortrait() {
  isLoadingImage.value = true;
  try {
    const response = await $fetch<{ imageUrl: string }>("/api/generate-portrait", {
      method: "POST",
      body: { /* person data */ }
    });
    imageSrc.value = response.imageUrl;
  } catch (error) { // Error handling with try-catch
    console.error("Failed to generate:", error);
    imageSrc.value = "/blank-profilepic.svg";
  } finally {
    isLoadingImage.value = false;
  }
}

function generateWithImage() {
  person.value = Person.random();
  renderPortrait();
}

function generateWithoutImage() {
  person.value = Person.random();
}
```

---

## Chapter 4: Comments

The book says that comments don't make up for bad code, and that you should explain yourself in code instead of comments. I tried to follow this in my app by using descriptive variable and function names so i don't need comments to explain what is happening. Looking at my code, i realize i don't have many comments at all, which might be good or bad. The book does say that some good comments include explanation of intent or warnings, and i have a warning in my template that tells users image generation takes time. I think i could have added a TODO comment in my API error handling where i just return a blank image, because maybe in the future i want to log this.

```typescript
// From generate-portrait.post.ts - no comments needed because code is clear
export default defineEventHandler(async (event) => {
  const personData = await readBody<PersonData>(event);

  try {
    const person = new Person(/* ...params */);
    const imageUrl = await PersonAI.generatePortraitFromEnv(person);
    return { imageUrl };
  } catch (error) {
    console.error("Portrait generation error:", error);
    return { imageUrl: "/blank-profilepic.svg" };
  }
});
```

```html
<!-- Warning comment in template - informative comment -->
<p class="flex justify-center mb-8 text-red-500 underline">
  !Note that generating a person with image can take time!
</p>
```

---

## Chapter 5: Formatting

I learned that formatting is about communication and that code should read like a newspaper article with the most important stuff at the top. In my component, i put all the state variables at the top, then the functions below. The book talks about vertical openness between concepts, which i tried to do by adding blank lines between different functions. I also kept related code close together, like how `generateWithImage()` is right next to `generateWithoutImage()` because they are conceptually related. For horizontal formatting, i tried to keep lines readable and not too long. The book says team rules are important, and i followed the formatting that my IDE (VSCode) suggested with the Prettier extension.

```typescript
// From personComponent.vue - variables at top, functions below
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Person } from "person-data-generator";

// State variables grouped together at top
let person = ref(Person.random());
const imageSrc = ref("/blank-profilepic.svg");
const isLoadingImage = ref(false);

// Functions below, with blank lines for vertical openness
async function renderPortrait() {
  // ...implementation
}

function generateWithImage() {
  // ...implementation
}

function generateWithoutImage() {
  // ...implementation
}
</script>
```

---

## Chapter 6: Objects and Data Structures

This chapter talks about data abstraction and the difference between objects and data structures. My `PersonData` interface is a data structure because it just exposes data with no behavior, which is fine for transferring data in an API. The `Person` class from my module is interesting because it is kind of a hybrid. The book says to avoid hybrids, but my Person class has public properties AND getter methods. I had to keep the properties public because i had problems with SSR (Server Side Rendering) in Nuxt when they were private. The book would say this is not ideal, but sometimes framework constraints force you to make trade-offs. The getter methods still provide some abstraction even though the data is technically public. You could argue the getters are redundant since the properties are public anyway, but i kept them because they signal the intended public API and allow for future changes without breaking code that uses the module. The Law of Demeter says you should not chain method calls, and in my Vue component i do `person.value.getName()` which is a bit of a train wreck, but that is how Vue refs work, though i could possibly make it less "train-wrecky".

```typescript
// Data Transfer Object - just data, no behavior
interface PersonData {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  // ...
}
```

```typescript
// From Person class in my module - hybrid with public data and methods
export class Person {
  firstName: string;  // Public due to SSR constraints
  lastName: string;   // Public due to SSR constraints
  age: number;
  // ...

  getName(): string {
    return this.firstName;
  }

  getSurname(): string {
    return this.lastName;
  }
}
```

---

## Chapter 7: Error Handling

The book says to use exceptions rather than return codes, and i followed this in my code. My `renderPortrait()` function uses try-catch to handle errors from the API call. The book also says don't return null, but honestly i kind of do this in my API where i return a blank image URL on failure instead of throwing an error. I think this is okay though because it is defining the normal flow, which the book actually recommends. My error handling provides context by logging the error with `console.error()` before returning the fallback value. I could improve this by creating custom exception classes, but for this small app the basic error handling works fine.

```typescript
// From personComponent.vue - using exceptions with try-catch
async function renderPortrait() {
  isLoadingImage.value = true;
  try {
    const response = await $fetch<{ imageUrl: string }>("/api/generate-portrait", {
      method: "POST",
      body: { /* ...data */ }
    });
    imageSrc.value = response.imageUrl;
  } catch (error) {
    console.error("Failed to generate:", error);
    imageSrc.value = "/blank-profilepic.svg";
  } finally {
    isLoadingImage.value = false;
  }
}
```

```typescript
// From API - defining normal flow by returning safe default
try {
  const imageUrl = await PersonAI.generatePortraitFromEnv(person);
  return { imageUrl };
} catch (error) {
  console.error("Portrait generation error:", error);
  return { imageUrl: "/blank-profilepic.svg" }; // Safe default instead of null
}
```

---

## Chapter 8: Boundaries

This chapter is about working with third-party code and APIs. In my app, i use the `person-data-generator` module which is my own code from L2, but i also use external APIs like Replicate for image generation. The book talks about wrapping third-party APIs to keep clean boundaries, and i kind of do this in my `generate-portrait.post.ts` file which wraps the Replicate API call. This means if i want to switch to a different AI service later, i only need to change code in one place. The book also mentions learning tests, which i don't have, but i did test my API integration manually to make sure it works. I think my boundaries could be cleaner if i created a separate service class for the AI portrait generation.

```typescript
// From generate-portrait.post.ts - wrapping external API
import { PersonAI } from "person-data-generator/person-ai.js";

export default defineEventHandler(async (event) => {
  const personData = await readBody<PersonData>(event);

  try {
    const person = new Person(/* ...params */);
    // Wrapped call to external API
    const imageUrl = await PersonAI.generatePortraitFromEnv(person);
    return { imageUrl };
  } catch (error) {
    // Boundary protection with fallback
    return { imageUrl: "/blank-profilepic.svg" };
  }
});
```

---

## Chapter 9: Unit Tests

The book talks about the three laws of TDD and keeping tests clean. I have two types of tests in my project. For my L2 module i wrote automated unit tests using Deno's test framework, which follow the F.I.R.S.T principles pretty well. They are Fast, Independent, Repeatable, and Self-validating. The book says one assert per test and single concept per test, but my tests have multiple asserts because i am testing that all the getters work correctly in one test. This violates the principle but makes the tests more practical. For my L3 frontend app i did manual testing which i documented in test-cases.md. The manual tests are not fast or automated, but they test the user interface which is harder to automate. I think the combination of automated tests for the module and manual tests for the UI is a reasonable approach for this project.

```typescript
// From module tests - automated unit tests
Deno.test("Person constructor and getters", () => {
  const person = new Person("John", "Doe", 30, "Male", ...);

  assertEquals(person.getName(), "John");
  assertEquals(person.getSurname(), "Doe");
  assertEquals(person.getAge(), 30);
  // Multiple asserts - violates "one assert per test" but tests one concept
});
```

```markdown
// From test-cases.md - manual tests for frontend
| TC2 | Generate person with AI portrait | FR2, FR4, FR7 |
Click "Generate person with image" button |
Loading spinner appears, then a new random person is displayed with AI portrait |
```

---

## Chapter 10: Classes

This chapter emphasizes that classes should be small and have a single responsibility. Looking at my code, my `PersonComponent.vue` component handles both the UI and the API logic, which violates the Single Responsibility Principle. It would be better if i had a separate service class for handling the portrait generation API calls. The book talks about cohesion, meaning that methods should use the instance variables, and my component does this well because `renderPortrait()` uses `isLoadingImage` and `imageSrc`. The Person class from my module follows SRP well because it just represents person data and nothing else. The book says organizing for change and maintaining cohesion results in many small classes, and i could improve my app by splitting it into more smaller classes.

```typescript
// PersonComponent - could be more cohesive with separate service class
let person = ref(Person.random());
const imageSrc = ref("/blank-profilepic.svg");
const isLoadingImage = ref(false);

// This mixing UI state and API logic violates SRP
async function renderPortrait() {
  isLoadingImage.value = true; // UI concern
  const response = await $fetch(...); // API concern
  imageSrc.value = response.imageUrl; // UI concern
}
```

```typescript
// Person class from module - good SRP, only handles person data
export class Person {
  constructor(firstName, lastName, age, ...) {
    this.firstName = firstName;
    this.lastName = lastName;
    // ...
  }

  getName() { return this.firstName; }
  getSurname() { return this.lastName; }
  // Only person-related methods
}
```

---

## Chapter 11: Systems

The book talks about separating constructing a system from using it, and the importance of dependency injection. In my Nuxt app, the framework handles a lot of this for me with its auto-imports and dependency injection. My API endpoint is defined separately from the component that uses it, which is good separation of concerns. The book says to test drive the system architecture and optimize decision making, and i kind of did this by starting with a simple app and adding the AI portrait feature later. Cross-cutting concerns like error handling are handled in multiple places, which the book says can be managed with aspects or similar patterns. For this small app, the system design is pretty simple, but the principles from this chapter would be more important in a larger application.

```typescript
// Separation of concerns - API in separate file from UI
// server/api/generate-portrait.post.ts
export default defineEventHandler(async (event) => {
  // API logic separated from UI
});
```

```typescript
// app/components/personComponent.vue
// Component uses API but doesn't know implementation details
const response = await $fetch("/api/generate-portrait", {...});
```

---

## Summary

Going through Clean Code chapters 2-11 changed how i think about writing code. The biggest lessons for me were about meaningful naming, keeping functions small, and the Single Responsibility Principle. I tried to apply these principles in both my L3 app and when improving my L2 module. Some things are harder to apply in framework code like Vue and Nuxt, but the underlying principles still make sense. The main thing i learned is that code is read way more than it is written, so making it clear and understandable is more important than being clever or writing less lines. If i were to refactor my app further, i would focus on better separation of concerns by creating service classes for the API logic.

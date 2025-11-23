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

I learned that functions should be small and do one thing. Looking at my code, i tried to follow this by splitting up my component functions and creating a separate `PersonService` class that handles the business logic. The component functions `generateWithImage()` and `generateWithoutImage()` are now thin wrappers that delegate to the service. The book says to avoid flag arguments, which i did by creating two separate functions instead of one function with a boolean parameter like `generate(withImage: boolean)`. I also tried to keep functions at one level of abstraction. My error handling uses try-catch which the book says is better than returning error codes.

```typescript
// From PersonService.ts - small methods doing one thing
async generatePortrait(person: PersonData): Promise<string> {
  try {
    const response = await $fetch<PortraitResponse>("/api/generate-portrait", {
      method: "POST",
      body: this.buildPortraitRequest(person),
    });
    return response.imageUrl;
  } catch (error) {
    console.error("Failed to generate portrait:", error);
    return this.defaultImageUrl;
  }
}

private buildPortraitRequest(person: PersonData): Record<string, unknown> {
  return {
    firstName: person.getName(),
    lastName: person.getSurname(),
    // ...
  };
}
```

```typescript
// From personComponent.vue - thin functions delegating to service
const personService = new PersonService();

async function generateWithImage() {
  person.value = personService.generatePerson();
  isLoadingImage.value = true;
  imageSrc.value = await personService.generatePortrait(person.value);
  isLoadingImage.value = false;
}

function generateWithoutImage() {
  person.value = personService.generatePerson();
  imageSrc.value = personService.getDefaultImageUrl();
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
    const portraitFactory = new PortraitGeneratorFactory();
    const portraitGenerator = portraitFactory.createFromEnv();
    const imageUrl = await portraitGenerator.generatePortrait(person);
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
import { ref } from "vue";
import { PersonService } from "~/services/PersonService";

// Service instance and state variables grouped together at top
const personService = new PersonService();
const person = ref(personService.generatePerson());
const imageSrc = ref(personService.getDefaultImageUrl());
const isLoadingImage = ref(false);

// Functions below, with blank lines for vertical openness
async function generateWithImage() {
  // ...implementation
}

function generateWithoutImage() {
  // ...implementation
}
</script>
```

---

## Chapter 6: Objects and Data Structures

This chapter talks about data abstraction and the difference between objects and data structures. My `PersonData` interface is a data structure because it just exposes data with no behavior, which is fine for transferring data in an API. The `Person` class from my module is now a pure data structure with private properties and getter methods, which follows the book's recommendation to hide implementation. The `PersonGenerator` class is a separate object that handles the creation of Person instances, which follows the principle of separating data from behavior. I also created a `PersonService` class in my L3 app that encapsulates the business logic and delegates to the module classes. The Law of Demeter says you should not chain method calls, and in my Vue component i do `person.value.getName()` which is a bit of a train wreck, but that is how Vue refs work.

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
// From Person class in my module - pure data structure with private properties
export class Person {
  private firstName: string;
  private lastName: string;
  private age: number;
  // ...

  getName(): string {
    return this.firstName;
  }

  getSurname(): string {
    return this.lastName;
  }
}

// PersonGenerator - separate object that creates Person instances
export class PersonGenerator {
  private emailGenerator: EmailGenerator;
  private professionResolver: ProfessionResolver;
  // ...

  generate(): Person {
    // Creates and returns a new Person
  }
}
```

---

## Chapter 7: Error Handling

The book says to use exceptions rather than return codes, and i followed this in my code. My `PersonService.generatePortrait()` method uses try-catch to handle errors from the API call. The book also says don't return null, but honestly i kind of do this in my service where i return a blank image URL on failure instead of throwing an error. I think this is okay though because it is defining the normal flow, which the book actually recommends. My error handling provides context by logging the error with `console.error()` before returning the fallback value. I could improve this by creating custom exception classes, but for this small app the basic error handling works fine.

```typescript
// From PersonService.ts - using exceptions with try-catch
async generatePortrait(person: PersonData): Promise<string> {
  try {
    const response = await $fetch<PortraitResponse>("/api/generate-portrait", {
      method: "POST",
      body: this.buildPortraitRequest(person),
    });
    return response.imageUrl;
  } catch (error) {
    console.error("Failed to generate portrait:", error);
    return this.defaultImageUrl;
  }
}
```

```typescript
// From API - defining normal flow by returning safe default
try {
  const portraitFactory = new PortraitGeneratorFactory();
  const portraitGenerator = portraitFactory.createFromEnv();
  const imageUrl = await portraitGenerator.generatePortrait(person);
  return { imageUrl };
} catch (error) {
  console.error("Portrait generation error:", error);
  return { imageUrl: "/blank-profilepic.svg" }; // Safe default instead of null
}
```

---

## Chapter 8: Boundaries

This chapter is about working with third-party code and APIs. In my app, i use the `person-data-generator` module which is my own code from L2, but i also use external APIs like Replicate for image generation. The book talks about wrapping third-party APIs to keep clean boundaries, and i do this in multiple places. In my L2 module, the `PortraitGenerator` class wraps the Replicate API, and in my L3 app, the `PersonService` class wraps the module. This means if i want to switch to a different AI service later, i only need to change code in one place. The book also mentions learning tests, which i don't have, but i did test my API integration manually to make sure it works. I also created a `PortraitGeneratorFactory` class that handles the creation of the generator with the API token from environment variables, which keeps the boundary clean.

```typescript
// From generate-portrait.post.ts - wrapping external API with factory pattern
import { PortraitGeneratorFactory } from "person-data-generator/person-ai.js";

export default defineEventHandler(async (event) => {
  const personData = await readBody<PersonData>(event);

  try {
    const person = new Person(/* ...params */);
    // Factory creates generator with API token from environment
    const portraitFactory = new PortraitGeneratorFactory();
    const portraitGenerator = portraitFactory.createFromEnv();
    const imageUrl = await portraitGenerator.generatePortrait(person);
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

This chapter emphasizes that classes should be small and have a single responsibility. I improved my code by creating a `PersonService` class that handles the business logic, separating it from the UI concerns in the component. Now my `PersonComponent.vue` only handles UI state and delegates all business logic to the service. The book talks about cohesion, meaning that methods should use the instance variables, and my `PersonService` class does this well because all methods use the `personGenerator` and `defaultImageUrl` instance variables. The Person class from my module follows SRP well because it just represents person data, while `PersonGenerator` handles creation. The book says organizing for change and maintaining cohesion results in many small classes, and my refactored code now has this structure.

```typescript
// PersonService - handles business logic, good SRP
export class PersonService {
  private personGenerator: PersonGenerator;
  private defaultImageUrl: string;

  generatePerson(): PersonData {
    return this.personGenerator.generate();
  }

  async generatePortrait(person: PersonData): Promise<string> {
    // Only API concern
  }
}
```

```typescript
// PersonComponent - now only handles UI concerns
const personService = new PersonService();
const person = ref(personService.generatePerson());
const isLoadingImage = ref(false);

async function generateWithImage() {
  person.value = personService.generatePerson();
  isLoadingImage.value = true; // UI concern only
  imageSrc.value = await personService.generatePortrait(person.value);
  isLoadingImage.value = false; // UI concern only
}
```

```typescript
// Person class from module - good SRP, only handles person data
export class Person {
  private firstName: string;
  private lastName: string;
  // ...

  getName() { return this.firstName; }
  getSurname() { return this.lastName; }
}

// PersonGenerator - separate class for creation
export class PersonGenerator {
  generate(): Person { /* ... */ }
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

Going through Clean Code chapters 2-11 changed how i think about writing code. The biggest lessons for me were about meaningful naming, keeping functions small, and the Single Responsibility Principle. I tried to apply these principles in both my L3 app and when improving my L2 module. In my L2 module i refactored the code to avoid static methods and instead use proper OOP with classes like `PersonGenerator`, `EmailGenerator`, `ProfessionResolver`, and `RandomSelector`. In my L3 app i created a `PersonService` class that separates business logic from UI concerns. Some things are harder to apply in framework code like Vue and Nuxt, but the underlying principles still make sense. The main thing i learned is that code is read way more than it is written, so making it clear and understandable is more important than being clever or writing less lines.

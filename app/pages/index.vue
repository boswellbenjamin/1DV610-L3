<script setup lang="ts">
import { Person } from "person-data-generator";

function test() {
  const person = Person.random();
  console.log(`${person.getName()} ${person.getSurname()}`);
}
</script>

<template>
  <p>testing</p>
  <button @click="test" class="bg-blue-500 text-white px-4 py-2">
    Styled button
  </button>
</template>

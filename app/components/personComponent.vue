<script lang="ts" setup>
import { ref } from "vue";
import { Person } from "person-data-generator";

let person = ref(Person.random());

function generateNewPerson() {
  person.value = Person.random();
}

function getRandomImage() {
  // TODO: implement function to get random image from my npm package and display it here. Also, add a loading spinner while the image is being fetched.
  return "/blank-profilepic.svg";
}

const imageSrc = ref("/blank-profilepic.svg");
</script>

<template>
  <div
    class="max-w-2xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 text-white"
  >
    <div class="flex flex-col items-center mb-8">
      <div class="relative">
        <img
          :src="imageSrc"
          alt="Profile picture"
          class="w-64 h-64 rounded-full border-4 shadow-lg object-cover"
        />
      </div>
    </div>

    <div class="space-y-4 mb-8">
      <div class="bg-gray-700/50 rounded-xl p-4">
        <div class="text-sm text-gray-400 mb-1">Full Name</div>
        <div class="text-lg font-semibold">
          {{ person.getName() }} {{ person.getSurname() }}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="bg-gray-700/50 rounded-xl p-4">
          <div class="text-sm text-gray-400 mb-1">Age</div>
          <div class="text-lg font-semibold">{{ person.getAge() }}</div>
        </div>

        <div class="bg-gray-700/50 rounded-xl p-4">
          <div class="text-sm text-gray-400 mb-1">Profession</div>
          <div class="text-sm font-medium">{{ person.getProfession() }}</div>
        </div>
      </div>

      <div class="bg-gray-700/50 rounded-xl p-4">
        <div class="text-sm text-gray-400 mb-1">Email</div>
        <div class="text-sm font-medium break-all">{{ person.getEmail() }}</div>
      </div>

      <div class="bg-gray-700/50 rounded-xl p-4">
        <div class="text-sm text-gray-400 mb-1">Location</div>
        <div class="text-sm font-medium">
          {{ person.getCity() }}, {{ person.getCountry() }}
        </div>
      </div>
    </div>

    <button
      @click="
        generateNewPerson();
        imageSrc = '/blank-profilepic.svg';
      "
      class="w-full bg-blue-500 hover:from-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
    >
      Generate New Person
    </button>
  </div>
</template>

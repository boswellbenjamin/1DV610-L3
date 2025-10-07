<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { Person } from "person-data-generator";

let person = ref(Person.random());
const imageSrc = ref("/blank-profilepic.svg");
const isLoadingImage = ref(false);

async function renderPortrait() {
  isLoadingImage.value = true;
  try {
    const response = await $fetch("/api/generate-portrait", {
      method: "POST",
      body: {
        firstName: person.value.getName(),
        lastName: person.value.getSurname(),
        age: person.value.getAge(),
        gender: person.value.getGender(),
        profession: person.value.getProfession(),
        country: person.value.getCountry(),
        city: person.value.getCity(),
        postalCode: person.value.getPostalCode(),
        address: person.value.getAddress(),
        email: person.value.getEmail(),
      },
    });
    imageSrc.value = response.imageUrl;
  } catch (error) {
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
</script>

<template>
  <div
    class="max-w-2xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl p-8 text-white"
  >
    <p class="mb-8 flex justify-center text-red-500 underline">
      Note that image generation can take some time, so please be patient.
    </p>
    <div class="flex flex-col items-center mb-8">
      <div class="relative w-64 h-64">
        <img
          :src="imageSrc"
          alt="Profile picture"
          class="w-64 h-64 rounded-full border-4 shadow-lg object-cover"
        />
        <div
          v-if="isLoadingImage"
          class="absolute inset-0 w-64 h-64 rounded-full border-4 shadow-lg flex items-center justify-center bg-gray-700"
        >
          <svg
            class="animate-spin h-12 w-12 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            ></circle>
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
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
      @click="generateWithImage()"
      :disabled="isLoadingImage"
      class="w-full bg-blue-500 hover:from-blue-600 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Generate New Person
    </button>
  </div>
</template>

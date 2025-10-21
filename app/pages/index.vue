<script setup lang="ts"></script>

<template>
  <div class="min-h-screen py-12 px-4">
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-16">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Random Person Generator
        </h2>
        <div
          class="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-xl"
        >
          <p class="text-gray-300 text-lg leading-relaxed">
            This Random Person Generator is a quick and easy way to create
            identity data. If you want everything to be randomized, just press
            the Generate button, if you want to specify some parameters, you can
            do that too through pressing the "Advance options" button. As of
            now, the randomised data you can get is name, surname, age, gender,
            profession, country, city, postal code, street address and email.
            The location data is based on real world data, so the cities and
            postal codes are valid.
          </p>
        </div>
      </div>
      <PersonComponent />
    </div>
  </div>
</template>

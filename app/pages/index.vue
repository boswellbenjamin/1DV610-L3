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
            This Random Person Generator lets you quickly generate mock person
            data, with real looking details for testing, prototyping, or any
            other use case where you need sample identities. You can also choose
            to generate a profile picture along with the personal details,
            creating a more complete and realistic identity profile.
          </p>
        </div>
      </div>
      <PersonComponent />
    </div>
  </div>
</template>

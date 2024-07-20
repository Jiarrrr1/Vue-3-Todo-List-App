<script setup>
import Navigation from './components/navigation.vue'

</script>
<template>
  <div>
    <Navigation />
    <div class="w-[360px] mx-auto p-3 ">
      <router-view></router-view>
    </div>
  </div>
</template>
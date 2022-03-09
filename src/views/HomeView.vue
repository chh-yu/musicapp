<template>
  <div class="home">
    <keep-alive include="Recommend">
      <router-view @login="$emit('login')"></router-view>
    </keep-alive>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

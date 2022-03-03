<template>
  <div class="home">
    <router-view @login="$emit('login')"></router-view>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

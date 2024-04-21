<script setup lang="ts">
const props = defineProps<{
  error: object
}>()

const handleBackHome = () => clearError({ redirect: '/' })
</script>

<template>
  <a-result
    :status="error.statusCode"
    :title="error.statusCode"
    :sub-title="error.message"
  >
    <template #extra>
      <a-button type="primary" @click="handleBackHome">回到首页</a-button>
    </template>
  </a-result>
</template>
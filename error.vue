<script setup lang="ts">
interface Error {
  // HTTP响应状态码
  statusCode: number
  // HTTP响应状态消息
  statusMessage: string
  // 错误消息
  message: string
}

const props = defineProps<{
  error: Error
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
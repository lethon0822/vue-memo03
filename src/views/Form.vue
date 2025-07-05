<script setup>
import httpServices from '@/services/httpServices';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, reactive } from 'vue';

const router = useRouter();
const state = reactive({
  memo: {
    id: 0,
    title: '',
    content: '',
    createdAt: '',
  },
});

onMounted(()=>{
  const passData = history.state.data;
  if (passData) {
    state.memo = JSON.parse(passData);
  }
})

const submit = async () => {
  let data = null;
  let path = '/';
  const jsonBody = {
    title: state.memo.title,
    content: state.memo.content,
  };
  if (state.memo.id > 0) {
    jsonBody.id = state.memo.id;
    path = `/memos/${jsonBody.id}`;
    data = await httpServices.modify(jsonBody);
  } else {
    data = await httpServices.save(jsonBody);
  }

  if (data.resultData === 1) {
    alert('성공');
    router.push({ path });
  } else {
    alert(data.resultMessage);
  }
};
</script>

<template>
  <form class="detail" @submit.prevent="submit">
    <div class="mb-3" v-if="state.memo.createdAt">
      등록일시: {{ state.memo.createdAt }}
    </div>
    <div class="mb-3">
      <label for="title" class="form-label">제목</label>
      <input
        type="text"
        id="title"
        class="form-control p-3"
        v-model="state.memo.title"
      />
    </div>
    <div class="mb-3">
      <label for="content" class="form-label">내용</label>
      <textarea
        id="content"
        class="form-control p-3"
        v-model="state.memo.content"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary w-100 py-3">{{ state.memo.id > 0 ? '수정' : '저장' }}</button>
  </form>
</template>

<style scoped></style>

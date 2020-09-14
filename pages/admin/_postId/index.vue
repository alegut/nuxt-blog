<template>
  <div class="admin-post-page">
      <section class="update-form">
          <AdminPostForm :post="loadedPost" @submit="onSubmitted"/>
      </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  components: {
    AdminPostForm
  },
  data: () => ({
      loadedPost: {}
  }),
  fetch() {    
    console.log('this.$route.params.id', this.$route.params);
     this.$axios.get(`https://nuxt-blog-3fefa.firebaseio.com/posts/${this.$route.params.postId}.json`).then(res => {
       this.loadedPost = res.data;
       console.log(res);
    });    
  },
  methods: {
    onSubmitted(editedPost) {
      this.$axios.put(`https://nuxt-blog-3fefa.firebaseio.com/posts/${this.$route.params.postId}.json`, editedPost)
      this.$router.push('/admin')
    }
  }
};
</script>

<style>

</style>
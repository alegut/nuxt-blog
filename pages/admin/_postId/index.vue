<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmitted" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm";

export default {
  layout: "admin",
  middleware: ['check-auth', 'auth'],
  components: {
    AdminPostForm
  },
  data: () => ({
    loadedPost: {}
  }),
  fetch() {
    this.$axios
      .get(process.env.baseUrl + `/posts/${this.$route.params.postId}.json`)
      .then(res => {
        this.loadedPost = { ...res.data, postId: this.$route.params.postId };
      });
  },
  methods: {
    onSubmitted(editedPost) {
      // this.$axios.put(`https://nuxt-blog-3fefa.firebaseio.com/posts/${this.$route.params.postId}.json`, editedPost)
      // this.$router.push('/admin')
      this.$store
        .dispatch("editPost", {
          ...editedPost,
          postId: this.$route.params.postId
        })
        .then(() => {
          this.$router.push("/admin");
        });
    }
  }
};
</script>

<style></style>

<template>
  <div class="single-post-page">
    <section class="post">
      {{ post.title }}
      <h1 class="post-title">{{ post.title }}</h1>
      <div class="page-details">
        <div class="post-detail">Last updated on {{ post.updatedDate }}</div>
        <div class="post-detail">Written by {{ post.author }}</div>
      </div>
      <p class="post-content">{{ post.content }}</p>
    </section>
    <section class="post-feedback">
      <p>
        {{ post.postId }}
        Let me know what you think about the post, send a mail to
        <a href="maito:@alegut2005@ukr.net">alegut2005@ukr.net</a>
      </p>
    </section>
  </div>
</template>

<script>
export default {
  // asyncData(context, callback) {
  //   setTimeout(() => {
  //     callback(null, {
  //       loadedPost: {
  //         id: "1",
  //         title: "First Post ID:" + context.params.id +")",
  //         previewText: "This is our first post!",
  //         author: 'Alex',
  //         updatedDate: new Date(),
  //         content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error exercitationem adipisci assumenda deleniti, rerum dignissimos architecto labore quod laudantium dolorum? Assumenda harum ex reiciendis natus incidunt, repellendus placeat numquam soluta non qui nihil aliquid tempore totam praesentium ipsam, adipisci deleniti?',
  //         thumbnail:
  //           "https://images.pexels.com/photos/2176593/pexels-photo-2176593.jpeg?cs=srgb&dl=pexels-quang-nguyen-vinh-2176593.jpg&fm=jpg"
  //       }
  //     });
  //   }, 1000);
  // },  
  data() {
    return {
      post: {}
    };
  },
  async fetch() {
    const post = await this.$axios.get(
      process.env.baseUrl + `/posts/${this.$route.params.postId}.json`
    );
    this.post = post.data;
  },
  head() {
    return {
      title: this.post.title
    };
  }
};
</script>

<style scoped>
.single-post-page {
  padding: 30px;
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 600px;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}
</style>

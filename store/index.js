export const state = () => ({
    loadedPosts: [],
    post: null
})

export const mutations = {
    setPosts(state, posts) {
        state.loadedPosts = posts
    },
    setPost(state, post) {
        state.post = post
    },
}

export const actions = {
    nuxtServerInit({ dispatch, commit }) {        
        return this.$axios.get('https://nuxt-blog-3fefa.firebaseio.com/posts.json')
            .then(res => {
                const postsArray = [];
                for (const key in res.data) {
                    postsArray.push({...res.data[key], id: key})
                }
                console.log();
                
                commit('setPosts', postsArray);
            })
        .catch(e => context.error(e))  
    },
    // async setPosts({commit}) {
        // const posts = await this.$axios.$get(
        //   "https://nuxt-blog-3fefa.firebaseio.com/posts.json"
        // );      
        // commit('setPosts', posts);
    // },
    async setPost({ commit }, id) {
        const post = await this.$axios.$get(
            "http://localhost:3001/posts/" + id
        );
        console.log(post);
        commit('setPost', post);
    },
    
}

export const getters = {
    loadedPosts(state) {
        return state.loadedPosts
    },
    getPost(state) {
        return state.post;
    }
}
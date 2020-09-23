import Cookie from "js-cookie";

export const state = () => ({
  loadedPosts: [],
  post: null,
  token: null
});

export const mutations = {
  setPosts(state, posts) {
    state.loadedPosts = posts;
  },
  addPost(state, post) {
    state.loadedPosts.push(post);
  },
  editPost(state, editedPost) {
    const postIndex = state.loadedPosts.findIndex(
      post => post.postId === editedPost.postId
    );
    state.loadedPosts[postIndex] = editedPost;
  },
  setToken(state, token) {
    state.token = token;
  },
  clearToken(state) {
    state.token = null;
  }
};

export const actions = {
  nuxtServerInit({ commit }) {
    return this.$axios
      .get(process.env.baseUrl + "/posts.json")
      .then(res => {
        const postsArray = [];
        for (const key in res.data) {
          postsArray.push({ ...res.data[key], postId: key });
        }
        commit("setPosts", postsArray);
      })
      .catch(e => context.error(e));
  },
  async addPost({ state, commit }, postData) {
    const createdPost = { ...postData, updatedDate: new Date() };
    return this.$axios
      .post(
        process.env.baseUrl + `/posts.json?auth=${state.token}`,
        createdPost
      )
      .then(result =>
        commit("addPost", { ...createdPost, postId: result.data.name })
      )
      .catch(e => console.log(e));
  },
  async editPost({ state, commit }, editedPost) {
    console.log("state.token", state.token);
    return this.$axios
      .put(
        process.env.baseUrl +
          `/posts/${editedPost.postId}.json?auth=${state.token}`,
        editedPost
      )
      .then(res => {
        commit("editPost", editedPost);
      });
  },
  authenticateUser({ commit, dispatch }, authData) {
    let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.fbAPIKey}`;
    if (!authData.isLogin) {
      authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.fbAPIKey}`;
    }
    return this.$axios
      .$post(authUrl, {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
      .then(res => {
        commit("setToken", res.idToken);
        localStorage.setItem("token", res.idToken);
        localStorage.setItem(
          "tokenExpiration",
          new Date().getTime() + +res.expiresIn * 1000
        );
        Cookie.set("jwt", res.idToken);
        Cookie.set(
          "expirationDate",
          new Date().getTime() + +res.expiresIn * 1000
        );
        // dispatch("setLogoutTimer", res.expiresIn * 1000);
        return this.$axios.$post('http://localhost:3000/api/track-data', {
          data: 'Authenticated'
        })
      })
      .catch(e => console.log(e));
  },
  initAuth({ commit, dispatch }, req) {
    let token;
    let expirationDate;
    if (req) {
      if (!req.headers.cookie) {
        return;
      }
      const jwtCookie = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("jwt="));
      if (!jwtCookie) {
        return;
      }
      token = jwtCookie.split("=")[1];
      expirationDate = req.headers.cookie
        .split(";")
        .find(c => c.trim().startsWith("expirationDate="))
        .split("=")[1];
    } else {
      token = localStorage.getItem("token");
      expirationDate = localStorage.getItem("tokenExpiration");
    }
    if (new Date().getTime() > +expirationDate || !token) {
      console.log("No token or invalid token");
      // commit("clearToken");
      dispatch("logout");
      return;
    }
    commit("setToken", token);
  },
  logout({ commit }) {
    commit("clearToken");
    Cookie.remove("jwt");
    Cookie.remove("expirationDate");
    if(process.client) {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }
  }
};

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts;
  },
  getPost(state) {
    return state.post;
  },
  isAuthenticated(state) {
    return state.token != null;
  }
};

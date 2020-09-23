export default function({store, req}) {
  console.log("Middleware [check-auth]", req);  
  store.dispatch("initAuth", req);
  
}

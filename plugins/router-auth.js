export default function ({ store, redirect, route}) {

  if (isLogin(store) && route.name === 'login') {
    window.location.href = "/admin";
  }

  if (!isLogin(store) && route.name === 'admin') {
    window.location.href = "/login";
  }
}

const isLogin = (store) => {
  return (store && store.state && store.state.main.user)
}


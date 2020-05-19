const routes = [
  {
    path: '/',
    component: () => import('../pages/MainPage')
  },
  {
    path: '/movie-categories/:category',
    component: () => import('../pages/MovieCategories'),
    props: true,
    category: 'popular'
  },
  {
    path: '/movie-detail/:idMovie',
    component: () => import('../pages/MovieDetail'),
    props: true,
    idMovie: 0
  }
]

export default routes
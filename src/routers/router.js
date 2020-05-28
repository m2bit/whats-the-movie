const routes = [
  {
    name: 'main',
    path: '/',
    component: () => import('../pages/MainPage')
  },
  {
    name: 'movie-categories',
    path: '/movie-categories/:category',
    component: () => import('../pages/MovieCategories'),
    props: true,
    category: 'popular'
  },
  {
    name: 'movie-detail',
    path: '/movie-detail/:idMovie',
    component: () => import('../pages/MovieDetail'),
    props: true,
    idMovie: 0
  },
  {
    name: 'statistic-page',
    path: '/statistic-page',
    component: () => import('../pages/StatisticsPage')
  }
]

export default routes
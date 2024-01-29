import { createRouter, createWebHistory } from 'vue-router'
import Formulario from '@/components/Formulario.vue'
import Relatorio from '@/components/Relatorio.vue'
import Grid from '@/components/Grid.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/formulario/',
      name: 'formulario',
      component: Formulario,
      props: true,
      // beforeEnter: (to, from, next) => {
      //   to.params.teste = to.params.teste;
      //   next();
      // },
    },
    {
      path: '/relatorio/:dados',
      name: 'relatorio',
      component: Relatorio,
      props: true,
      beforeEnter: (to, from, next) => {
        to.params.dados = JSON.parse(decodeURIComponent(to.params.dados));
        next();
      },
    },
    {
      path: '/',
      name: 'grid',
      component: Grid,
    },
  ]
})

export default router

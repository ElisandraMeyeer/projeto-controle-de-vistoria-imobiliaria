import { createRouter, createWebHistory } from 'vue-router'
import Formulario from '@/components/Formulario.vue'
import Relatorio from '@/components/Relatorio.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'formulario',
      component: Formulario
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
  ]
})

export default router

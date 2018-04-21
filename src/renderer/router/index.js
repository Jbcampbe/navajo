import Vue from 'vue'
import Router from 'vue-router'

import Application from '@/components/Application'
import Shift from '@/components/Shift'
import Vigenere from '@/components/Vigenere'
import Anagram from '@/components/Anagram'
import Columnar from '@/components/Columnar'
import Substitution from '@/components/Substitution'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Application,
      children: [
        {
          path: '',
          redirect: 'shift'
        },
        {
          path: 'shift',
          component: Shift
        },
        {
          path: 'vigenere',
          component: Vigenere
        },
        {
          path: 'anagram',
          component: Anagram
        },
        {
          path: 'columnar',
          component: Columnar
        },
        {
          path: 'substitution',
          component: Substitution
        }
      ]
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/produto/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '/produto/',
        name: 'Produto.Listagem',
        component: () => import('../views/produto/ProdutoListagem.vue')
      },
      {
        path: '/produto/cadastro',
        name: 'Produto.Cadastro',
        component: () => import('../views/produto/ProdutoCadastro.vue')
      },
      {
        path: '/produto/edicao/:id',
        name: 'Produto.Edicao',
        component: () => import('../views/produto/ProdutoEdicao.vue')
      },
      {
        path: '/produto/visualizacao/:id',
        name: 'Produto.Visualizacao',
        component: () => import('../views/produto/ProdutoVisualizacao.vue')
      }
    ]
  },
  {
    path: '/movimento-produto/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '/movimento-produto/cadastro',
        name: 'MovimentoProduto.Cadastro',
        component: () => import('../views/movimento-produto/MovimentoProdutoCadastro.vue')
      }
    ]
  },
  {
    path: '/relatorios/lucro-saida/',
    component: () => import('../views/Layout.vue'),
    children: [
      {
        path: '/relatorios/lucro-saida/',
        name: 'Relatorio.LucrosETotais',
        component: () => import('../views/relatorios/LucrosETotais.vue')
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;

import { createRouter, createWebHashHistory } from 'vue-router';

/**
 * ! name 的名稱不能重複
 * ! children 的 path 不用加 '/'
 */
const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/user/HomeView.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/user/ProductsView.vue')
      },
      {
        path: 'product/:id',
        name: 'Product',
        component: () => import('@/views/user/ProductDetail.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/user/CartView.vue')
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/AboutView.vue')
      }
    ]
  },
  {
    path: '/adminLogin',
    name: 'AdminLogin',
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/admin',
    component: () => import('@/views/layout/AdminLayout.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('@/views/admin/ProductsView.vue')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('@/views/admin/OrdersView.vue')
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('@/views/admin/CouponsView.vue')
      }
    ]
  },
  {
    path: '/admin/:pathMatch(.*)*',
    redirect: { name: 'AdminLogin' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
});

export default router;


import HomePage from '../pages/home.vue';
import Menu from '../pages/menu.vue';
import Voucher from '../pages/voucher.vue';
import VoucherDetail from '../pages/voucherDetail.vue';
import Profile from '../pages/profile.vue';
import Cart from '../pages/cart.vue';
import Checkout from '../pages/checkout.vue';
import Login from '../pages/login.vue';
import Signup from '../pages/signup.vue';
import Notification from '../pages/notification.vue';
import NotFoundPage from '../pages/404.vue';

var routes = [
  {
    path: '/',
    component: HomePage
  },
  {
    path: '/menu',
    component: Menu
  },
  {
    path: '/voucher',
    component: Voucher
  },
  {
    path: '/voucher/:id',
    component: VoucherDetail
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/checkout',
    component: Checkout
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/signup',
    component: Signup,
  },
  {
    path: '/notification',
    component: Notification,
  },

  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
routes.reloadCurrent = true
routes.mode = 'history'
export default routes;


import HomePage from '../pages/home.vue';
import Menu from '../pages/menu.vue';
import Voucher from '../pages/voucher.vue';
import VoucherDetail from '../pages/voucherDetail.vue';
import Profile from '../pages/profile.vue';
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

  // {
  //   path: '/request-and-load/user/:userId/',
  //   async: function ({ router, to, resolve }) {
  //     // App instance
  //     var app = router.app;

  //     // Show Preloader
  //     app.preloader.show();

  //     // User ID from request
  //     var userId = to.params.userId;

  //     // Simulate Ajax Request
  //     setTimeout(function () {
  //       // We got user data from request
  //       var user = {
  //         firstName: 'Vladimir',
  //         lastName: 'Kharlampidi',
  //         about: 'Hello, i am creator of Framework7! Hope you like it!',
  //         links: [
  //           {
  //             title: 'Framework7 Website',
  //             url: 'http://framework7.io',
  //           },
  //           {
  //             title: 'Framework7 Forum',
  //             url: 'http://forum.framework7.io',
  //           },
  //         ]
  //       };
  //       // Hide Preloader
  //       app.preloader.hide();

  //       // Resolve route to load page
  //       resolve(
  //         {
  //           component: RequestAndLoad,
  //         },
  //         {
  //           props: {
  //             user: user,
  //           }
  //         }
  //       );
  //     }, 1000);
  //   },
  // },
  {
    path: '(.*)',
    component: NotFoundPage,
  },
];
routes.reloadCurrent = true
routes.mode = 'history'
export default routes;

export default defineNuxtRouteMiddleware((to, from) => {
    const privatePages = [
      'event-planner',
      '/dashboard',
      '/dashboard/profile',
      '/dashboard/purchases',
      '/dashboard/favorites',
      '/dashboard/information',
      '/dashboard/purchases/{id}',
      '/dashboard/rating/{id}',
      '/dashboard/security',
      '/dashboard/address'
    ];

    const authRequired = privatePages.includes(to.path);
    const loggedIn = process.client && localStorage.getItem('user_data');

    // trying to access a restricted page + not logged in
    // redirect to login page
    if (authRequired && !loggedIn) {
      return navigateTo('/login');
    }
  });
  
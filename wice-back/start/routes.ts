/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import User from '#models/user'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.post('register', [AuthController, 'register'])
  router.post('login', [AuthController, 'login'])
}).prefix('user')
router.get('me', async ({ auth, response }) => {
  const user = await User.findOrFail(auth.user!.id)
  return response.ok(user)
}).use(middleware.auth({ guards: ['api'] }))
import { Router } from 'express'
import {
  getUsers,
  getUserById,
  registerUser
} from '../controllers/user.controller.js'

const router = Router()

router.get('/', getUsers)          // GET /users
router.get('/:id', getUserById)    // GET /users/:id
router.post('/', registerUser)     // POST /users

export default router

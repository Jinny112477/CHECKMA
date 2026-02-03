import { Router } from 'express'
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/user.controller.js'

const router = Router()

router.get('/', getUsers)              // GET /users
router.get('/:id', getUserById)        // GET /users/:id
router.post('/', createUser)           // POST /users
router.put('/:id', updateUser)         // PUT /users/:id
router.delete('/:id', deleteUser)      // DELETE /users/:id

export default router
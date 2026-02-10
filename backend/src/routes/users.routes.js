import { Router } from 'express'
import {
  logingWithEmail,
  syncUserProfile
} from '../controllers/user.controller.js'

const router = Router()

router.post('/sync', syncUserProfile)     // POST /api/users/sync
router.post('api/users', logingWithEmail) //GET /api/users

export default router

import { Router } from 'express'
import {
  syncUserProfile
} from '../controllers/user.controller.js'

const router = Router()

router.post('/sync', syncUserProfile)     // POST /api/users/sync

export default router

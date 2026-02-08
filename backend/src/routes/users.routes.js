import { Router } from 'express'
import {
  syncUserProfile
} from '../controllers/user.controller.js'

const router = Router()

router.post('/', syncUserProfile)     // POST /api/users/sync

export default router

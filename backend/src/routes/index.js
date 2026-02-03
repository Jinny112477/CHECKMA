import express from 'express'
import cors from 'cors'
import router from './routes/index.js'

const app = express()

app.use(cors())
app.use(express.json())

// mount root router
app.use('/api', router)

app.listen(5000, () => {
  console.log('API running on port 5000')
})
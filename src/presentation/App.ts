import { container } from '@di/container'
import { tokens } from '@di/tokens'
import bodyParser from 'body-parser'
import express, { Router } from 'express'
import { Routes } from './http/Routes'
import { CronJob } from './job/CronJob'

const router = Router()
const routes = container.resolve<Routes>(tokens.Routes)
routes.setupRouter(router)

const cronJob = container.resolve<CronJob>(tokens.CronJob)

cronJob.run()

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(router)

export default app

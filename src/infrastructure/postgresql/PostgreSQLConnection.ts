import { DataSource } from 'typeorm'
import { defaultOptions } from './PostgreSQLClient'

export default new DataSource({
    ...defaultOptions
})
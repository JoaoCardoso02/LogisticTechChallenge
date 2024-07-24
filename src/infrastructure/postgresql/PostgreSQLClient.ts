import { DataSource, DataSourceOptions } from "typeorm";

require('dotenv').config();

export const defaultOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    entities: [`${__dirname}/../../**/entities/**{.ts,.js}`],
    migrations: [`${__dirname}/../migrations/**{.ts,.js}`],
}

export class PostgreSQLClient extends DataSource {
    constructor(options: DataSourceOptions = defaultOptions) {
        super(options);
        super.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            });
    }
}
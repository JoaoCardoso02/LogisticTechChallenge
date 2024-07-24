import { DataSource } from "typeorm";

require('dotenv').config();

export interface IPostgreSQLOptions {
    host?: string;
    port?: number;
    username?: string;
    password?: string;
    database?: string;
}

const defaultOptions: IPostgreSQLOptions = {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}

export class PostgreSQLClient extends DataSource {
    constructor(options: IPostgreSQLOptions = defaultOptions) {
        super({
            ...options,
            type: 'postgres',
            synchronize: true,
            entities: [`${__dirname}/../../**/entities/**{.ts,.js}`],
        });
        super.initialize()
            .then(() => {
                console.log("Data Source has been initialized!")
            })
            .catch((err) => {
                console.error("Error during Data Source initialization", err)
            });
    }

	public async disconnect() {
		await this?.destroy()
	}
}

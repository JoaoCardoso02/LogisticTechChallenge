import OrderJobAppService from '@application/order/OrderJobAppService';
import { tokens } from '@di/tokens';
import cron from 'node-cron';
import { inject, injectable } from 'tsyringe';

@injectable()
export class CronJob {
    constructor(
		@inject(tokens.OrderJobAppService)
		private orderJobAppService: OrderJobAppService
	) {}

    run() {
        cron.schedule('* * * * *', () => {
            this.orderJobAppService.run();
        })
    }
}
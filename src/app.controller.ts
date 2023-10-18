import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Post('/order')
  createOrder(@Body() data) {
    const order = this.appService.createOrder(data);

    this.httpService
      .post('https://webhook.site/3df9d29f-7bb4-4957-8cbf-5d1d5de5046f')
      .subscribe({
        complete() {
          console.log('completed');
        },
        error(err) {
          console.log(err);
        },
      });

    return order;
  }
}

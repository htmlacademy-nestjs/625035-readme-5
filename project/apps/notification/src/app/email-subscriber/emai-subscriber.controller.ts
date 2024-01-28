import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { RabbitRouting } from '@project/shared/shared-types';

import { EmailSubscriberService } from './email-subscriber.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { MailService } from '../mail/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService
  ) {}

  @RabbitSubscribe({
    exchange: 'readme.notify.income',
    routingKey: RabbitRouting.AddSubscriber,
    queue: 'readme.notify.income',
  })
  public async create(subscriber: CreateSubscriberDto) {
    this.subscriberService.addSubscriber(subscriber);
    this.mailService.sendNotifyNewSubscriber(subscriber);
  }
}

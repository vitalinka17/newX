import { Controller } from '@nestjs/common';
import { UserClientService } from './user-client.service';

@Controller('users')
export class UserClientController {
  constructor(private readonly userClientService: UserClientService) {}
}

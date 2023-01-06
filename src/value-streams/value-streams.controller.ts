import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAccessTokenAuthGuard } from '../auth/guard/jwt-access.guard';
import { UserEntity } from '../users/user.entity';
import { ValueStreamsDto } from './dto/value-streams.dto';
import { ValueStreamsService } from './value-streams.service';

@ApiTags('ValueStreams')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('value-streams')
export class ValueStreamsController {
  constructor(private readonly valueStreamsService: ValueStreamsService) {}
  @Get()
  async list(@GetUser() user: UserEntity) {
    return this.valueStreamsService.list(user);
  }
  @Post()
  async create(
    @GetUser() user: UserEntity,
    @Body() valueStreamsDto: ValueStreamsDto,
  ) {
    return this.valueStreamsService.create(user, valueStreamsDto);
  }
}

import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAccessTokenAuthGuard } from '../auth/guard/jwt-access.guard';
import { ValueStreamsDto } from './dto/value-streams.dto';
import { ValueStreamsService } from './value-streams.service';

@ApiTags('ValueStreams')
@ApiBearerAuth()
@UseGuards(JwtAccessTokenAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('value-streams')
export class ValueStreamsController {
  constructor(private readonly valueStreamsService: ValueStreamsService) {}
  @Post()
  async create(@Body() valueStreamsDto: ValueStreamsDto) {
    return this.valueStreamsService.create(valueStreamsDto);
  }
}

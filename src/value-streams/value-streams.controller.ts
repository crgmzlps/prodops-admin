import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from '../auth/get-user.decorator';
import { JwtAccessTokenAuthGuard } from '../auth/guard/jwt-access.guard';
import { UserEntity } from '../users/user.entity';
import { CreateValueStreamsDto } from './dto/create-value-streams.dto';
import { UpdateValueStreamsDto } from './dto/update-value-streams.dto';
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
  @Get(':id')
  async getOne(@GetUser() user: UserEntity, @Param('id') id: string) {
    return this.valueStreamsService.getOne(user, id);
  }
  @Post()
  async create(
    @GetUser() user: UserEntity,
    @Body() valueStreamsDto: CreateValueStreamsDto,
  ) {
    return this.valueStreamsService.create(user, valueStreamsDto);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@GetUser() user: UserEntity, @Param('id') id: string) {
    return this.valueStreamsService.remove(user, id);
  }
  @Patch(':id')
  async update(
    @GetUser() user: UserEntity,
    @Body() updateValueStreamsDto: UpdateValueStreamsDto,
  ) {
    return this.valueStreamsService.update(user, updateValueStreamsDto);
  }
}

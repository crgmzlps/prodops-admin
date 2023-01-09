import { PartialType } from '@nestjs/mapped-types';
import { CreateValueStreamsDto } from './create-value-streams.dto';

export class UpdateValueStreamsDto extends PartialType(CreateValueStreamsDto) {
  id: string;
}

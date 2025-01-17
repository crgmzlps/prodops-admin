import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ScansService } from './scans.service';
import { CreateScanDto } from './dto/create-scan.dto';
import { UpdateScanDto } from './dto/update-scan.dto';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';

@ApiTags('Scans')
@Controller('scans')
export class ScansController {
  constructor(private readonly scansService: ScansService) {}

  @Post()
  create(@Body() createScanDto: CreateScanDto) {
    return this.scansService.create(createScanDto);
  }

  @Get()
  findAll() {
    return this.scansService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scansService.findOne(+id);
  }

  @ApiExcludeEndpoint()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScanDto: UpdateScanDto) {
    return this.scansService.update(+id, updateScanDto);
  }

  @ApiExcludeEndpoint()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scansService.remove(+id);
  }
}

import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

class Edge {
  @ApiProperty()
  source: string;
  @ApiProperty()
  target: string;
}
class Position {
  @ApiProperty()
  x: number;
  @ApiProperty()
  y: number;
}
class NodeData {
  @ApiProperty()
  label: string;
}
class Node {
  @ApiProperty()
  id: string;
  @ApiProperty()
  data: NodeData;
  @ApiProperty()
  className: string;
  @ApiProperty({ type: Position })
  position: Position;
}

export class CreateValueStreamsDto {
  @ApiProperty({ type: [Node] })
  @IsNotEmpty()
  nodes: Array<Node>;
  @ApiProperty({ type: [Edge] })
  @IsNotEmpty()
  edges: Array<Edge>;
  @ApiProperty()
  @IsOptional()
  name: string;
}

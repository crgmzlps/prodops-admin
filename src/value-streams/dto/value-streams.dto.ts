import { IsNotEmpty, IsOptional } from 'class-validator';

class Edge {
  source: string;
  target: string;
}
class Position {
  x: number;
  y: number;
}
class NodeData {
  label: string;
}
class Node {
  id: string;
  data: NodeData;
  className: string;
  position: Position;
}

export class ValueStreamsDto {
  @IsNotEmpty()
  nodes: Array<Node>;
  @IsNotEmpty()
  edges: Array<Edge>;
  @IsOptional()
  name: string;
}

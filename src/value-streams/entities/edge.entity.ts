import { Node } from './node.entity';

export class Edge {
  id: string;
  source: Node;
  target: Node;
}

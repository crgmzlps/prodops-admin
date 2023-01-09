import { NodeType } from '../node-type.enum';

export class Node {
  id: string;
  label: string;
  type: NodeType;
  position: {
    x: number;
    y: number;
  };
}

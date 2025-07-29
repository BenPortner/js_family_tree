import type { LayoutedNode, LayoutResult } from '../layout/types';

export interface Renderer {
  render(
    layoutResult: LayoutResult,
    clickedNodeOld?: LayoutedNode,
    clickedNodeNew?: LayoutedNode
  ): any;
}

export type DominantBaseline =
  | 'auto'
  | 'text-bottom'
  | 'alphabetic'
  | 'ideographic'
  | 'middle'
  | 'central'
  | 'mathematical'
  | 'hanging'
  | 'text-top';

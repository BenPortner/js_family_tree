import { LayoutResult } from 'd3-dag';

export interface Renderer {
  render(layoutResult: LayoutResult): any;
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

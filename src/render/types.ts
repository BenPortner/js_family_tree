import { FamilyTree } from '../familyTree';
import type { LayoutResult } from '../layout/types';

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

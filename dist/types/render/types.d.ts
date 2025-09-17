import type { Coordinates, LayoutResult } from '../layout/types';
export interface Renderer {
    container: HTMLElement;
    render(layoutResult: LayoutResult, previousPosition?: Coordinates, newPosition?: Coordinates): any;
}
export type DominantBaseline = 'auto' | 'text-bottom' | 'alphabetic' | 'ideographic' | 'middle' | 'central' | 'mathematical' | 'hanging' | 'text-top';

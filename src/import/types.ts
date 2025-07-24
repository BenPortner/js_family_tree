import type { NodeDatum } from '../layout/types';

export interface Importer {
  import(data: any): NodeDatum[];
}

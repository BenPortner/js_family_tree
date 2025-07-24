import type { FamilyTreeData, Person, Union } from './types/types';
import type { NodeDatum, PersonData, UnionData } from './dag';

export interface Importer {
  import(data: FamilyTreeData): NodeDatum[];
}

export class FamilyTreeDataImporter implements Importer {
  import(data: FamilyTreeData) {
    const persons = [...Object.values(data.persons)];
    const mappedPersons = persons.map((person: Person) => {
      return {
        ...person,
        type: 'person',
        parentIds: data.links
          .filter((link) => link[1] === person.id)
          .map((link) => link[0]),
      } as PersonData;
    });
    const unions = [...Object.values(data.unions)];
    const mappedUnions = unions.map((union: Union) => {
      return {
        ...union,
        type: 'union',
        parentIds: union.partner,
      } as UnionData;
    });
    return [...mappedPersons, ...mappedUnions];
  }
}

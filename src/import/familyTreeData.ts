import type { FamilyTreeData, Person, Union } from '../familyTreeData';
import { PersonType, UnionType, type Importer } from './types';

export class FamilyTreeDataImporter implements Importer {
  import(data: FamilyTreeData) {
    const persons = [...Object.values(data.persons)];
    const mappedPersons = persons.map((person: Person) => {
      return {
        ...person,
        type: PersonType,
        parentIds: data.links
          .filter((link) => link[1] === person.id)
          .map((link) => link[0]),
        visible: person.id == data.start,
      };
    });
    const unions = [...Object.values(data.unions)];
    const mappedUnions = unions.map((union: Union) => {
      return {
        ...union,
        type: UnionType,
        parentIds: union.partner,
        visible: false,
      };
    });
    return [...mappedPersons, ...mappedUnions];
  }
}

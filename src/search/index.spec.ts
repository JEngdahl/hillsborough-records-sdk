import { Search } from './index';
import { documents as d } from '../types/documents';
describe('Name Method', () => {
  test('String Names should return no permutations', () => {
    const name = 'Test';
    const res = new Search()._name(name);

    expect(res).toEqual([name]);
  });

  test('Object Names should return 3 permutations', () => {
    const name = { first: 'First', last: 'Last' };
    const res = new Search()._name(name);

    expect(res.length).toEqual(3);
  });

  test('Names can be arrays of Names', () => {
    const names = [
      { first: 'First', last: 'Last' },
      { first: 'First2', last: 'Last2' },
    ];
    const res = new Search()._name(names);

    expect(res.length).toEqual(6);
  });

  test('Arrays of Names can be mixed Obj and Str', () => {
    const names = ['A Name', { first: 'First', last: 'Last' }];
    const res = new Search()._name(names);

    expect(res.length).toEqual(4);
  });
});

describe('Search', () => {
  test('Basic Query', () => {
    const { args } = new Search()
      .from('06/01/2019')
      .to('12/22/2020')
      .name({ first: 'Bob', last: 'Smith' })
      .documents([d.MORTGAGE, d.MODIFICATION, d.LIS_PENDENS]);

    expect(args).toEqual({
      RecordDateBegin: '06/01/2019',
      RecordDateEnd: '12/22/2020',
      PartyName: ['Smith, Bob', 'Smith Bob', 'Bob Smith'],
      DocType: ['(MTG) MORTGAGE', '(MOD) MODIFICATION', '(LP) LIS PENDENS'],
    });
  });
});

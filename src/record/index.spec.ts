import { PublicRecord } from './index';
import { PublicRecordType } from '../types/records';
import { documents } from '../types/documents';

const fakeDocFactory = (ID: string): PublicRecordType => ({
  Instrument: 1,
  PartiesOne: ['FAKE'],
  PartiesTwo: ['FAKE'],
  RecordDate: 1,
  DocType: documents.MORTGAGE,
  BookType: '0',
  BookNum: 0,
  PageNum: 0,
  SalesPrice: 0,
  ID,
});

const recordPromiseFactory = (IDs: string[]): Promise<PublicRecordType[]> =>
  new Promise((res, _) => res(IDs.map((id) => fakeDocFactory(id))));

describe('Records', () => {
  test('They should accept strings, and generate request urls', () => {
    const result = new PublicRecord().addRecord('FAKE_ID');
    expect(result.requestUrls().length).toBe(1);
  });
  test('They should accept strings, as well as DocRecords and generate request urls', () => {
    const result = new PublicRecord().addRecord(fakeDocFactory('FAKE_ID'));
    expect(result.requestUrls().length).toBe(1);
  });
  test('They should accept both and generate request urls', () => {
    const result = new PublicRecord().addRecord(fakeDocFactory('FAKE_ID')).addRecord('FAKE_ID');
    expect(result.requestUrls().length).toBe(2);
  });

  test('They should accept both and generate request urls from adding multiple', () => {
    const result = new PublicRecord().addMultiple([fakeDocFactory('FAKE_ID'), 'FAKE_ID']);
    expect(result.requestUrls().length).toBe(2);
  });

  test('Can add a Promise to doc search', () => {
    expect.assertions(1);
    return new PublicRecord()
      .addRecordPromise(recordPromiseFactory(['FAKE_ID_1', 'FAKE_ID_2', 'FAKE_ID_3']))
      .then((rec) => expect(rec.requestUrls().length).toBe(3));
  });
});

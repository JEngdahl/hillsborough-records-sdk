import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { RecordSearchType } from '../types/records';

export class PublicRecord {
  #baseUrl: string = 'https://pubrec6.hillsclerk.com/Public/ORIUtilities/OverlayWatermark/api/Watermark/';
  records: RecordSearchType[] = [];
  constructor(records?: RecordSearchType | RecordSearchType[]) {
    if (Array.isArray(records)) {
      this.addMultiple(records);
    } else if (records !== undefined) {
      this.addOne(records);
    }
  }

  addOne(record: RecordSearchType): PublicRecord {
    this.records.push(record);
    return this;
  }

  addMultiple(records: RecordSearchType[]): PublicRecord {
    this.records = [...this.records, ...records];
    return this;
  }

  private getRecordId(record: RecordSearchType) {
    if (typeof record === 'string') {
      return record;
    }
    return record.ID;
  }

  requestUrls(): string[] {
    return this.records.map(this.getRecordId).map((id) => this.#baseUrl + id);
  }

  submit(): Promise<AxiosResponse[]> {
    const reqs = this.requestUrls().map((url) => axios.get(url));

    return Promise.all(reqs);
  }
}

import axios, { AxiosPromise } from "axios";
import { RecordSearchType } from "../types/records";

export class PublicRecord {
    #baseUrl: string = "https://pubrec6.hillsclerk.com/Public/ORIUtilities/OverlayWatermark/api/Watermark/"
    records: RecordSearchType[] = []
    constructor(records: RecordSearchType | RecordSearchType[]) {
        if (Array.isArray(records)) {
            this.addMultiple(records)
        } else {
            this.addOne(records)
        }
    }

    addOne(record: RecordSearchType): PublicRecord {
        this.records.push(record)
        return this
    }

    addMultiple(records: RecordSearchType[]): PublicRecord {
        this.records = [...this.records, ...records]
        return this
    }

    private getRecordId(record: RecordSearchType) {
        if (typeof record === "string") {
            return record
        }
        return record.ID
    }

    submit(): AxiosPromise[] {
        return this.records
            .flat()
            .map(this.getRecordId)
            .map(id => axios.get(this.#baseUrl + id))
    }
}
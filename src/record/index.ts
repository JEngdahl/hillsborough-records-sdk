fetch("https://pubrec6.hillsclerk.com/Public/ORIUtilities/OverlayWatermark/api/Watermark/Abn3eRg4JmxozdppFskQhxbqxn%C3%894yXjvLXR5oUVbGoA0NVwBTRL8LyOOmzE3IioVOqwPZKbcERSupeinYrSqlsE=", {
    "headers": {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9,es;q=0.8",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
    },
    "referrer": "https://pubrec6.hillsclerk.com/res/dep/mozilla-pdf/2.2.228/web/viewer.html?file=%2FPublic%2FORIUtilities%2FOverlayWatermark%2Fapi%2FWatermark%2FAbn3eRg4JmxozdppFskQhxbqxn%C3%894yXjvLXR5oUVbGoA0NVwBTRL8LyOOmzE3IioVOqwPZKbcERSupeinYrSqlsE%3D",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
});

import axios, { AxiosPromise } from "axios";
import { RecordSearchType } from "../types/records";

class PublicRecord {
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
            .map(this.getRecordId)
            .map(id => axios.get(this.#baseUrl + id))
    }
}
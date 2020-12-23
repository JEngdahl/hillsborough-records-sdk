import { SearchableDocument } from './documents';

export type PublicRecordType = {
    Instrument: number;
    PartiesOne: string[];
    PartiesTwo: string[];
    RecordDate: number;
    DocType: SearchableDocument;
    BookType: string;
    BookNum: number;
    PageNum: number;
    Legal?: string;
    SalesPrice: number;
    ID: string;
};

export type RecordSearchType = string | PublicRecordType;

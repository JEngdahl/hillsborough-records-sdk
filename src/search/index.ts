import axios, { AxiosPromise } from 'axios';
import { PartyNames, Name, SearchableParty } from '../types/search';
import { SearchableDocument } from '../types/documents';
export class Search {
  #baseUrl: string = 'https://pubrec6.hillsclerk.com/Public/ORIUtilities/DocumentSearch/api/Search';
  args: Record<string, unknown> = {};

  private extractName(name: Name) {
    if (typeof name !== 'string') {
      return [`${name.last}, ${name.first}`, `${name.last} ${name.first}`, `${name.first} ${name.last}`];
    }
    return [name];
  }

  _name(input: PartyNames): string[] {
    if (Array.isArray(input)) {
      return input.flatMap(this.extractName);
    }
    return this.extractName(input);
  }

  name(input: PartyNames): Search {
    this.args.PartyName = this._name(input);
    return this;
  }

  documents(DocType: SearchableDocument | SearchableDocument[]): Search {
    if (Array.isArray(DocType)) {
      this.args.DocType = DocType;
    } else {
      this.args.DocType = [DocType];
    }
    return this;
  }

  party(partyType: SearchableParty): Search {
    this.args.PartyType = partyType;
    return this;
  }

  from(dateStr: string): Search {
    if (dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      this.args.RecordDateBegin = dateStr;
    } else {
      throw new Error('Please use the MM/DD/YYYY date format');
    }
    return this;
  }

  to(dateStr: string): Search {
    if (dateStr.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      this.args.RecordDateEnd = dateStr;
    } else {
      throw new Error('Please use the MM/DD/YYYY date format');
    }
    return this;
  }

  price(lower: number = 0, upper: number): Search {
    if (lower < 0) {
      throw new Error('Lower price bound should be a positive whole number or zero.');
    }
    if (!upper || upper < 0) {
      throw new Error('Upper price bound should be a positive whole number.');
    }

    this.args.SalesBottom = lower;
    this.args.SalesTop = upper;

    return this;
  }

  case(caseNum: string): Search {
    this.args.CaseNum = caseNum;
    return this;
  }

  contains(term: string): Search {
    this.args.Legal = ['CONTAINS', term];
    return this;
  }

  begins(term: string): Search {
    this.args.Legal = ['BEGINS', term];
    return this;
  }

  equals(term: string): Search {
    this.args.Legal = ['EQUALS', term];
    return this;
  }

  submit(): AxiosPromise {
    return axios.post(this.#baseUrl, this.args);
  }
}

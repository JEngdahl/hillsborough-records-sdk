export type Name = { first: string, last: string } | string
export type PartyNames = Name | Array<Name>

export const party = { "DIRECT": "PARTY 1", "REVERSE": "PARTY 2" }
export type PartyKey = keyof typeof party;
export type SearchableParty = typeof party[PartyKey];
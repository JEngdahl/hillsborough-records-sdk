# Hillsborough County Public Records Search

A package to search documents available in public record.

Searches are created as new Class instantiations

```ts
import {Search, documents as d} from "hillsborough-records-api"
const { args } = new Search()
    .from("06/01/2019")
    .to("12/22/2020")
    .name({ first: "Bob", last: "Smith" })
    .documents([
        d.MORTGAGE,
        d.MODIFICATION,
        d.LIS_PENDENS,
    ])
    .submit()
```

## Search Options

`name` : string | { first: string, last: string } | [Names]

`document` : [SearchableDocument]

`party` : SearchableParty

`from` : DD/MM/YYYY

`to` : DD/MM/YYYY

`price` : number, number

`case` : string

## Filters

These are Legal filters. I've never used them, but you may have an idea for them!

`begins` : string

`contains` : string

`equals` : string

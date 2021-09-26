//TIPOS DEFINIDOS

type Comic = {
    id?: number,
    digitalId?: number,
    title?: string,
    issueNumber?: number,
    variantDescription?: string,
    description?: string,
    modified?: Date,
    isbn?: string,
    upc?: string,
    diamondCode?: string,
    ean?: string,
    issn?: string,
    format?: string,
    pageCount?: number,
    textObjects?: [{
        type?: string,
        language?: string,
        text?: string,
    }],
    resourceURI?: string,
    urls?: [{
        type?: string,
        url?: string
    }],
    series?: {
        resourceURI?: string,
        name?: string,
    },
    variants?: string[],
    collections?: string[],
    collectedIssues?: string[],
    dates: [{
        type?: string,
        date?: string,
    },
        {
        type?: string,
        date?: string,
        }],
    prices?:             {
        type?:  string,
        price?: number,
    },
    thumbnail?: {
        path?: string,
        extension?: string,
    },
    images?: {
        path?: string,
        extension?: string,
    },
    creators?: {
        available?: number,
        collectionURI?: string,
        items?: Character[],
        returned?: number
    },
    characters?: {
        available?: number,
        collectionURI?: string,
        items?: [],
        returned?: number,
    },
    stories?: {
        available?: number,
        collectionURI?: string,
        items?:[{
            resourceURI?: string,
            name?: string,
            type?: string,
        }],
        returned?: number, 
    },
    events?: {
        available?: number,
        collectionURI?: string,
        items?: [{
            resourceURI?: string,
            name?: string,
        }],
        returned?: number,
    },
}


type Character = {
    id?:          number,
    name?:        string,
    description?: string,
    modified?:    Date,
    thumbnail?:  {
        path?:    string,
        extension?: string,
    },
    resourceURI?: string,
    comics?:      {
        available?: number,
        collectionURI?: string,
        items?:        [{
            resourceURI?: string,
            name?:        string,
        }],
        returned?:      number,
    },
    series?:      {
        available?:     number,
        collectionURI?: string,
        items?:        [{
            resourceURI?: string,
            name?:        string,
        }],
        returned?:      number,
    },
    stories?:     {
        available?:     number,
        collectionURI?: string,
        items?:         [{
            resourceURI?: string,
            name?:        string,
        }],
        returned?:      number,
    },
    events?:     {
        available?:     number,
        collectionURI?: string,
        items?:         [{
            resourceURI?: string,
            name?:        string,
        }],
        returned?:      number,
    },
    urls?:       [{
        type?: string,
        url?:  string,
    }],
}

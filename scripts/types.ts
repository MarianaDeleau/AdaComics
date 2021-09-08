//TIPOS DEFINIDOS

type Comic = {
    id?: number;
    digitalId?: number;
    title?: string;
    issueNumber?: number;
    variantDescription?: string;
    description?: string;
    modified?: Date;
    isbn?: string;
    upc?: string;
    diamondCode?: string;
    ean?: string;
    issn?: string;
    format?: string;
    pageCount?: number;
    textObjects?: {
        type?: string;
        language?: string;
        text?: string;
    };
    resourceURI?: string;
    urls?: URL[];
    series?: {
        resourceURI?: string;
        name?: string;
    };
    variants?: any[];
    collections?: any[];
    collectedIssues?: any[];
    dates: [{
        type?: string;
        date?: string;
    },
        {
        type?: string;
        date?: string;
        }];
    prices?:             {
        type?:  string;
        price?: number;
    };
    thumbnail?: {
        path?: string;
        extension?: string;
    };
    images?: any[];
    creators?: {
        available?: number,
        collectionURI?: string,
        items?: any[],
        returned?: number
    };
    characters?: {
        available?: number,
        collectionURI?: string,
        items?: any[],
        returned?: number,
    };
    stories?: {
        available?: number,
        collectionURI?: string,
        items?: any[],
    };
    events?: {
        available?: number,
        collectionURI?: string,
        items?: any[],
        returned?: number,
    };
}


type Character = {
    id?:          number;
    name?:        string;
    description?: string;
    modified?:    Date;
    thumbnail?:  {
        path?:    string;
        extension?: string;
    };
    resourceURI?: string;
    comics?:      {
        available?: number;
        collectionURI?: string;
        items?:        [{
            resourceURI?: string;
            name?:        string;
        }];
        returned?:      number;
    };
    series?:      {
        available?:     number;
        collectionURI?: string;
        items?:         any[];
        returned?:      number;
    };
    stories?:     {
        available?:     number;
        collectionURI?: string;
        items?:         any[];
        returned?:      number;
    };
    events?:     {
        available?:     number;
        collectionURI?: string;
        items?:         any[];
        returned?:      number;
    };
    urls?:       [{
        type?: string;
        url?:  string;
    }];
}

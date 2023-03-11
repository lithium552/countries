export interface Data {
    altSpellings: string[]
    area: number
    borders?: string[]
    capital: string[]
    capitalInfo: number[]
    car: {
        side: string
        signs: string[]
    }
    cca2: string
    cca3: string
    ccn3: string
    cioc: string
    coatOfArms: {
        png: string
        svg: string
    }
    continents: string[]
    currencies: {
        [key: string]: {
            name: string
            symbol: string
        }
    }
    demonyms: {
        eng: {
            f: string
            m: string
        }
        fra: {
            f: string
            m: string
        }
    }
    flag: string
    flags: {
        png: string
        svg: string
    }
    idd: {
        root: string
        suffixes: string[]
    }
    independent: boolean
    landlocked: boolean
    languages: {
        [key: string]: string
    }
    latlng: number[]
    maps: {
        [key: string]: string
    }
    name: {
        common: string
        official: string
        nativeName: {
            [key: string]: {
                official: string,
                common: string
            }
        }
    }
    population: number
    region: string
    startOfWeek: string
    status: string
    subregion: string
    timezones: string[]
    tld: string[]
    translations: {
        [key: string]: {
            official: string
            common: string
        }
    }
    unMember: boolean
} 
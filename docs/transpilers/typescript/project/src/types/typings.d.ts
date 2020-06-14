
export interface Employee {
    name: string,
    phone: string,
    position: 'CEO' | 'Developer',
    location: Countries,
    salary?: number,
}

export enum Countries {
    RUS = 'Russia',
    GER = 'Germany',
    IL = 'Israel'
}

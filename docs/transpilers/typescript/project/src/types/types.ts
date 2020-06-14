
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

export class ClassEmployee {
    property: string;

    constructor(property: string) {
        // this.property = 'asdf'
        this.property = property;
    }

    myFunc(): number {
        return 54;
    }
}

export function nameCompliance(name: string): boolean {
    return name.length == 12;
}

export enum EosAccountStatus {
    Pending = 'pending',
    Finalized = 'finalized'
}
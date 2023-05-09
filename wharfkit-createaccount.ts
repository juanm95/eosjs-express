const permissionLevel = {
    actor: 'bobbobbobbob',
    permission: 'active'
}
const privateKey = "5JtUScZK2XEp3g9gh7F8bwtPTRAkASmNrrftmx4AxDKD5K4zDnr"

// Target blockchain
const id = '73e4385a2708e6d7048834fbc1079f2fabb17b3c125b146af438971e90716c4d'
const url = 'https://jungle4.greymass.com'

// Owner/active key to set on all the test accounts. This is a public key for which the private key is needed to sign transactions?
const controlKey = 'EOS6XXTaRpWhPwnb7CTV9zVsCBrvCpYMMPSk8E8hsJxhf6VFW9DYN'

// Test permission key to set on all the accounts
const testKey = 'EOS6RMS3nvoN9StPzZizve6WdovaDkE5KkEcCDXW7LbepyAioMiK6'

// Cosigner Key for wharfkitnoop
const noopKey = 'EOS8WUgppBZ1NjnGASYeLwQ3PkNLvdnfnchumsSpo6ApCAzbETczm'

// Minimum RAM bytes to create an account
const requiredRamBytes = 1599

interface AccountDefinition {
    name: string
    balance?: string
    cpuStake?: string
    netStake?: string
    ramBytes?: number
}

export async function createAccount (account: AccountDefinition) {
    const actions: any = [
        {
            account: 'eosio',
            name: 'newaccount',
            authorization: [
                {
                    actor: permissionLevel.actor,
                    permission: permissionLevel.permission,
                },
            ],
            data: {
                creator: permissionLevel.actor, // account creating the new account
                name: account.name, // new account name
                owner: { // This field represents the owner permission
                    threshold: 1,
                    keys: [
                        {
                            key: controlKey,
                            weight: 1,
                        },
                    ],
                    accounts: [],
                    waits: [],
                },
                active: { // This field represents the active permission
                    threshold: 1,
                    keys: [
                        {
                            key: controlKey,
                            weight: 1,
                        },
                    ],
                    accounts: [],
                    waits: [],
                },
            },
        },
        {
            account: 'eosio',
            name: 'buyrambytes',
            authorization: [
                {
                    actor: permissionLevel.actor,
                    permission: permissionLevel.permission,
                },
            ],
            data: {
                payer: permissionLevel.actor,
                receiver: account.name,
                bytes: requiredRamBytes + (account.ramBytes || 0),
            },
        }];
        if (account.balance) {
            actions.push(
                {
                    account: 'eosio.token',
                    name: 'transfer',
                    authorization: [
                        {
                            actor: permissionLevel.actor,
                            permission: permissionLevel.permission,
                        },
                    ],
                    data: {
                        from: permissionLevel.actor,
                        to: account.name,
                        quantity: account.balance,
                        memo: '',
                    },
                }
            )
        }
        if (account.cpuStake || account.netStake) {
            actions.push(
                {
                    account: 'eosio',
                    name: 'delegatebw',
                    authorization: [
                        {
                            actor: permissionLevel.actor,
                            permission: permissionLevel.permission,
                        },
                    ],
                    data: {
                        from: 'wharfkittest',
                        receiver: account.name,
                        stake_net_quantity: account.netStake || '0.0000 EOS',
                        stake_cpu_quantity: account.cpuStake || '0.0000 EOS',
                        transfer: false,
                    },
                }
            )
        }
    return actions;
}
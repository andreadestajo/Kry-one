export const currencies_list =
[
    {label: 'Pound Sterling'        , key: 'GBP'},
    {label: 'Japanese Yen'          , key: 'JPY'},
    {label: 'Philippine Peso'       , key: 'PHP'},
    {label: 'United States Dollar'  , key: 'USD'}
];

export default
[
    { key: 'uniq', label: 'Uniq Wallet', abb: 'UNIQ', decimals: 9, actions: ['send', 'history'] },
    { key: 'btc', label: 'Bitcoin', abb: 'BTC', decimals: 9, actions: ['send', 'receive', 'buy-uniq', 'convert', 'history'] },
    { key: 'eth', label: 'Ethereum', abb: 'ETH', decimals: 2, actions: ['send', 'receive',  'buy-uniq', 'convert', 'history'] },
]

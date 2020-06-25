export interface PairItem {
    id: number;
    sale_id: number;
    quote_currency_id: string;
    price: string;
    created_at?: string;
    updated_at?: string;
}

export interface SalePair {
    quote_currency_id: string;
    price: string;
}

export interface ItemIEO {
    id: number;
    name: string;
    description?: string;
    owner_uid: string;
    currency_id: string;
    supply: string;
    low_goal: string;
    commission: string | number;
    min_amount: string;
    max_amount: string;
    min_unit: string;
    state?: string;
    collected_amount: string;
    ratio: string;
    result: string;
    lockup_percentage?: string;
    starts_at: string;
    finishes_at: string;
    created_at?: string;
    updated_at?: string;
    pairs: PairItem[];
    type: string;
}

export interface OrderIEOData {
    id: number;
    sale_name: string;
    sale_pair_id: number;
    uid: string;
    contribution: string;
    executed: string;
    refunded: string;
    tokens_received: string;
    commission_rate: string;
    commission_amount: string;
    state: string;
    created_at: string;
    updated_at: string;
    tokens_ordered: string;
    tokens_locked: string;
    ratio: string;
    base_currency: string;
    quote_currency: string;
}

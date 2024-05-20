export interface IDataEntity {
    [date: string]: {
        income: number,
        expenditure: {
            total: number,
            [types: string]: number
        }
    }
}
export const data: IDataEntity = {
    '2024-5': {
        income: 13000,
        expenditure: {
            total: 9000,
            '食物': 0,
            '外卖': 0,
            '日用': 0,
            '旅行': 0,
            '交通': 0,
            '房租': 2000,
            '网购': 550,
        }
    },
    '2024-4': {
        income: 13000,
        expenditure: {
            total: 9000,
            '食物': 0,
            '外卖': 0,
            '日用': 0,
            '旅行': 0,
            '交通': 0,
            '房租': 2000,
            '网购': 40,
        }
    },
    '2024-3': {
        income: 13000,
        expenditure: {
            total: 9000,
            '食物': 0,
            '外卖': 0,
            '日用': 0,
            '旅行': 0,
            '交通': 0,
            '房租': 2000,
            '网购': 30,
        }
    },
    '2024-2': {
        income: 13000,
        expenditure: {
            total: 9000,
            '食物': 0,
            '外卖': 0,
            '日用': 0,
            '旅行': 0,
            '交通': 0,
            '房租': 2000,
            '网购': 20,
        }
    },
    '2024-1': {
        income: 13000,
        expenditure: {
            total: 9000,
            '食物': 0,
            '外卖': 0,
            '日用': 0,
            '旅行': 0,
            '交通': 0,
            '房租': 2000,
            '网购': 0,
        }
    },
}


export interface CategoryType {
    id: number;
    label : string;
    value : string;
}

export default class Category {
    category? : CategoryType;

    constructor(category? : CategoryType) {
        this.category = category;
    }
}
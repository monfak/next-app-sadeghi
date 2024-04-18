export default interface Product {
    id: number;
    title : string,
    category_id? : string,
    description : string,
    price : number,
    status : number,
    user_id : number,
    created_at : string
}
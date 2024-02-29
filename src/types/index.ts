import React, { SetStateAction } from "react";








export type NullLable<T> = T | null;



export type IResData<T> = {
    count: NullLable<number>,
    next: NullLable<string>,
    previous: NullLable<string>,
    results: T
}

export type IInitialState<T> = {
    loading: boolean,
    error: string,
    data: NullLable<T>,
}


export type IUser = {
    "id": number,
    "first_name": string,
    "last_name": string,
    "email": string,
    "phone": string,
    "image": NullLable<string>,
    "gender": NullLable<string>,
    "full_name": NullLable<string>,
    "city": NullLable<string>,
    "rate": number,
    "date_of_birth": NullLable<string>,
    "marital_status": NullLable<string>,
    "role": string,
    [key: string]: any;
}

export type IAuthRes = {
    "detail": string,
    "token": string
}

export type IBonusCard = {
    "id": number,
    "card_number": number,
    "owner": IUser,
    "balance": number,
    "is_active": boolean,
    "pays": IHistoryPay[]
}


export type IHistoryPay = {
    "id": number,
    "method": string,
    "value": number,
    "order": IOrder
}

export type IOrder = {
    "id": number,
    "user": number,
    "ordered_date": string,
    "pharmacy_adress": IPharmacy,
    "salse_person": string,
    "remove_bonus": null | string,
    "order_total": number,
    "total": number,
    "items": IOrderItem[]
}

export type IProduct = {
    "id": number,
    "uid": string,
    "category": number,
    "name": string,
    "descrip": string,
    "use_for": string,
    "сharacteristics": string,
    "price": number,
    "is_active": boolean,
    "photos": any[],
    "pharmacy_count": IPharmacyCount[]
}


export type IPharmacyCount = {
    "id": number,
    "uid": string,
    "pharmacy": IPharmacy,
    "count": number,
    price: number
    drug: string
}

export type IOrderItem = {
    "id": number,
    "product": IProduct,
    "quantity": number,
    "product_price": number,
    "total_items": number
}

export type ICatMedicament = {
    [key: string]: any;
    "id": number,
    "uid": string,
    "title": string,
    "description": string
}


export type IPharmacy = {
    "id": number,
    "uid": string,
    "name": string,
    "adress": string,
    "adrres_url": string,
    "working_hours_from": string,
    "working_hours_to": string,
    "latitude": string,
    "longitude": string,
    drugs_count: IPharmacyCount[]
}


export type IDiscount = {
    "id": number,
    "title": string,
    "description": string,
    "percentage": string,
    "start_date": string,
    "end_date": string,
    "is_active": boolean,
    "img": string,
    "pharmacy": number
}

export type INewsCategory = {
    "id": number,
    "name": string,
    "news": INews[]
}

export type INews = {
    "id": number,
    "category": number,
    "title": string,
    "seo_title": string,
    "description": string,
    photos: IPhoto[]
    "img": string
}

export type IRates = {
    "id": number,
    "uid": string,
    "title": string,
    "percentage": string
}
export type IPhoto = {
    id: string,
    photo: string
}

export type INotification = {
    "id": number,
    "created_at": string,
    "updated_at": string,
    "name": string,
    "image": string,
    "content": string
}

export type SetState<T> = React.Dispatch<SetStateAction<T>>
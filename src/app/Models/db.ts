export class Product {
    id!:number;
    productName!:string;
    idType!:any;
    pdStock?:any;
    productPrice!: number;
    // idStock!: any;
    image!: string;
    productDetail!: string;
    detailSpecifics!: string;
    upfile:any;
}

export interface ProductResponse {
    id:number;
    productName:string;
    idType:number;
    productPrice: number;
    idStock: number;
    image: string;
    productDetail: string;
    detailSpecifics: string;
}
///////////////////////////////////////////////

export interface Products {
    id:                number;
    productName:       string;
    idType:            number;
    productPrice:      number;
    pdStock:           null;
    image:             string;
    productDetail:     string;
    detailSpecifics:   string;
    idStockNavigation: null;
    idTypeNavigation:  IDTypeNavigation;
    orderDetail:       any[];
}

export interface Typeproduct {
    id:       number;
    typeName: string;
    products: any[];
}

export interface IDTypeNavigation {
    id:       number;
    typeName: string;
    products: any[];
}

////////////////////////////////////////////////
// export class Product {
//     Id!:number;
//     ProductName!:string;
//     IdType!:number;
//     ProductPrice!: number;
//     IdStock!: number;
//     image!: string;
//     ProductDetail!: string;
//     DetailSpecifics!: string;
//     upfile:any;
// }



// export interface ProductResponse {
//     Id:number;
//     ProductName:string;
//     IdType:number;
//     ProductPrice: number;
//     IdStock: number;
//     image: string;
//     ProductDetail: string;
//     DetailSpecifics: string;
// }

export class User {
    FirstName!:   string;
    LastName!:    string;
    titleNavigation!:       any;
    UserEmail!:   string;
    UserPassword!:string;
    Tel!:         string;
    UserAddress!: string;

}


export interface Users {
    id:                number;
    userEmail:         string;
    userPassword:      string;
    title:             number;
    firstName:         string;
    lastName:          string;
    tel:               string;
    userAddress:       string;
    titleNavigation:   titleNavigation;
    order:             any[];
}
    export interface titleNavigation {
        id:            number;
        titleName:     string;
        user:          any[];
    }


export interface Stock {
  id?: number;
  idProduct?: number;
  stock1?: number;
  stockDate?: string;
  products?: any[];
}


export interface ImgDetail {
    id?:                          string;
    idProductsDetails?:           number;
    image?:                       string;
    moreDetail?:                  string;
    idProductsDetailsNavigation?: any[];
    upfile:any;
}


export interface CartImg {
    idProducts:        any;
    productName:       string;
    productPrice:      number;
    pdStock:           number;
    userId:            number;
    image:             string;
}
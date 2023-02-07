import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ImgDetail, Product,Products,Stock,titleNavigation,Typeproduct, User, Users } from '../Models/db';

@Injectable({
  providedIn: 'root'
})
export class RestService {
  // ApiStocks
  private hostUrl = environment.backendUrl;
  private authenApiUrl = `${this.hostUrl}ApiUsers`;
  private loginUrl = `${this.authenApiUrl}/login`;
  private registerUrl = `${this.authenApiUrl}/register`;
  private productUrl = `${this.hostUrl}ApiProducts`;
  private adminUrl = `${this.hostUrl}ApiAdmin`;
  private loginadminUrl = `${this.adminUrl}/adminlogin`;
  private authenApiTypeProducts = `${this.hostUrl}ApiTypeProducts`;
  private authenApiTitleUsers = `${this.hostUrl}ApiTitlesUsers`;
  private authenApiStock = `${this.hostUrl}ApiStocks`;
  private ImgDetailApi = `${this.hostUrl}ApiDetailProducts`;
  public OK = 'OK' 
  public OKS = 'OKS'  

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn() {
    let loginResult = localStorage.getItem(environment.loginResult);
    return (loginResult != null && loginResult == this.OK)
    }

    isLoggedInAdmin() {
      let loginResult = localStorage.getItem(environment.loginResult);
      return (loginResult != null && loginResult == this.OKS)
      }
      
    chkLoggedIn() {
    let loginResult = localStorage.getItem(environment.loginResult);
    if (loginResult == null || loginResult !== 'ok') {
    this.router.navigate(['login'])
    }
    }
    
    login(value:any) {
    let formData = new FormData()
    formData.append('UserEmail', value.UserEmail)
    formData.append('UserPassword', value.UserPassword)
    return this.http.post<any>(this.loginUrl, formData)
    }

    adminlogin(value:any) {
      let formData = new FormData()
      formData.append('AdminNme', value.AdminNme)
      formData.append('AdminPassword', value.AdminPassword)
      return this.http.post<any>(this.loginadminUrl, formData)
      }

      getProducts(): Observable<Products[]> {
        return this.http.get<Products[]>(this.productUrl)
      }
      
      getTypeProducts(): Observable<Typeproduct[]> {
        return this.http.get<Typeproduct[]>(this.authenApiTypeProducts)
      }

      getProductImageUrl(image: string): string {
        if (image) return `${environment.backendUrl}${image}`
        return 'assets/noimg.png'
      }
      
      deleteProduct(id: number) {
        const url = `${this.productUrl}/${id}`;
        return this.http.delete<void>(url);
      }

      addProduct(product: Product): Observable<any> {
        return this.http.post<any>(this.productUrl, this.makeFormData(product))
      }

      updateProduct(product: Product): Observable<any> {
        return this.http.put<any>(this.productUrl, this.makeFormData(product))
      }
    
      getProductById(id:any) {
        const url = `${this.productUrl}/${id}`;
        return this.http.get<any>(url);
      }

      makeFormData(product: any): FormData {
        const formData = new FormData()
        formData.append("id", `${product.id}`);
        formData.append("productName", product.productName);
        formData.append('idType', `${product.idType}`)
        formData.append('productPrice', `${product.productPrice}`)
        formData.append('pdStock', `${product.pdStock}`)
        if (product.image == null) product.image = ""
        formData.append('image', product.image)
        formData.append('upfile', product.upfile)
        formData.append('productDetail', product.productDetail)
        formData.append('detailSpecifics', product.detailSpecifics)
        return formData
      }


      register(value:any) {
        let formData = new FormData()
        formData.append('title', value.title)
        formData.append('FirstName', value.FirstName)
        formData.append('LastName', value.LastName)
        formData.append('UserEmail', value.UserEmail)
        formData.append('UserPassword', value.UserPassword)
        formData.append('Tel', value.Tel)
        formData.append('UserAddress', value.UserAddress)
        return this.http.post<any>(this.registerUrl, formData)
      }

      getUser(): Observable<Users[]> {
        return this.http.get<Users[]>(this.authenApiUrl)
      }

      getTitleProducts(): Observable<titleNavigation[]> {
        return this.http.get<titleNavigation[]>(this.authenApiTitleUsers)
      }

      deleteUsers(id: number) {
        const url = `${this.authenApiUrl}/${id}`;
        return this.http.delete<void>(url);
      }

      addprocuts(): Observable<Stock[]> {
        return this.http.get<Stock[]>(this.authenApiStock)
      }
      // `https://localhost:44303/ApiStocks`
      // this.authenApiStock
      addStock(Form:any){
        return this.http.post<any>(this.authenApiStock,this.makeFormStock(Form))
      }
      makeFormStock(Form:any):FormData{
        const formData = new FormData();
        formData.append("idProduct",Form.idProduct)
        formData.append("stock1",Form.stock1)
        formData.append("stockDate",Form.stockDate)
        return formData
      }
      
      putproduct(Form:any){
        return this.http.put<any>(`${this.productUrl}`,this.makeFormData(Form))
      }


      imgdetail(Form:any):FormData{
        const formData = new FormData();
        formData.append("idProductsDetails",Form.idProductsDetails)
        formData.append("image",Form.image)
        formData.append("moreDetail",Form.moreDetail)
        return formData
      }

      makeDetailFurnitureFormData(imgdetail: ImgDetail): FormData {
        const formData = new FormData()
        formData.append("idProductsDetails", `${imgdetail.idProductsDetails}`);
        formData.append('moreDetail', `${imgdetail.moreDetail}`);
        formData.append('image', `${imgdetail.image}`)
        for(var i of imgdetail.upfile){
          formData.append("upfile",i)
        }
        return formData
      }
      getDetailProductById(id:any) {
        const url = `${this.ImgDetailApi}/${id}`;
        return this.http.get<any>(url);
      }

      addDetailProcuts(imgdetail: ImgDetail): Observable<any> {
        return this.http.post<any>(this.ImgDetailApi, this.makeDetailFurnitureFormData(imgdetail))
      }


      DeleteDetailProduct(id: string) {
        const url = `${this.ImgDetailApi}/${id}`;
        return this.http.delete<void>(url);
      }
  }


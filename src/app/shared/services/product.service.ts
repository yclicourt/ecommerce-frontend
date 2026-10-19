import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product } from '../../features/product-feature/interfaces/Product';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  products: Product[];
  // Inject Services
  private http = inject(HttpClient);
  private configService = inject(ConfigService)

  constructor() {
    this.products = [];
  }

  // Method to create a new product
  createProduct(formData: FormData, token: string | null): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.post<Product>(this.configService.apiUrl, formData, { headers });
  }

  // Method to get all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.configService.apiUrl}/products`);
  }

  // Method to get a product by ID
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.configService.apiUrl}/${id}`);
  }

  // Method to update a product
  updateProduct(
    formData: FormData,
    id: number | undefined,
    token: string | null
  ): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.patch<Product>(`${this.configService.apiUrl}/${id}`, formData, {
      headers,
    });
  }

  // Method to delete a product
  deleteProduct(id: number, token: string | null): Observable<Product> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.delete<Product>(`${this.configService.apiUrl}/${id}`, { headers });
  }
}

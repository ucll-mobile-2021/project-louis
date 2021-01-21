import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export abstract class ApiService<T> {
    abstract endpoint: string;

    protected constructor(protected httpClient: HttpClient) {
    }

    public getAll(): Observable<T[]> {
        return this.httpClient.get<T[]>(`${environment.apiUrl}/${this.endpoint}/`);
    }

    public get(id: number): Observable<T> {
        return this.httpClient.get<T>(`${environment.apiUrl}/${this.endpoint}/${id}`);
    }

    public create(model: T): Observable<T> {
        return this.httpClient.post<T>(`${environment.apiUrl}/${this.endpoint}/`, model);
    }

    public delete(id: number): Observable<void> {
        return this.httpClient.delete<void>(`${environment.apiUrl}/${this.endpoint}/${id}`);
    }

    public update(id: number, model: T): Observable<T> {
        return this.httpClient.put<T>(`${environment.apiUrl}/${this.endpoint}/${id}`, model);
    }
}

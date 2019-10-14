import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from './environment';
import {Observable} from "rxjs";
import * as jwt_decode from 'jwt-decode';
import {FileUploader} from 'ng2-file-upload/ng2-file-upload';
const AUTH_HEADER_KEY = 'auth';

@Injectable({
    providedIn: 'root'
})


export class ApiService {

    endpoint = environment.baseUrl;
    private HEADERS: HttpHeaders;

    constructor(private http: HttpClient) {
    }

    public post(endpoint: string, data: any) {
        return this.http.post(this.buildUrl(endpoint), data, this.getOptions());
    }

    public get(endpoint: string) {
        return this.http.get(this.buildUrl(endpoint), this.getOptions());
    }

    public delete(endpoint: string) {
        return this.http.delete(this.buildUrl(endpoint), this.getOptions());
    }

    public put(endpoint: string, data: any) {
        return this.http.put(this.buildUrl(endpoint), data, this.getOptions());
    }


    getToken(): string {
        return localStorage.getItem('token');
    }

    setId(No_: string): void {
        localStorage.setItem('No_', No_);
    }

    getId(): string {
        return localStorage.getItem('No_');
    }

    setUser(user: object): void {
        localStorage.setItem('user', JSON.stringify(user));
    }

    getUser(): object {
        return JSON.parse(localStorage.getItem('user'));
    }

    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    getTokenExpirationDate(token: string): Date {
        const decoded = jwt_decode(token);

        if (decoded.exp === undefined) return null;

        const date = new Date(0);
        date.setUTCSeconds(decoded.exp);
        return date;
    }

    isTokenExpired(token?: string): boolean {
        if (!token) token = this.getToken();
        if (!token) return true;

        const date = this.getTokenExpirationDate(token);
        if (date === undefined) return false;
        return !(date.valueOf() > new Date().valueOf());
    }

    buildUrl(endpoint): string {
        return [this.endpoint, endpoint].join('/');
    }

    private buildHeaders(): void {
        this.HEADERS = new HttpHeaders();
        // Token Allowed access communication between (Client and API)
        const token = (localStorage.getItem('token') || null);
        // Token expire time
        const expire = (localStorage.getItem('expire') || null);
        if (token) {
            this.HEADERS.set(AUTH_HEADER_KEY, `${token}`);
        }

        this.HEADERS.set('expire', expire);
        this.HEADERS.set('Content-Type', 'application/json');
        this.HEADERS.set('Access-Control-Allow-Origin', this.endpoint);
    }

    public getOptions(): object {
        this.buildHeaders();
        return {
            headers: this.HEADERS
        };
    }
}


type call = (endpoint: string) => Observable<any>;
type action = (endpoint: string, data: string) => Observable<any>;


export interface NowboardApiServiceProps {
    endpoint: string;
    Headers: HttpHeaders;
    http: HttpClient;
    post: action;
    get: call;
    put: action;
    delete: call;
    buildUrl: (endpoint) => string;
    getOptions: () => object;
}

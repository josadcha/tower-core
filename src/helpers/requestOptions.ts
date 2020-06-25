import { RequestOptions } from '../api';

export const peatioRequestOptions = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: 'peatio',
        headers: { 'X-CSRF-Token': csrfToken },
    };
};

export const barongRequestOptions = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: 'barong',
        headers: { 'X-CSRF-Token': csrfToken },
    };
};

export const applogicRequestOptions = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: 'applogic',
        headers: { 'X-CSRF-Token': csrfToken },
    };
};

export const finexRequestOptions = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: 'finex',
        headers: { 'X-CSRF-Token': csrfToken },
    };
};

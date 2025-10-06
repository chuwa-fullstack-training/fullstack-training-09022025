export interface Ok<T> { kind: 'ok'; data: T }
export interface NotFound { kind: 'not_found'; message: string }
export interface Failure { kind: 'error'; error: Error; code?: string }

export type ServiceResult<T> = Ok<T> | NotFound | Failure;

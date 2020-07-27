interface IResponse<T> extends IResponseResult {
    data: T
}
interface IResponseResult {
    code: string
    status: boolean,
    message: string
}
export const Api = {
    pathApi: "https://api.stg.thuocsi.vn",

    httpRequest<T>(method: string, url: string, body?: Object): Promise<IResponse<T>> {
        const path = `${this.pathApi}${url}`
        const userStorage = localStorage.getItem('user')
        const user = userStorage ? JSON.parse(userStorage) : null
        return new Promise((resolve) => {
            fetch(path, {
                method,
                body: body ? JSON.stringify(body) : null,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "X-USER-PHONE": user ? user.phone : user,
                    "X-USER-TOKEN": user ? user.token : user
                }
            }).then(rsp => resolve(rsp.json()))
        })
    },
    get<T>(url: string): Promise<IResponse<T>> {
        return this.httpRequest("GET", url)
    },
    post<T>(url: string, body: Object): Promise<IResponse<T>> {
        return this.httpRequest("POST", url, body)
    },
    delete<T>(url: string): Promise<IResponse<T>> {
        return this.httpRequest("DELETE", url)
    }
}
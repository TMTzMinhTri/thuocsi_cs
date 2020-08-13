import { store } from "Store"
import { RootAction } from "Interface/Store/index.types"
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { SIGN_OUT } from "Interface/Store/layout.types";
import { SHOW_ALERT_ERROR, REMOVE_ALERT_ERROR } from "Interface/Store/notification.types"
interface IResponse<T> extends IResponseResult {
    data: T
}
interface IResponseResult {
    code: string
    status: number,
    message: string
}
export const Api = {
    pathApi: process.env.REACT_APP_BASEURL || "https://api.stg.thuocsi.vn",

    httpRequest<T>(method: string, url: string, showWait: boolean, body?: Object): Promise<IResponse<T>> {
        const path = `${this.pathApi}${url}`
        const userStorage = localStorage.getItem('user')
        const user = userStorage ? JSON.parse(userStorage) : null
        return new Promise((resolve) => {
            if (showWait && !NProgress.isStarted()) NProgress.start();
            fetch(path, {
                method,
                body: body ? JSON.stringify(body) : null,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "X-USER-PHONE": user ? user.phone : user,
                    "X-USER-TOKEN": user ? user.token : user
                }
            })
                .then(rsp => rsp.json() as Promise<IResponse<T>>)
                .then(res => {
                    if (res.status === 401) {
                        const errorMessage = { name: res.code, message: res.message }
                        throw errorMessage
                    }
                    resolve(res)
                })
                .catch(e => {
                    const path = `${window.location.origin}${window.location.pathname}#/login `
                    store.dispatch<RootAction>({
                        type: SHOW_ALERT_ERROR,
                        content: {
                            content: e.message,
                            title: e.name,
                            type: "error",
                            onConfirm: () => {
                                store.dispatch<RootAction>({ type: REMOVE_ALERT_ERROR })
                                store.dispatch<RootAction>({ type: SIGN_OUT })
                                window.location.assign(path)
                            }
                        }
                    })
                })
                .finally(() => {
                    NProgress.done()
                })
        })
    },
    get<T>(url: string, showWait: boolean): Promise<IResponse<T>> {
        return this.httpRequest("GET", url, showWait)
    },
    post<T>(url: string, body: Object, showWait: boolean): Promise<IResponse<T>> {
        return this.httpRequest("POST", url, showWait, body)
    },
    delete<T>(url: string, showWait: boolean): Promise<IResponse<T>> {
        return this.httpRequest("DELETE", url, showWait)
    }
}
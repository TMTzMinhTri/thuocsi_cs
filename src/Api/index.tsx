import { from, Subject } from "rxjs";
import { switchMap } from "rxjs/operators";


const _openPopup = new Subject()
export const _httpService = {
    sendRequestTogglePopup: (data: any) => _openPopup.next(data),
    getValue: () => _openPopup.asObservable()
}

export const Api = {
    pathApi: "https://api.stg.thuocsi.vn",
    httpRequest(method: string, url: string, body?: Object) {
        const path = `${this.pathApi}${url}`
        return from(fetch(path, {
            method,
            body: body ? JSON.stringify(body) : null
        })).pipe(
            switchMap(rsp => rsp.json())
            // map(data => {
            //     if (data.status === 401) {
            //         _openPopup.next(data)
            //         return
            //     }
            //     else if (data.status === 200) {
            //         return of(data)
            //     }
            // })
            // switchMap(rsp => {
            //     if (rsp.status === 200) return rsp.json()
            //     else if (rsp.status === 401) {
            //         this.appservice.sendControlTogglePopup(from(rsp.json))
            //     }
            //     else {
            //         console.log(rsp)
            //         throwError(rsp)
            //         return rsp.json()
            //     }
            // }),
        )
    },
    get(url: string) {
        return this.httpRequest("GET", url)
    }
}
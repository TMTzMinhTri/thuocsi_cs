
export const Api = {
    pathApi: "https://api.stg.thuocsi.vn",

    httpRequest(method: string, url: string, body?: Object) {
        const path = `${this.pathApi}${url}`

        return new Promise((resolve) => {
            fetch(path, {
                method,
                body: body ? JSON.stringify(body) : null,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    "X-USER-PHONE": "0111222333",
                    "X-USER-TOKEN": "1b11ed31ad1a9a37ef59f2d785eedfc53a8d57304a5d757a6971f29b72badf65"
                }
            }).then(rsp => resolve(rsp.json()))
        })
    },
    get(url: string) {
        return this.httpRequest("GET", url)
    },
    post(url: string, body: Object) {
        return this.httpRequest("POST", url, body)
    }
}
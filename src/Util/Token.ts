import { getCookie, setCookie } from "./Cookie";

export const baseUrl = process.env.REACT_APP_CMHG_BASE_URL

export async function refreshTokens() {
    if (baseUrl !== undefined) {
        const response = await fetch(baseUrl + "/token/refresh", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getCookie("refresh-token")
            },
        });
        if (response.status === 200) {
            //access expired
            const data = await response.json()
            setCookie("access-token", data["access_token"])
            return true
        } else {
            //refresh expired
            return false
        }
    }
}
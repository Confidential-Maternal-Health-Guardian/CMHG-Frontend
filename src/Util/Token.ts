import { getCookie, setCookie } from "./Cookie";

export const baseUrl = process.env.REACT_APP_CMHG_BASE_URL

export async function refreshTokens() {
    if (baseUrl !== undefined) {
        const response = await fetch(baseUrl + "/query", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getCookie("access-token")
            },
        });
        if (response.status === 200) {
            const data = await response.json()
            console.log("Tokens refreshed")
            setCookie("access-token", data["access_token"])
            setCookie("refresh-token", data["refresh_token"])
        } else {

        }
    }
}
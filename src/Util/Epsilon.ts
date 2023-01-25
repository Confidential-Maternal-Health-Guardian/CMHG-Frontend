import { getCookie } from "./Cookie";
import { baseUrl, refreshTokens } from "./Token";

export async function updateEpsilon() {
    if (baseUrl !== undefined) {
        const response = await fetch(baseUrl + "/user/current-epsilon", {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + getCookie("refresh-token")
            },
        });
        const data = await response.json()

        if (response.status === 200) {
            if (data["currentEpsilon"] !== null) {
                return data["currentEpsilon"]
            } else {
                return 0
            }
        } else if (response.status === 403) {
            refreshTokens().then((res) => {
                if (res) {
                    updateEpsilon()
                }
            })
        }
    }
}
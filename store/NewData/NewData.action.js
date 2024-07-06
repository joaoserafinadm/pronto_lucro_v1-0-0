export function newData(data) {

    console.log("newData", data)
    return {
        type: "NEW_DATA",
        payload: data
    }
}


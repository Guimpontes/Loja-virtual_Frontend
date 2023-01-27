export const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getItem = (key) => {

    try {
        return JSON.parse(localStorage.getItem(key))
    } catch (error) {
        return localStorage.removeItem(key)
    }
}
export const fetchApi = async (url, method, payload) => {
    const response = await fetch(url, {
        method: method,
        headers: { "Content-type": "application/json" },
        body: payload,
    });
    const data = await response.json();
    return data;
}
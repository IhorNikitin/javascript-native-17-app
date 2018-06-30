export function fetchData(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url, true);
        xhr.send();

        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                const error = new Error(xhr.statusText);
                reject(error);
            }
        };

        xhr.onerror = () => reject(new Error('Network Error'));
    });
}

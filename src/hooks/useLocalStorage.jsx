import React from 'react'

function useLocalStorage(key) {
    function setItem(value){
        window.localStorage.setItem(key, JSON.stringify(value));
    };

    function getItem(){
        const item = window.localStorage.getItem(key);
        console.log("I haev it", item);
        return item ? JSON.parse(item) : undefined;
    }

    function deleteItem(){
        window.localStorage.removeItem(key);
    }

    return { setItem, getItem, deleteItem };
}

export default useLocalStorage

// export const useLocalStorage = (key: String) => {
//     const setItem = (value: unknown) => {
//         window.localStorage.setItem(key, JSON.stringify(value));
//     };
//     return { setItem }
// }
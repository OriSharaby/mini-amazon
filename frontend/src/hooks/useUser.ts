import { useState, useEffect } from "react";

export interface UserInfo {
    _id: string
    name: string,
    email: string,
    isAdmin: boolean,
    token: string,
}

export function useUser(): [UserInfo | null, (user: UserInfo | null) => void] {
    const [user, setUser] = useState<UserInfo | null>(null);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if(userInfo){
            setUser(JSON.parse(userInfo));
        }
    }, []);

    const updateUser = (userData: UserInfo | null) => {
        setUser(userData);
        if(userData){
            localStorage.setItem("userInfo", JSON.stringify(userData))
        } else {
            localStorage.removeItem("userInfo");
        }
    };
    return [user, updateUser];
}
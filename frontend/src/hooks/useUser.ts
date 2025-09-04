import { useState, useEffect } from "react";

export interface UserInfo {
    _id: string
    name: string,
    email: string,
    isAdmin: boolean,
    token: string,
}
type UseUserHook = [UserInfo | null, (user: UserInfo | null) => void];

export function useUser(): UseUserHook {
    const [user, setUser] = useState<UserInfo | null>(null);

    useEffect(() => {
        try{
            const userInfo = localStorage.getItem("userInfo");
            if(userInfo){
                const parsedUser : UserInfo = JSON.parse(userInfo);
                setUser(parsedUser);
            }
        }catch(error){
            console.error("Failed to parse userInfo from localStorage", error);
            localStorage.removeItem("userInfo");
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
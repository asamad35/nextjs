"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ForgotPassword = () => {
    type PasswordType = {
        password: string;
        confirmPassword: string;
    };
    const router = useRouter()
    const [token, setToken] = useState("");

    const [password, setPassword] = useState<PasswordType>({
        password: "",
        confirmPassword: "",
    });

    const changePassword = async () => {
        try {
            if (password.confirmPassword !== password.password) {
                toast.error("Password does not match")
                return
            }
            if (!token) {
                toast.error("Invalid Token")
            }
            const response = await axios.post('/api/users/changepassword', { token, password: password.password })
            toast.success(response.data.message)
            router.push('/login');

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <label htmlFor="password">Password</label>
            <input className="rounded-lg m-2 p-1 text-black"
                onChange={(e) => { setPassword({ ...password, password: e.target.value }) }}
                value={password.password} type="password" name="password" id="password" />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input className="rounded-lg m-2 p-1 text-black"
                onChange={(e) => { setPassword({ ...password, confirmPassword: e.target.value }) }}
                value={password.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" />

            <button onClick={changePassword} className=" bg-orange-500 p-2 rounded-xl m-2 ">Change Password</button>
        </div>
    );
};

export default ForgotPassword;

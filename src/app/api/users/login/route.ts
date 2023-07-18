import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs'; 
import jwt from "jsonwebtoken";

connect()
export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        const user = await User.findOne({email});

        // user deos not exists
        if(!user){
            return NextResponse.json({message: 'User does not exists'},{status:500});
        }

        // check password
        const validPassword = await bcryptjs.compare(password, user.password);

        if(!validPassword){
            return NextResponse.json({message: 'Invalid password'},{status:500});
        }

        console.log(user)

        const tokenData = {id: user._id, email: user.email, username: user.username}
        const token =  jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: '1d'})


        const response = NextResponse.json({
            message: "Login successful", 
            success: true,
        })
        
        response.cookies.set('token', token, {httpOnly: true})
        return response

    } catch (error: any) {
        return NextResponse.json({message: error.message},{status:500});
    }
}
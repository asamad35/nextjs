import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest){

    try{
        const reqBody = await request.json();
        const {token,password}= reqBody;

        const user = await User.findOne({forgetPasswordToken :token, forgetPasswordExpiry: {$gt: Date.now()}});
        console.log('====================================', {user,token,password} ,'=====================================');

        if(!user){
            return NextResponse.json({message: "Invalid token"},{status:400})
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt)

        user.password = hashPassword
        user.forgetPasswordToken = null
        user.forgetPasswordExpiry = undefined

        await user.save()

        return  NextResponse.json({message: "Password changed successfully",status:200});
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }







}
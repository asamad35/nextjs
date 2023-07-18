import {connect} from '@/dbConfig/dbConfig'
import getTokenData from '@/helpers/getTokenData';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect()

export async function GET(request: NextRequest){
    try {
        const userId = getTokenData(request).id
        const user = await User.findById(userId).select('-password');
        console.log('====================================', {user} ,'=====================================');
        if(!user){
            return NextResponse.json({message: 'user not found'}, {status:200})
        }
        
        return NextResponse.json({data:user}, {status:200})
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status: 400})
    }
}
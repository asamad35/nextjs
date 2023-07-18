import { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'
import { Types } from 'mongoose';

export default function getTokenData(request: NextRequest){

    type TokenType = {
        id: Types.ObjectId,
        email: 'string',
        username: 'string',

    }
    try {
        const encodedToken = request.cookies.get('token')?.value || '';
        const decodedToken = jwt.verify(encodedToken, process.env.TOKEN_SECRET!) as TokenType
        return decodedToken;
    } catch (error:any) {
        throw new Error(error.message)
    }
}
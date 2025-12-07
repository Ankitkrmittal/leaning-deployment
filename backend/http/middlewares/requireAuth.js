import  jwt  from "jsonwebtoken";
import env from "../../env.js";
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();
export default async function requireAuth(req,res,next){
    
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("token ",token)
        if(!token) return res.status(401).json({error: "Token Required"})
        const decoded = jwt.verify(token,env.JWT_SECRET)
        const user = await prisma.user.findUnique({
            where : {id:decoded.id},
            select:{name:true,email:true,id:true}
        })
        if(!user) return res.status(401).json({error:"invalid token" })
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({error:"unauthorized"})
    }
}
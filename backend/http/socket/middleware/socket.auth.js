import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";
let prisma = new PrismaClient();
import env from "../../../env.js"


const {JWT_SECRET} = env;

export async function socketAuth(socket,next){
    try {
        const token = socket.handshake.auth?.token || socket.handshake.headers?.authorization?.split(" ")[1];
        if(!token) throw new Error("token required");
        const decoded = jwt.verify(token,JWT_SECRET);
        const userId = decoded.id;

        const user = await prisma.user.findUnique({
            where:{id:userId || ""},
            select:{id:true,email:true,name:true},
        });
        if(!user) throw new Error("user not found");
        socket.user = user;
        next();

    } catch (err) {
        console.log("socket aut failed",err.message);
        next(new Error("autenticate failed"))
    }
}
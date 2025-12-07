import {signup,signin} from '../services/auth.service.js';

import { signupSchema,signinSchema } from '../schemas/auth.schema.js';
export async function postSignup(req,res,next){
     try {
        const result = signupSchema.safeParse(req.body)
        if(!result.success){
           
            return res.status(401).json({
                error :JSON.parse(result.error)
            })
        }
        console.log(req.body);
        const {name,email,password} = req.body;
        
        let data = await signup({email,name,password});
        console.log(data);
        res.status(200).json({
            data
        })


     } catch (error) {
        res.status(500).json({
            message:'error while signup',
            error
        })
     }
}
export async function postSignin(req,res,next){
    const result = signinSchema.safeParse(req.body);
    if(!result.success){
        return res.status(401).json({
            error :JSON.parse(result.error)
        })
    }
     
    try {
        const {email,password} = req.body;
        let data = await signin({email,password});
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(500).json({
            message:"error while signin",
            error
        })
    }
}

export async function getMe(req,res,next){
    return res.status(200).json({
        user :req.user
    })
}
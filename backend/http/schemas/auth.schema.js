// import * as z from "zod";
import {z} from "zod";

export const signupSchema = z.object({
    name:z
        .string()
        .trim()
        .min(4,"name should have minimum of 4 characters")
        .max(24,"name should have maximum of 24 characters")
        .optional(),
    email :z.string().trim().lowercase().email("invalid email format"),
    password:z
        .string()
        .min(4,"password should be minimum of 4 character long")
        .max(64,"password should be of maximum 64 characters"),
    
});
export const signinSchema = z.object({
    name:z
        .string()
        .trim()
        .min(4,"name should have minimum of 4 characters")
        .max(24,"name should have maximum of 24 characters")
        .optional(),
    email :z.string().trim().lowercase().email("invalid email format"),
    password:z
        .string()
        .min(4,"password should be minimum of 4 character long")
        .max(64,"password should be of maximum 64 characters"),
    
})
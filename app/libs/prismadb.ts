import { PrismaClient } from "@prisma/client";
//using prisma with next13

//solution to not import prisma client in every file

//global definition of prisma to be able to work through code 
declare global {
  var prisma: PrismaClient | undefined
}

//consst client searches for global prisma or create a new one 
const client = globalThis.prisma || new PrismaClient()
//avoiding warnings during hot reload 
if (process.env.NODE_ENV !== "production") globalThis.prisma = client

export default client;
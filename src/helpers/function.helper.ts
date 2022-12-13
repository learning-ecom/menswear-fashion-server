import {nanoid} from "nanoid"



export const generateSessionToken=()=>{

    const session_token=nanoid(10);
    
    return session_token;
}


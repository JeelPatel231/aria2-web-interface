export interface Toast{
    head:string,
    desc:{
        gid:string,
    }[],
    error?:boolean,
}
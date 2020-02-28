export const config = 
{
    headers : [
        { h : "Content-Type", d : "application/json" },
        { h : "Access-Control-Allow-Origin", d : "*" },
        { h : "Access-Control-Allow-Methods", d : "GET,POST,OPTIONS,DELETE,PUT" }
    ],

    API : {
        login :             "http://26.178.226.82:8080/api/login",
        register :          "http://26.178.226.82:8080/api/register",
        getAll :            "http://26.178.226.82:8080/api/getusers",
        getByID :           "http://26.178.226.82:8080/api/getusers/",
        getByEmail :        "http://26.178.226.82:8080/api/getusers/"
    }
}

export enum Role
{
    User = "User",
    Admin = "Admin"
}

export class User
{
    email : string;
    role : Role;
}
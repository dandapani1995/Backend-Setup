const roleData = [{
    role:1,
    name:"Super Admin",
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    role:2,
    name:"Admin",
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    role:3,
    name:"Service User",
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    role:4,
    name:"Staff User",
    createdAt: new Date(),
    updatedAt: new Date()
},
{
    role:5,
    name:"User",
    createdAt: new Date(),
    updatedAt: new Date()
}];

const Message = {
    
    100: "User Already register with this email",
    101: "Some thing went wrong",
    102: "User not Found",
    103: "Invalid username or password",
    104: "User created successfully.",
    105: "User account verified successfully",
    106: "User account already verified"

}
module.exports = {
    roleData,
    Message
}
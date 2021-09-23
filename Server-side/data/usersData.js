//IMPORTANT: The password is not encrypted with bcrypt so many not work when login
const usersData = [{
        name: "john.dao",
        password: "Dao",
        phoneNumber: 315464,
        email: "joo1@gmail.com",
        DOB: "13/13/13",
        isAdmin:true,
        pic:"hhaa"
    },
    {
        name: "Kelvin",
        password: "Dao",
        phoneNumber: 12312312,
        email: "joo31@gmail.com",
        DOB: "13/13/13",
        isAdmin:false,
        pic:"hha"
    },
    {
        name: "Test",
        password: "test",
        phoneNumber: 12312312,
        email: "hahaaaha@gmail.com",
        DOB: "13/13/13",
        isAdmin:false,
        pic:"hha"
    }
]

module.exports = usersData;
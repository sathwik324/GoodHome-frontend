const axios = require('axios');

async function test() {
    try {
        const res = await axios.post("https://goodhome-backend.onrender.com/api/auth/login", {
            email: "test@example.com",
            password: "password123"
        });
        console.log("LOGIN RESPONSE:");
        console.log(res.data);
    } catch (err) {
        console.error("LOGIN ERROR:", err.response ? err.response.data : err.message);
    }
}

test();

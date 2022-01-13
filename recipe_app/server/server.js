require("dotenv").config();
const express = require('express');
const cors = require('cors')
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
})
);

app.use(cookieParser());

require("./config/mongoose.config");
require("./routes/user.routes")(app);
require("./routes/recipe.routes")(app);

app.listen(8000, () => {
    console.log('You have successfully connected to your port 8000')
});
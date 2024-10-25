const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static('public'));
//app.use(express.urlencoded({ extended: true }));

//route codepromo
app.use('/api/promocodes', codeRoutes);
const codeRoutes = require('./routes/codeRoutes'); 

//route propfirm
const propfirmRoutes = require('./routes/propfirmRoutes'); 
app.use('/api/propfirm', propfirmRoutes); 

//route newsletter
const newsletterRoutes = require('./routes/newsletterRoutes'); 
app.use('/api/newsletter', newsletterRoutes);

const PORT = process.env.PORT || 3001;
const HOST = "0.0.0.0"
app.listen(PORT, HOST , () => {
    console.log(`Server running on port ${PORT}`);
});

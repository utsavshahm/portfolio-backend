import axios from 'axios';

import validator from 'validator';

const validateEmail = (email) => {
    return validator.isEmail(email);
}

const submitForm = async (req, res) => {

    const SITE_SECRET_KEY = process.env.REACT_APP_SITE_SECRET;

    // console.log("hello there boy")
    const { name, email, msg, recaptcha } = req.body;
    
    // console.log(recaptcha)

    if (!name || !email || !msg) res.status(400).json("Please enter all details!");

    if (!validateEmail(email)) res.status(400).json("Please enter valid email address!");

    // console.log("secret ", SITE_SECRET_KEY)

    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET_KEY}&response=${recaptcha}`
    const { data } = await axios.post(url);

    // console.log(data);

    if (!data.success) res.status(400).json("reCAPTCHA verification failed! Please try again!");

    // now just make a db entry

    const contactCollection = req.app.locals.contactCollection;

    const entry = await contactCollection.insertOne({ name, email, msg })
    
    if (entry.acknowledged) res.status(200).json({ success: 'ok', msg: "Message sent successfully!" });
    else res.status(400).json("Error occured while sending the message!");




}

export default submitForm;
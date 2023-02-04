/* eslint-disable no-undef */
const userModel = require('../models/user')
const {v4: uuidv4} = require('uuid')
const commonHelper = require('../helpers/common')
const bcrypt = require('bcryptjs')
const { generateToken, generateRefreshToken } = require('../helpers/auth')
const cloudinary = require('cloudinary').v2
require("dotenv").config();
const email = require('../middlewares/mailer')
// const client = require('../configs/redis')

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
});


exports.getData = async(req,res) =>{
    try {
        const {rows} = await userModel.getData()
        commonHelper.response(res, rows, 'sucess', 200, 'get data user sucess')
    } catch (error) {
        res.send({message: 'error', error})
    }
}

exports.insertUsers = async (req, res) => {
    const {rows: [users]} = await userModel.findByEmail(req.body.email);
    if (users) {
        return res.send({message: 'email is already use'})
    }

    const digits = "0123456789";
    let otp = "";
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);
    const data = {
      id: uuidv4(),
      email: req.body.email,
      password: passwordHash,
      name: req.body.name,
      phone_number: req.body.phone_number,
      otp
    };
    try {
      const result = await userModel.insertData(data);
      if (result) {
        email(data.email, otp, data.name);
        console.log(sendEmail);
        commonHelper.response(res, 'success to send', 'sucess', 200, 'send OTP success please check your email to verify')
      }
    } catch (err) {
        return res.send({message: 'register failed', err})
    }
  },

exports.login = async (req,res) => {
    const {email, password} = req.body
    const {rows: [dataUser]} = await userModel.findByEmail(email)
    if(!dataUser){
        return commonHelper.response(res, null, 'failed', 403, 'login failed! wrong email or password')
    }
    if (dataUser.status_activation != 'actived') {
        return res.send({message: 'email is not verified'})
    }
    // console.log(dataUser);
    const validationPassword = bcrypt.compareSync(password, dataUser.password)
    // console.log(validationPassword);
    if(!validationPassword){
        return commonHelper.response(res, null, 'failed', 403, 'login failed! wrong email or password')
    }
    let payload = {
        email: dataUser.email,
        password: dataUser.password,
        role: dataUser.role
    }
        dataUser.token = generateToken(payload)
        dataUser.refreshToken= generateRefreshToken(payload)
        commonHelper.response(res, dataUser, 'success', 200, 'login success')
}

exports.verify = async(req,res) => {
        // const email = req.params.email
        // const otp = req.body.otp
            const {rows: [dataUser]} = await userModel.findByEmail(req.params.email)
            if(dataUser.otp == req.body.otp){
                await userModel.verify(req.params.email)
                commonHelper.response(res, null, 'success', 200, 'verify success')
            }else{
                commonHelper.response(res, null, 'failed', 400, 'verify Failed')
            }
}

exports.getProfile = async(req, res)=>{
    try {
        const id = req.params.id
        const {rows} = await userModel.getDataById(id)
        commonHelper.response(res, rows, 'suuccess', 200, 'get profile success')
    } catch (error) {
        console.log(error);
        res.json({message: 'error', error})
    }
}


exports.updateData = async(req, res) => {
    try {
        const id = req.params.id
        const {name, email, phone_number, birth, store_description} = req.body
        let photo = req.file
        const image = await cloudinary.uploader.upload(photo.path, { folder: 'Backend Blanja/products' })    
        const data = {name, email, birth, phone_number, photo: image.secure_url, store_description} 
        userModel.updateData(id, data)
          return commonHelper.response(res, data, 'success', 200, 'data updated')
      } catch (error) {
        console.log(error);
          // res.send({message: 'error', error})
      }
    },

exports.updateContact = (req,res) => {
    const id = req.params.id
    const { address, zip, city, recipient_name, recipient_phone } = req.body
    const data = { address, zip, city, recipient_name, recipient_phone }
    try {
        userModel.updateContact(id, data)
        return commonHelper.response(res, data, 'success', 200, 'data contact updated')
    } catch (error) {
        commonHelper.response(res, error, 'failed', 403)
    }
}

exports.deleteData = (req,res) =>{
    userModel.deleteData(req.params.id)
    .then(()=>{
        res.send({status: 200, message: 'delete data success'})
    })
    .catch((error)=>{
        res.send({message: 'error', error})
    })
}
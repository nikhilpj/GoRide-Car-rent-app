const carCollection = require("../models/carModel");
const cloudinaryModule = require("cloudinary");
require("dotenv").config();

const cloudinary = cloudinaryModule.v2

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = {
  createCar: (carData) => {
    const { model, brand, fueltype, seatCapacity, transmission, rate, image } =
      carData;

    return new Promise(async (resolve, reject) => {
        try {
            if (image) {
                const uploadResponse = await cloudinary.uploader.upload(image, {
                  upload_preset: "Goride",
                }); 

                if(uploadResponse)
                {
                    await carCollection.create({
                        model:model,
                        brand:brand,
                        fuelType:fueltype,
                        SeatingCapacity:seatCapacity,
                        transmissionType:transmission,
                        Rate:rate,
                        image:uploadResponse
                    })
                }
            }
            resolve()

            
        } catch (error) {
            console.log("error in creating car",error)
            reject(error)
        }
     

       
  })
},

getAllDetails:()=>{
  return new Promise(async(resolve,reject)=>{
    let products = await carCollection.find({})
    resolve(products)
  })
}
};

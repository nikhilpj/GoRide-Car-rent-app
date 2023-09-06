const carCollection = require("../models/carModel");
const locationCollection = require("../models/locationModel");
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
    const { model, brand, fueltype, seatCapacity, transmission, rate,location, image } =
      carData;

    return new Promise(async (resolve, reject) => {
        try {
            if (image) {
                const uploadResponse = await cloudinary.uploader.upload(image, {
                  upload_preset: "Goride",
                  crop:"fill",
                  gravity:"auto"
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
                        Location:location,
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
},

getAllCars:()=>{
  return new Promise(async(resolve,reject)=>{
      let cars =await carCollection.find({})
      console.log(cars)
      resolve(cars)
    
  })
},

getCarsDetails:async(id)=>{

  try {
    const details = await locationCollection.findOne({_id:id})
    console.log("detail of location",details)
    const locationName = details.locationName
    console.log("location name is",locationName)
    const data = await carCollection.find({Location:locationName})
    console.log("data of cars in location",data)
    return data
  } catch (error) {
    console.log("eror is ",error)
    throw error
  }
 
 
},

Booking:async(id)=>{

  try
  {
    const detail = await carCollection.findOne({_id:id})
  console.log("details of car is",detail)
  return detail
  }catch(e){
    console.log("error is ",e)
    throw e
  }
  

}
};

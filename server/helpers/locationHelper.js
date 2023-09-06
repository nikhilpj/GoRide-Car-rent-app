const carCollection = require("../models/carModel");
const locationCollection = require("../models/locationModel");
const cloudinaryModule = require("cloudinary");
require("dotenv").config();

const cloudinary = cloudinaryModule.v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

module.exports = {
  createLocation: (data) => {
    const { locationName, image } = data;
   

    return new Promise(async (resolve, reject) => {
      try {
        if (image) {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            upload_preset: "Locations",
            crop: "fill",
            gravity: "auto",
          });

          if (uploadResponse) {
            await locationCollection.create({
              locationName: locationName,
              image: uploadResponse,
            });
          }
        }
        resolve({message:'success'});
      } catch (error) {
        console.log("error in creating location", error);
        reject(error);
      }
    });
  },

  getAllLocations:async()=>{
    try
    {
         const data = await locationCollection.find({})
           return data
        }

    catch(e){
        console.log("error while fetching location data",e)      
        throw e 
    }
   
  }
};

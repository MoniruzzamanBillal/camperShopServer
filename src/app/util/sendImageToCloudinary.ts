import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

export const sendImageToCloudinary = async (imgName: string, path: string) => {
  // config file
  cloudinary.config({
    cloud_name: "drmkqpdex",
    api_key: "726171939548924",
    api_secret: "TebSc6_9qDZQcwWK9eu5jEhAlRE",
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: imgName,
    })
    .catch((error) => {
      console.log(error);
    });

  // console.log(uploadResult);

  return uploadResult;

  //
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

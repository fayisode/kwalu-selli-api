import {cloudinaryConfig} from "../../../config/config"
import {ICloudinary} from "./i_cloudinary";

const cloudinary = require('cloudinary').v2


export class Cloudinary implements ICloudinary {
    private cloudLib: any
    constructor() {
        this.cloudLib = cloudinary
        this.config()
    }
    config(){
        this.cloudLib.config({
            cloud_name: cloudinaryConfig.cloud_name,
            api_key: cloudinaryConfig.api_key,
            api_secret: cloudinaryConfig.api_secret
        })
    }

    async uploadImage(image: any): Promise<any> {
        return await this.cloudLib.uploader.upload(image);
    }
}




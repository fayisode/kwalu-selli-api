export interface ICloudinary {
    uploadImage(image: any): Promise<any>
    config: any
}

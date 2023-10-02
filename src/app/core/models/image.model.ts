export interface UploadImagesResponse {
  success: boolean;
  message: string;
  images: {
    full_url_image: string;
    partial_url_image: string;
    image_name: string;
  }[]
}

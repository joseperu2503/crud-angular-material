import { Injectable } from '@angular/core';
import { UploadImagesResponse } from '../../models/image.model';
import { environment } from 'src/environments/environment';
import { map, catchError, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../notification/notification.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) { }

  folderName = environment.IMAGES_FOLDER_NAME
  apiUrl = environment.IMAGES_API_URL

  uploadImages(images: FileList) {

    let formData = new FormData();
    for (let i = 0; i < images.length; i++) {
      formData.append("images[]", images[i]);
    }
    formData.append("folder_name", this.folderName);

    return this.http.post<UploadImagesResponse>(`${this.apiUrl}/upload_images`, formData)
      .pipe(
        map(response => {
          let imagesUrl: string[] = []
          response.images.map(image => {
            imagesUrl.push(image.full_url_image)
          })
          return imagesUrl;
        }),
        catchError(error => {
          console.log(error)
          this.notificationService.error('An error occurred while uploading the images.')
          throw error
        })
      )
  }

}

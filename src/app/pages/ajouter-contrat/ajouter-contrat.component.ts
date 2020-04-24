import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpEventType } from "@angular/common/http";
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";
import { MatStepper } from "@angular/material/stepper";

@Component({
  selector: "app-ajouter-contrat",
  templateUrl: "./ajouter-contrat.component.html",
  styleUrls: ["./ajouter-contrat.component.css"],
})
export class AjouterContratComponent implements OnInit {
  constructor(private http: HttpClient) {}
  selectedFile: File = null;
  ngOnInit(): void {}
  progress = 0;
  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(event.target);
    const fd = new FormData();
    fd.append("file", this.selectedFile);
    this.http
      .post("http://127.0.0.1:8000/apiPlatform/contracts", fd, {
        reportProgress: true,
        observe: "events",
      })
      .subscribe((event) => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round((event.loaded / event.total) * 100);
      });
  }

  public files: NgxFileDropEntry[] = [];
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can access the real file
          console.log(droppedFile.relativePath, file);

          // You could upload it like this:
          const formData = new FormData();
          formData.append("file", file);
          this.http
            .post("http://127.0.0.1:8000/apiPlatform/contracts", formData, {
              reportProgress: true,
              observe: "events",
            })
            .subscribe((event) => {
              if (event.type === HttpEventType.UploadProgress)
                this.progress = Math.round((event.loaded / event.total) * 100);
            });
          /**
          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }
}

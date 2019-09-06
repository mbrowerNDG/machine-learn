import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import * as mobilenet from "@tensorflow-models/mobilenet";
import { Prediction } from "../predictions";

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"]
})
export class ImageUploadComponent implements OnInit {
  imageSrc: string;
  @ViewChild('img', {static: false}) private imageEl: ElementRef;

  predictions: Prediction[];
  model: any;
  loading: boolean;
  constructor() {}

  async ngOnInit() {
    console.log('loading mobilenet model...');
    this.model = await mobilenet.load();
    console.log('Sucessfully loaded model');
    this.loading = false;
  }

  async fileChangeEvent(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (res: any) => {
        this.imageSrc = res.target.result;
        setTimeout(async () => {
          const imgEl = this.imageEl.nativeElement;
          this.predictions = await this.model.classify(imgEl);
        }, 0);

      };
    }

  }

}

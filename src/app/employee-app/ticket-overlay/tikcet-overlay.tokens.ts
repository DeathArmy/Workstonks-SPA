import { InjectionToken } from "@angular/core";
import { formFieldsModel } from "src/app/Models/formFields";

export const FILE_PREVIEW_DIALOG_DATA = new InjectionToken<formFieldsModel>('FILE_PREVIEW_DIALOG_DATA');

import { Injectable } from '@angular/core';

@Injectable()
export class Comment {
    id?: number;
    userId?: number;
    kanbanTaskId?: number;
    content?: string;
    userName?: string;
    dateOfCreation?: Date;
    isInnerComment: boolean = true;
}

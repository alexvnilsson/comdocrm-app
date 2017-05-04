import { Injectable } from '@angular/core';

@Injectable()
export class SlugifyService {
    slugify(text: string): string {
        return text
            .replace(' ', '-')
            .replace(/[^\x00-\x7F]/g, '')
            .toLowerCase();
    }
}
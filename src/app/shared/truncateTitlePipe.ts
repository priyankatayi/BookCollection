import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'truncateTitleDesc'
})

export class TruncateTitlePipe implements PipeTransform {
transform(value: string): string {
    const limit = 30;
    return value.length > limit ? value.substring(0, limit) + '...' : (value);
   }
}

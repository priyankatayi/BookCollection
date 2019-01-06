import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'truncateDesc'
})

export class TruncatePipe implements PipeTransform {
transform(value: string): string {
    const limit = 150;
    return value.length > limit ? value.substring(0, limit) + '...' : (value);
   }
}

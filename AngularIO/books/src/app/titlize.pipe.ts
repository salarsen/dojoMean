import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
    name : 'titlize'
})

@Injectable()

export class TitlizePipe implements PipeTransform {

    public static skipWords: Array<string> = ['the', 'in', 'on', 'a', 'of'];

    transform(value : string, args? : boolean | string[]) : string {

        if (typeof value !== 'string'){
            return value;
        }
        
        const skipWords : Array<string> = Array.isArray(args) ? args : TitlizePipe.skipWords;
        const processSkipWords : boolean = args !== false;

        return value.replace(/\w[^-\s]*/g,(word, index) => {

            if (processSkipWords && index && skipWords.includes(word)) {
                // console.log(index);
                return word.toLowerCase();
            }
            // console.log(word);
            return word[0].toUpperCase() + word.substr(1).toLowerCase();
        });
    }
}
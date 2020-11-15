import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'groupBy'

})
export class GroupByPipe implements PipeTransform {
    transform(collection: Array<any>, property: string): Array<any> {
        if (!collection) {
            return null;
        }
        console.log("dfds");

        const groupedCollection = collection.reduce((previous, current) => {
            if (!previous[current[property]]) {
                previous[current[property]] = [current];
            } else {
                previous[current[property]].push(current);
            }

            return previous;
        }, {});
        console.log("pipe");
        console.log(Object.keys(groupedCollection).map(name => ({ name, data: groupedCollection[name] })));
        return Object.keys(groupedCollection).map(name => ({ name, data: groupedCollection[name] }));
    }
}

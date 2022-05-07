import {DataAdapter} from '@themost/data';
import {QueryExpression} from '@themost/query';
import {instanceOf} from './instance-of';
import {ArrayFormatter} from './ArrayFormatter';

class ArrayAdapter extends DataAdapter {
    constructor(options: any) {
        super(options);
    }

    execute(query: any, values: any [], callback:(err?: Error, result?: any) => void) {
        if (instanceOf(query, QueryExpression) === false) {
            return callback(new Error('Invalid query. Expecter an instance of QueryExpression.'));
        }
        const formatter = new ArrayFormatter();
        const expr = formatter.format(query);
        return callback(null, []);
    }

    async executeAsyc(query: any, values: any []): Promise<void> {
        return new Promise((resolve, reject) => {
            return this.execute(query, values, (err, result) => {
                if (err) {
                    return reject(err);
                }
                return resolve(result);
            });
        });
    }

    executeInTransaction(func: (err?: any) => void, callback:(err?:Error) => void): void {
        return func((err?: any) => {
            if (err) {
                return callback(err);
            }
            return callback();
        });
    }

    async executeInTransactionAsync(func: () => Promise<void>): Promise<void> {
        return func();
    }

    selectIdentity(entity:string, attribute:string , callback?:(err?:Error, result?:any) => void): void {
        //
    }

}

export {
    ArrayAdapter
}
import { QueryExpression, QueryField, SqlFormatter } from '@themost/query';
import { pick, at } from 'lodash';
function getOwnPropertyName(obj: any) {
    if (obj == null) {
        return null;
    }
    for(const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return key;
        }
    }
    return null;
}

class ArrayFormatter extends SqlFormatter {
    constructor() {
        super();
    }

    escapeConstant(value: any,unquoted?: boolean): any {
        return value;
    }

    formatField(obj: any): any {
        let queryField: QueryField;
        if (typeof obj === 'string') {
            queryField = new QueryField(obj);
        } else {
            queryField = Object.assign(new QueryField(), obj);
        }
        return (item: any) => {
            if (Object.prototype.hasOwnProperty.call(item, obj) === true) {
                return item[obj];
            }
            return null;
        }
    }

    formatFieldEx(field: any, format: string): any {
        const property = getOwnPropertyName(field);
        const useAlias = (format === '%f');
        if (property === '$name') {
            if (useAlias) {
                const alias = field.getName();
                return (item: any) => {
                    const value = at(item, field[property])[0];
                    return [
                        alias,
                        value
                    ]
                }
            }
            return (item: any) => {
                return [
                    at(item, field[property])[0]
                ];
            }
        }
    }

    format(obj: any, s?: string): any {
        return super.format(obj);
    }

    formatSelect(query: QueryExpression | any): any {
        const select = query.$select;
        // get array
        for (const key of Object.keys(select)) {
            if (Object.prototype.hasOwnProperty.call(select, key)) {
                // get attributes
                const attributes = select[key];
                const selectExpressions: any[] = [];
                for (const attribute of attributes) {
                    if (typeof attribute === 'string') {
                        selectExpressions.push(this.formatFieldEx(new QueryField(attribute), '%f'));
                    } else {
                        selectExpressions.push(this.formatFieldEx(attribute, '%f'));
                    }
                }
                // return map closure
                return (item:any) => {
                    return selectExpressions.reduce((value, selectExpression: (item: any) => any) => {
                        // execute select
                        const selectResult: any[] = selectExpression(item);
                        // and set property
                        Object.defineProperty(value, selectResult[0], {
                            configurable: true,
                            enumerable: true,
                            writable: true,
                            value: selectResult[1]
                        });
                        return value;
                    }, {});
                }
            }
        }
    }

}

export {
    ArrayFormatter
}
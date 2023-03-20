import { QueryExpression, QueryField, SqlFormatter, SqlUtils } from '@themost/query';
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

function round(n: any, precision?: number) {
    if (typeof n !== 'number') {
        return 0;
    }
    if (precision) {
        return parseFloat(n.toFixed(precision))
    }
    return Math.round(n);
}

function mapValue(expr: any, source: any): any {
    if (typeof expr === 'function') {
        return expr(source);
    }
    return expr;
}

class ArrayFormatter extends SqlFormatter {
    constructor() {
        super();
    }

    escapeConstant(value: any,unquoted?: boolean): any {
        return value;
    }

    escape(value: any, unquoted?: boolean): any {
        if (typeof value === 'object') {
            if (value instanceof Date) {
                return SqlUtils.escape(value);
            }
            if (Object.prototype.hasOwnProperty.call(value, '$name')) {
                return this.escapeName(value.$name);
            }
            else if (Object.prototype.hasOwnProperty.call(value, '$value')) {
                return this.escape(value.$value);
            }
            let keys = Object.keys(value)
            const key0 = keys[0];
            if (typeof key0 === 'string' && /^\$/.test(key0) && typeof this[key0] === 'function') {
                let exprFunc = this[key0];
                let args: any;
                // if function has an array of arguments e.g.
                // title.startsWith('Introduction')
                // { $startWith: [{ $name : "title" }, 'Introduction'] }
                if (Array.isArray(value[key0])) {
                    args = value[key0];
                } else {
                    args = keys.map((x) => {
                        return value[x];
                    });
                }
                return exprFunc.apply(this, args);
            } else if (keys.length === 1) {
                // backward compatibility for simple equal expression
                // e.g. { "category": "Laptops" }
                return this.$eq(new QueryField(key0), value[key0]);
            }
        }
        return super.escape(value, true);
    }

    escapeName(name: string): any {
        return (item: any) => {
            return at(item, name)[0];
        }
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
        } else {
            const exprFunc = this[property];
            if (typeof exprFunc === 'function') {
                return exprFunc.apply(this, [].concat(field[property]));
            }
            return (item: any) => {
                const value = this.format(field[property], '%f');
                if (typeof value === 'function') {
                    const finalValue = value(item);
                    return [
                        property,
                        Array.isArray(finalValue) ? finalValue[1] : finalValue
                    ]
                }
                return [
                    property,
                    value
                ]
            }
        }
    }

    format(obj: any, s?: string): any {
        return super.format(obj, s);
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
                    selectExpressions.push(this.format(attribute, '%f'));
                }
                // return map closure
                return (item:any) => {
                    return selectExpressions.reduce((value, selectExpression: (item: any) => any) => {
                        // execute select
                        const selectResult: any[] = selectExpression(item);
                        // and set property
                        let selectResult1: any;
                        if (typeof selectResult[1] === 'function') {
                            selectResult1 = selectResult[1](item);
                        } else {
                            selectResult1 = selectResult[1];
                        }
                        Object.defineProperty(value, selectResult[0], {
                            configurable: true,
                            enumerable: true,
                            writable: true,
                            value: selectResult1
                        });
                        return value;
                    }, {});
                }
            }
        }
    }

    formatWhere(expr: any): any {
        if (expr != null) {
            const property = getOwnPropertyName(expr);
            if (typeof this[property] === 'function') {
                const exprFunc = this[property];
                return exprFunc.apply(this, [].concat(expr[property]));
            } else {
                const value = expr[property]
                const valueProperty = getOwnPropertyName(value);
                if (valueProperty && valueProperty.startsWith('$')) {
                    const valueFunc =this[valueProperty];
                    if (typeof valueFunc === 'function') {
                        const left = {};
                        Object.defineProperty(left, valueProperty, {
                            configurable: true,
                            enumerable: true,
                            value: [
                                new QueryField(property)
                            ]
                        });
                        return this.$eq.apply(this, [].concat(
                            left,
                            value[valueProperty]
                        ));
                    }
                }
                return this.$eq.apply(this, [].concat(
                    new QueryField(property),
                    expr[property]
                ));
            }
        }
        return (item: any) => {
            return true;
        }
    }

    $and(p0:any, p1:any): any {
        return (item: any) => {
            const finalValue1: any = mapValue(this.formatWhere(p0), item);
            const finalValue2: any = mapValue(this.formatWhere(p1), item);
            return finalValue1 && finalValue2;
        }
    }

    $or(p0:any, p1:any): any {
        return (item: any) => {
            const finalValue1: any = mapValue(this.formatWhere(p0), item);
            const finalValue2: any = mapValue(this.formatWhere(p1), item);
            return finalValue1 || finalValue2;
        }
    }

    $eq(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return value1 === value2;
        }
    }

    $ne(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            // tslint:disable-next-line: triple-equals
            return value1 != value2;
        }
    }

    $gt(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            // tslint:disable-next-line: triple-equals
            return value1 > value2;
        }
    }

    $gte(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            // tslint:disable-next-line: triple-equals
            return value1 >= value2;
        }
    }

    $lt(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            // tslint:disable-next-line: triple-equals
            return value1 < value2;
        }
    }

    $lte(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            // tslint:disable-next-line: triple-equals
            return value1 <= value2;
        }
    }

    $length(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value && String(value).length;
        }
    }

    $substr(p0: any, pos: number, length?: number): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value && String(value).substr(pos, length);
        }
    }

    $substring(p0: any, pos: number, length?: number): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value && String(value).substring(pos, length);
        }
    }

    $trim(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value && String(value).trim();
        }
    }

    $tolower(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value && String(value).toLocaleLowerCase();
        }
    }

    $toupper(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value && String(value).toLocaleUpperCase();
        }
    }

    $startswith(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return String(value1).startsWith(String(value2));
        }
    }

    $endswith(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return String(value1).endsWith(String(value2));
        }
    }

    $concat(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return String(value1).concat(String(value2));
        }
    }

    $indexof(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return String(value1).indexOf(String(value2));
        }
    }

    $contains(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return (String(value1).indexOf(String(value2)) >= 0);
        }
    }

    $text(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return (String(value1).match(String(value2)) != null);
        }
    }

    $day(p0:any): any {
        return (item: any) => {
            const result: any = this.escape(p0);
            const value: any = (typeof result === 'function') ? result(item) : result;
            return value instanceof Date && value.getDate();
        }
    }

    $dayOfMonth(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value instanceof Date && value.getDate();
        }
    }

    $month(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value instanceof Date && value.getMonth() + 1;
        }
    }

    $year(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value instanceof Date && value.getFullYear();
        }
    }

    $hour(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value instanceof Date && value.getHours();
        }
    }

    $minute(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value instanceof Date && value.getMinutes();
        }
    }

    $second(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value instanceof Date && value.getSeconds();
        }
    }

    $date(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return value instanceof Date && new Date(value.getFullYear(), value.getMonth(), value.getDate());
        }
    }

    $round(p0:any, precision?: any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return round(value, precision);
        }
    }

    $floor(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return Math.floor(value,);
        }
    }

    $ceiling(p0:any): any {
        return (item: any) => {
            const value: any = mapValue(this.escape(p0), item);
            return Math.ceil(value,);
        }
    }

    $add(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return value1 + value2;
        }
    }

    $subtract(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return value1 - value2;
        }
    }

    $sub(p0:any, p1:any): any {
        return this.$subtract(p0, p1);
    }

    $multiply(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return value1 * value2;
        }
    }

    $mul(p0:any, p1:any): any {
        return this.$multiply(p0, p1);
    }

    $divide(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return value1 * value2;
        }
    }

    $div(p0:any, p1:any): any {
        return this.$divide(p0, p1);
    }

    $mod(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            return value1 % value2;
        }
    }

    $bit(p0:any, p1:any): any {
        return (item: any) => {
            const value1: any = mapValue(this.escape(p0), item);
            const value2: any = mapValue(this.escape(p1), item);
            // tslint:disable-next-line: no-bitwise
            return value1 & value2;
        }
    }

}

export {
    ArrayFormatter
}
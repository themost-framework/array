import { QueryExpression, QueryField } from '@themost/query';
import { ArrayFormatter } from '@themost/array';
import { PRODUCTS } from './data/Products';
describe('ArrayFormatter', () => {
    it('should format select', async () => {
        const q = new QueryExpression().select('id', 'name').from('Products');
        const formatter = new ArrayFormatter();
        const selectMap: (item: any) => any = formatter.formatSelect(q);
        const items = PRODUCTS.map((item) => {
            return selectMap(item);
        })
        expect(items).toBeTruthy();
        for (const item of items) {
            const keys = Object.keys(item);
            expect(keys).toEqual([
                'id', 'name'
            ]);
        }
        expect(items[0].id).toEqual(PRODUCTS[0].id);
        expect(items[0].name).toEqual(PRODUCTS[0].name);
    });

    it('should format select with alias', async () => {
        const q = new QueryExpression().select(
            new QueryField('id'),
            new QueryField('name').as('productName')
        ).from('Products');
        const formatter = new ArrayFormatter();
        const selectMap: (item: any) => any = formatter.formatSelect(q);
        const items = PRODUCTS.map((item) => {
            return selectMap(item);
        })
        expect(items).toBeTruthy();
        for (const item of items) {
            const keys = Object.keys(item);
            expect(keys).toEqual([
                'id', 'productName'
            ]);
        }
        expect(items[0].id).toEqual(PRODUCTS[0].id);
        expect(items[0].productName).toEqual(PRODUCTS[0].name);
    });

    it('should use escape', () => {
        const formatter = new ArrayFormatter();
        const expr:any = formatter.escape(new QueryField('id'));
        expect(expr).toBeTruthy();
        expect(formatter.escape(true, true)).toBeTrue()
        expect(expr).toBeInstanceOf(Function);
        expect(expr({
            id: 10
        })).toEqual(10);
    })

    it('should format select with function', async () => {
        const q = new QueryExpression().select(
            new QueryField('id'),
            QueryField.round('price', 1).as('price')
        ).from('Products');
        const formatter = new ArrayFormatter();
        const selectMap: (item: any) => any = formatter.formatSelect(q);
        const items = PRODUCTS.map((item) => {
            return selectMap(item);
        })
        expect(items).toBeTruthy();
        for (const item of items) {
            const keys = Object.keys(item);
            expect(keys).toEqual([
                'id', 'price'
            ]);
        }
        expect(items[0].id).toEqual(PRODUCTS[0].id);
        expect(items[0].price).toBeTruthy();
    });

    it('should format where', async () => {
        const q = new QueryExpression()
            .select('id', 'name').from('Products').where('id').equal(1);
        const formatter = new ArrayFormatter();
        const selectMap: (item: any) => any = formatter.formatSelect(q);
        const items = PRODUCTS.map((item) => {
            return selectMap(item);
        })
        expect(items).toBeTruthy();
        for (const item of items) {
            const keys = Object.keys(item);
            expect(keys).toEqual([
                'id', 'name'
            ]);
        }
        expect(items[0].id).toEqual(PRODUCTS[0].id);
        expect(items[0].name).toEqual(PRODUCTS[0].name);
    });

});
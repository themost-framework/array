import { QueryExpression } from '@themost/query';
import { ArrayFormatter } from '@themost/array';
import { PRODUCTS } from './data/Products';
describe('ArrayFormatter', () => {
    it('should parse select', async () => {
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
});
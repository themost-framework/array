const PRODUCTS = [{
    'id': 1,
    'name': 'Chais',
    'supplier': 1,
    'category': 1,
    'unit': '10 boxes x 20 bags',
    'price': 18.0
},
{
    'id': 2,
    'name': 'Chang',
    'supplier': 1,
    'category': 1,
    'unit': '24 - 12 oz bottles',
    'price': 19.0
},
{
    'id': 3,
    'name': 'Aniseed Syrup',
    'supplier': 1,
    'category': 2,
    'unit': '12 - 550 ml bottles',
    'price': 10.0
},
{
    'id': 4,
    'name': 'Chef Anton\'s Cajun Seasoning',
    'supplier': 2,
    'category': 2,
    'unit': '48 - 6 oz jars',
    'price': 22.0
},
{
    'id': 5,
    'name': 'Chef Anton\'s Gumbo Mix',
    'supplier': 2,
    'category': 2,
    'unit': '36 boxes',
    'price': 21.35
},
{
    'id': 6,
    'name': 'Grandma\'s Boysenberry Spread',
    'supplier': 3,
    'category': 2,
    'unit': '12 - 8 oz jars',
    'price': 25.0
},
{
    'id': 7,
    'name': 'Uncle Bob\'s Organic Dried Pears',
    'supplier': 3,
    'category': 7,
    'unit': '12 - 1 lb pkgs.',
    'price': 30.0
},
{
    'id': 8,
    'name': 'Northwoods Cranberry Sauce',
    'supplier': 3,
    'category': 2,
    'unit': '12 - 12 oz jars',
    'price': 40.0
},
{
    'id': 9,
    'name': 'Mishi Kobe Niku',
    'supplier': 4,
    'category': 6,
    'unit': '18 - 500 g pkgs.',
    'price': 97.0
},
{
    'id': 10,
    'name': 'Ikura',
    'supplier': 4,
    'category': 8,
    'unit': '12 - 200 ml jars',
    'price': 31.0
},
{
    'id': 11,
    'name': 'Queso Cabrales',
    'supplier': 5,
    'category': 4,
    'unit': '1 kg pkg.',
    'price': 21.0
},
{
    'id': 12,
    'name': 'Queso Manchego La Pastora',
    'supplier': 5,
    'category': 4,
    'unit': '10 - 500 g pkgs.',
    'price': 38.0
},
{
    'id': 13,
    'name': 'Konbu',
    'supplier': 6,
    'category': 8,
    'unit': '2 kg box',
    'price': 6.0
},
{
    'id': 14,
    'name': 'Tofu',
    'supplier': 6,
    'category': 7,
    'unit': '40 - 100 g pkgs.',
    'price': 23.25
},
{
    'id': 15,
    'name': 'Genen Shouyu',
    'supplier': 6,
    'category': 2,
    'unit': '24 - 250 ml bottles',
    'price': 15.5
},
{
    'id': 16,
    'name': 'Pavlova',
    'supplier': 7,
    'category': 3,
    'unit': '32 - 500 g boxes',
    'price': 17.45
},
{
    'id': 17,
    'name': 'Alice Mutton',
    'supplier': 7,
    'category': 6,
    'unit': '20 - 1 kg tins',
    'price': 39.0
},
{
    'id': 18,
    'name': 'Carnarvon Tigers',
    'supplier': 7,
    'category': 8,
    'unit': '16 kg pkg.',
    'price': 62.5
},
{
    'id': 19,
    'name': 'Teatime Chocolate Biscuits',
    'supplier': 8,
    'category': 3,
    'unit': '10 boxes x 12 pieces',
    'price': 9.2
},
{
    'id': 20,
    'name': 'Sir Rodney\'s Marmalade',
    'supplier': 8,
    'category': 3,
    'unit': '30 gift boxes',
    'price': 81.0
},
{
    'id': 21,
    'name': 'Sir Rodney\'s Scones',
    'supplier': 8,
    'category': 3,
    'unit': '24 pkgs. x 4 pieces',
    'price': 10.0
},
{
    'id': 22,
    'name': 'Gustaf\'s Knäckebröd',
    'supplier': 9,
    'category': 5,
    'unit': '24 - 500 g pkgs.',
    'price': 21.0
},
{
    'id': 23,
    'name': 'Tunnbröd',
    'supplier': 9,
    'category': 5,
    'unit': '12 - 250 g pkgs.',
    'price': 9.0
},
{
    'id': 24,
    'name': 'Guaraná Fantástica',
    'supplier': 10,
    'category': 1,
    'unit': '12 - 355 ml cans',
    'price': 4.5
},
{
    'id': 25,
    'name': 'NuNuCa Nuß-Nougat-Creme',
    'supplier': 11,
    'category': 3,
    'unit': '20 - 450 g glasses',
    'price': 14.0
},
{
    'id': 26,
    'name': 'Gumbär Gummibärchen',
    'supplier': 11,
    'category': 3,
    'unit': '100 - 250 g bags',
    'price': 31.23
},
{
    'id': 27,
    'name': 'Schoggi Schokolade',
    'supplier': 11,
    'category': 3,
    'unit': '100 - 100 g pieces',
    'price': 43.9
},
{
    'id': 28,
    'name': 'Rössle Sauerkraut',
    'supplier': 12,
    'category': 7,
    'unit': '25 - 825 g cans',
    'price': 45.6
},
{
    'id': 29,
    'name': 'Thüringer Rostbratwurst',
    'supplier': 12,
    'category': 6,
    'unit': '50 bags x 30 sausgs.',
    'price': 123.79
},
{
    'id': 30,
    'name': 'Nord-Ost Matjeshering',
    'supplier': 13,
    'category': 8,
    'unit': '10 - 200 g glasses',
    'price': 25.89
},
{
    'id': 31,
    'name': 'Gorgonzola Telino',
    'supplier': 14,
    'category': 4,
    'unit': '12 - 100 g pkgs',
    'price': 12.5
},
{
    'id': 32,
    'name': 'Mascarpone Fabioli',
    'supplier': 14,
    'category': 4,
    'unit': '24 - 200 g pkgs.',
    'price': 32.0
},
{
    'id': 33,
    'name': 'Geitost',
    'supplier': 15,
    'category': 4,
    'unit': '500 g',
    'price': 2.5
},
{
    'id': 34,
    'name': 'Sasquatch Ale',
    'supplier': 16,
    'category': 1,
    'unit': '24 - 12 oz bottles',
    'price': 14.0
},
{
    'id': 35,
    'name': 'Steeleye Stout',
    'supplier': 16,
    'category': 1,
    'unit': '24 - 12 oz bottles',
    'price': 18.0
},
{
    'id': 36,
    'name': 'Inlagd Sill',
    'supplier': 17,
    'category': 8,
    'unit': '24 - 250 g jars',
    'price': 19.0
},
{
    'id': 37,
    'name': 'Gravad lax',
    'supplier': 17,
    'category': 8,
    'unit': '12 - 500 g pkgs.',
    'price': 26.0
},
{
    'id': 38,
    'name': 'Côte de Blaye',
    'supplier': 18,
    'category': 1,
    'unit': '12 - 75 cl bottles',
    'price': 263.5
},
{
    'id': 39,
    'name': 'Chartreuse verte',
    'supplier': 18,
    'category': 1,
    'unit': '750 cc per bottle',
    'price': 18.0
},
{
    'id': 40,
    'name': 'Boston Crab Meat',
    'supplier': 19,
    'category': 8,
    'unit': '24 - 4 oz tins',
    'price': 18.4
},
{
    'id': 41,
    'name': 'Jack\'s New England Clam Chowder',
    'supplier': 19,
    'category': 8,
    'unit': '12 - 12 oz cans',
    'price': 9.65
},
{
    'id': 42,
    'name': 'Singaporean Hokkien Fried Mee',
    'supplier': 20,
    'category': 5,
    'unit': '32 - 1 kg pkgs.',
    'price': 14.0
},
{
    'id': 43,
    'name': 'Ipoh Coffee',
    'supplier': 20,
    'category': 1,
    'unit': '16 - 500 g tins',
    'price': 46.0
},
{
    'id': 44,
    'name': 'Gula Malacca',
    'supplier': 20,
    'category': 2,
    'unit': '20 - 2 kg bags',
    'price': 19.45
},
{
    'id': 45,
    'name': 'Røgede sild',
    'supplier': 21,
    'category': 8,
    'unit': '1k pkg.',
    'price': 9.5
},
{
    'id': 46,
    'name': 'Spegesild',
    'supplier': 21,
    'category': 8,
    'unit': '4 - 450 g glasses',
    'price': 12.0
},
{
    'id': 47,
    'name': 'Zaanse koeken',
    'supplier': 22,
    'category': 3,
    'unit': '10 - 4 oz boxes',
    'price': 9.5
},
{
    'id': 48,
    'name': 'Chocolade',
    'supplier': 22,
    'category': 3,
    'unit': '10 pkgs.',
    'price': 12.75
},
{
    'id': 49,
    'name': 'Maxilaku',
    'supplier': 23,
    'category': 3,
    'unit': '24 - 50 g pkgs.',
    'price': 20.0
},
{
    'id': 50,
    'name': 'Valkoinen suklaa',
    'supplier': 23,
    'category': 3,
    'unit': '12 - 100 g bars',
    'price': 16.25
},
{
    'id': 51,
    'name': 'Manjimup Dried Apples',
    'supplier': 24,
    'category': 7,
    'unit': '50 - 300 g pkgs.',
    'price': 53.0
},
{
    'id': 52,
    'name': 'Filo Mix',
    'supplier': 24,
    'category': 5,
    'unit': '16 - 2 kg boxes',
    'price': 7.0
},
{
    'id': 53,
    'name': 'Perth Pasties',
    'supplier': 24,
    'category': 6,
    'unit': '48 pieces',
    'price': 32.8
},
{
    'id': 54,
    'name': 'Tourtière',
    'supplier': 25,
    'category': 6,
    'unit': '16 pies',
    'price': 7.45
},
{
    'id': 55,
    'name': 'Pâté chinois',
    'supplier': 25,
    'category': 6,
    'unit': '24 boxes x 2 pies',
    'price': 24.0
},
{
    'id': 56,
    'name': 'Gnocchi di nonna Alice',
    'supplier': 26,
    'category': 5,
    'unit': '24 - 250 g pkgs.',
    'price': 38.0
},
{
    'id': 57,
    'name': 'Ravioli Angelo',
    'supplier': 26,
    'category': 5,
    'unit': '24 - 250 g pkgs.',
    'price': 19.5
},
{
    'id': 58,
    'name': 'Escargots de Bourgogne',
    'supplier': 27,
    'category': 8,
    'unit': '24 pieces',
    'price': 13.25
},
{
    'id': 59,
    'name': 'Raclette Courdavault',
    'supplier': 28,
    'category': 4,
    'unit': '5 kg pkg.',
    'price': 55.0
},
{
    'id': 60,
    'name': 'Camembert Pierrot',
    'supplier': 28,
    'category': 4,
    'unit': '15 - 300 g rounds',
    'price': 34.0
},
{
    'id': 61,
    'name': 'Sirop d\'érable',
    'supplier': 29,
    'category': 2,
    'unit': '24 - 500 ml bottles',
    'price': 28.5
},
{
    'id': 62,
    'name': 'Tarte au sucre',
    'supplier': 29,
    'category': 3,
    'unit': '48 pies',
    'price': 49.3
},
{
    'id': 63,
    'name': 'Vegie-spread',
    'supplier': 7,
    'category': 2,
    'unit': '15 - 625 g jars',
    'price': 43.9
},
{
    'id': 64,
    'name': 'Wimmers gute Semmelknödel',
    'supplier': 12,
    'category': 5,
    'unit': '20 bags x 4 pieces',
    'price': 33.25
},
{
    'id': 65,
    'name': 'Louisiana Fiery Hot Pepper Sauce',
    'supplier': 2,
    'category': 2,
    'unit': '32 - 8 oz bottles',
    'price': 21.05
},
{
    'id': 66,
    'name': 'Louisiana Hot Spiced Okra',
    'supplier': 2,
    'category': 2,
    'unit': '24 - 8 oz jars',
    'price': 17.0
},
{
    'id': 67,
    'name': 'Laughing Lumberjack Lager',
    'supplier': 16,
    'category': 1,
    'unit': '24 - 12 oz bottles',
    'price': 14.0
},
{
    'id': 68,
    'name': 'Scottish Longbreads',
    'supplier': 8,
    'category': 3,
    'unit': '10 boxes x 8 pieces',
    'price': 12.5
},
{
    'id': 69,
    'name': 'Gudbrandsdalsost',
    'supplier': 15,
    'category': 4,
    'unit': '10 kg pkg.',
    'price': 36.0
},
{
    'id': 70,
    'name': 'Outback Lager',
    'supplier': 7,
    'category': 1,
    'unit': '24 - 355 ml bottles',
    'price': 15.0
},
{
    'id': 71,
    'name': 'Fløtemysost',
    'supplier': 15,
    'category': 4,
    'unit': '10 - 500 g pkgs.',
    'price': 21.5
},
{
    'id': 72,
    'name': 'Mozzarella di Giovanni',
    'supplier': 14,
    'category': 4,
    'unit': '24 - 200 g pkgs.',
    'price': 34.8
},
{
    'id': 73,
    'name': 'Röd Kaviar',
    'supplier': 17,
    'category': 8,
    'unit': '24 - 150 g jars',
    'price': 15.0
},
{
    'id': 74,
    'name': 'Longlife Tofu',
    'supplier': 4,
    'category': 7,
    'unit': '5 kg pkg.',
    'price': 10.0
},
{
    'id': 75,
    'name': 'Rhönbräu Klosterbier',
    'supplier': 12,
    'category': 1,
    'unit': '24 - 0.5 l bottles',
    'price': 7.75
},
{
    'id': 76,
    'name': 'Lakkalikööri',
    'supplier': 23,
    'category': 1,
    'unit': '500 ml',
    'price': 18.0
},
{
    'id': 77,
    'name': 'Original Frankfurter grüne Soße',
    'supplier': 12,
    'category': 2,
    'unit': '12 boxes',
    'price': 13.0
}]

export {
    PRODUCTS
}
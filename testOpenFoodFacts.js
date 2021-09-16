const fetch = require("node-fetch")
const func = async () => {
    const product = "3095759496010"
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${product}.json`)
    const data = await res.json();
    const nutriments = data.product.nutriments;
    const nutriscore = data.product.nutriscore_grade;
    const allergens_tags = data.product.allergens_tags;
    const ingredients_ids_debug = data.product.ingredients_ids_debug
    const ingredients_hierarchy = data.product.ingredients_hierarchy
    const packaging = data.product.packaging;
    console.log(nutriments)
    console.log("        a                     ")
    console.log(nutriscore)
    console.log(allergens_tags)
    console.log(ingredients_ids_debug)
    console.log(ingredients_hierarchy)
    console.log(packaging)
}

func();
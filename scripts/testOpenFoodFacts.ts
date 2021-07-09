/// @ts-nocheck
// @ts-ignore
const fetch = require("node-fetch");
import { IsBio } from "../server/algo/scoring/Bio";
import { IsPeanutFree } from "../server/algo/scoring/Peanut";

const clear = (str: string) => {
    if (!str) return "";
    return str.replace(/œ/g, "oe").replace(/[^\x00-\xFF]/g, "");
  };

  
const func = async () => {
  const product = "3760020507350";
  const res = await fetch(
    `https://world.openfoodfacts.org/api/v0/product/${product}.json`
  );
  const data = await res.json();
  const nutriments = data.product.nutriments;
  const nutriscore = data.product.nutriscore_grade;
  const allergens_tags = data.product.allergens_tags;
  const ingredients_ids_debug = data.product.ingredients_ids_debug;
  const ingredients_hierarchy = data.product.ingredients_hierarchy;
  const packaging = data.product.packaging;
  const labels = 

  clear((data.product.labels.split(',') || []).join("|"))
//   console.log(typeof labels)
//     console.log(nutriments);
//     console.log("        a                     ");
//     console.log(nutriscore);
    console.log(allergens_tags);
    // console.log(ingredients_ids_debug);
    // console.log(ingredients_hierarchy);
    // console.log(packaging);

//   console.log(labels);

};

func();

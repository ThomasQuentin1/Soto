import React, { useState, useEffect } from "react";
import '../i18n'
import DarkModeParent from "../components/encapsulationComponents/DarkModeParent";
import { useDarkMode } from "../components/settings/useDarkMode";
import { useTranslation } from "react-i18next"
import Header from 'components/global/Header';
import Footer from 'components/global/Footer';
import { Product, useAccountQuery } from 'typing';
import DiscountList from "components/discounts/DiscountList";
import { TextField, Grid, Button, Typography } from "@mui/material";

const shopDiscouts: Product[][] = [[{ "id": "191", "name": "Pâtes Lasagne", "brand": "Barilla", "priceUnit": "0.60", "priceMass": "2.84 €/KG", "ingredients": ["semoule-de-ble-dur", "eau", "peut-contenir-des-traces-de-soja-et-d-oeuf"], "packaging": ["empaque de Cartón", "cartone", "Packung(en)", "Karton", "Produkt", "en:card-box"], "allergens": ["en:gluten"], "nutriments": ["energy-kcal:359", "sugars_100g:3.5", "fiber_100g:3", "salt_100g:0.013", "fat_100g:2"], "nutriscore": "a", "scoreHealth": 89, "scoreEnvironment": 79, "finalScore": 81, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://images.openfoodfacts.org/images/products/807/680/952/3738/front_fr.144.400.jpg", "url": "https://fd6-courses.leclercdrive.fr/magasin-086701-e.leclerc-drive-strasbourg-marché-gare/fiche-produits-191-Pâtes-Lasagne.aspx" }, { "id": "60166", "name": "Coquillettes - Pâtes d'Alsace", "brand": "Valfleuri", "priceUnit": "1.69", "priceMass": "2.96 €/KG", "ingredients": ["semoule-de-ble-dur-de-qualite-superieure", "30-d-oeufs-frais-de-poules-elevees-en-plein-air-soit-320-g-par-kilo-de-semoule"], "packaging": ["Sachet plastique"], "allergens": ["en:eggs,en:gluten"], "nutriments": ["energy-kcal:363", "sugars_100g:3", "fiber_100g:3", "salt_100g:0.1", "fat_100g:4.6"], "nutriscore": "a", "scoreHealth": 88, "scoreEnvironment": 65, "finalScore": 80, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd6-photos.leclercdrive.fr/image.ashx?id=1934030&use=d&cat=p&typeid=i&width=300", "url": "https://fd6-courses.leclercdrive.fr/magasin-086701-e.leclerc-drive-strasbourg-marché-gare/fiche-produits-60166-Coquillettes---Pâtes-d'Alsace.aspx" }, { "id": "23025", "name": "Boisson soja du sud ouest nature", "brand": "Céréal Bio,Céréal,Nutrition & Santé", "priceUnit": "0.80", "priceMass": "1.45 €/L", "ingredients": ["boisson-au-soja-sans-ogm-100", "eau", "soja-decortique-8", "2", "ingredients-agricoles-issus-de-l-agriculture-biologique", "100-d-origine-france"], "packaging": ["Brique", "Carton", "Tetra Pak"], "allergens": ["en:soybeans"], "nutriments": ["energy-kcal:41", "sugars_100g:0.7", "salt_100g:0.03", "fat_100g:2.1"], "nutriscore": "a", "scoreHealth": 89, "scoreEnvironment": 91, "finalScore": 97, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd6-photos.leclercdrive.fr/image.ashx?id=1711885&use=d&cat=p&typeid=i&width=300", "url": "https://fd6-courses.leclercdrive.fr/magasin-086701-e.leclerc-drive-strasbourg-marché-gare/fiche-produits-23025-Boisson-soja-du-sud-ouest-nature.aspx" }, { "id": "817", "name": "Yaourt Nature", "brand": "Délisse,Marque Repère,Scamark (Filiale E. Leclerc)", "priceUnit": "0.80", "priceMass": "0.98 €/KG", "ingredients": ["lait-partiellement-ecreme", "lactose-et-proteines-de-lait", "ferments-lactiques"], "packaging": ["Frais", "Pot", "Plastique", "Opercule"], "allergens": ["en:milk"], "nutriments": ["energy-kcal:43", "sugars_100g:4.5", "salt_100g:0.1", "fat_100g:1"], "nutriscore": "a", "scoreHealth": 89, "scoreEnvironment": 72, "finalScore": 93, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd6-photos.leclercdrive.fr/image.ashx?id=1871076&use=d&cat=p&typeid=i&width=300", "url": "https://fd6-courses.leclercdrive.fr/magasin-086701-e.leclerc-drive-strasbourg-marché-gare/fiche-produits-817-Yaourt-Nature.aspx" }, { "id": "822", "name": "Yaourts à la grecque au lait de brebis nature", "brand": "Délisse,Marque Repère", "priceUnit": "0.75", "priceMass": "1.82 €/KG", "ingredients": ["lait-de-brebis", "origine", "france", "creme-de-brebis", "origine", "france", "ferments-lactiques"], "packaging": [""], "allergens": ["en:milk"], "nutriments": ["sugars_100g:2.8", "fiber_100g:0.5", "salt_100g:0.1", "fat_100g:10"], "nutriscore": "c", "scoreHealth": 62, "scoreEnvironment": 79, "finalScore": 92, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd6-photos.leclercdrive.fr/image.ashx?id=1920963&use=d&cat=p&typeid=i&width=300", "url": "https://fd6-courses.leclercdrive.fr/magasin-086701-e.leclerc-drive-strasbourg-marché-gare/fiche-produits-822-Yaourts-à-la-grecque-au-lait-de-brebis-nature.aspx" }],
[{ "id": "16063", "name": "Lot 2 sauces Pesto Rosso", "brand": "Barilla", "priceUnit": "1.72", "priceMass": "8.25 €/KG", "ingredients": ["pulpe-de-tomates-34", "8", "huile-de-tournesol", "concentre-de-tomate-15", "sirop-de-glucose", "fromage-grana-padano-aop-4", "lysozyme-d-oeuf", "noix-de-cajou", "sel", "basilic-2", "2", "vinaigre-balsamique-aceto-balsamico-di-modena-igp-2", "lactoserum-en-poudre", "fromage-pecorino-romano-aop-1", "sucre", "amidon-de-riz", "ail", "correcteur-d-acidite", "acide-lactique", "arome", "lait", "peut-contenir-des-traces-d-autres-fruits-a-coque"], "packaging": ["carton", "bocal verre", "couvercle métal"], "allergens": ["en:eggs,en:milk,en:nuts"], "nutriments": ["energy-kcal:324", "sugars_100g:7.5", "fiber_100g:2", "salt_100g:3", "fat_100g:28"], "nutriscore": "d", "scoreHealth": 45, "scoreEnvironment": 65, "finalScore": 45, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://images.openfoodfacts.org/images/products/807/680/953/8008/front_fr.20.400.jpg", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-16063-Lot-2-sauces-Pesto-Rosso.aspx" }, { "id": "82689", "name": "Pesto alla genovese bio", "brand": "Barilla", "priceUnit": "1.67", "priceMass": "12.05 €/KG", "ingredients": ["huile-de-tournesol", "basilic-31", "lactoserum-en-poudre", "noix-de-cajou", "sel", "fromage-parmigiano-reggiano-aop", "lait", "sucre", "huile-d-olive-extra-vierge", "aromes-naturels", "correcteur-d-acidite", "acide-lactique", "peut-contenir-des-traces-d-autres-fruits-a-coque", "ingredients-biologiques"], "packaging": ["verre", "métal", "bocal"], "allergens": ["en:milk,en:nuts"], "nutriments": ["energy-kcal:521", "sugars_100g:4.2", "fiber_100g:1", "salt_100g:3.2", "fat_100g:52"], "nutriscore": "e", "scoreHealth": 29, "scoreEnvironment": 66, "finalScore": 41, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd12-photos.leclercdrive.fr/image.ashx?id=1596547&use=d&cat=p&typeid=i&width=300", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-82689-Pesto-alla-genovese-bio.aspx" }, { "id": "177", "name": "Sauce tomate nature x 2", "brand": "Turini,Marque Repère", "priceUnit": "0.79", "priceMass": "1.95 €/KG", "ingredients": ["puree-de-tomates-m-reduite-81", "eau", "amidon-modifie-de-mais", "sucre", "oignons-0", "9", "sel", "huile-de-colza", "epice-et-plantes-aromatiques", "l"], "packaging": ["Conserve", "métal"], "allergens": [""], "nutriments": ["sugars_100g:5.4", "fiber_100g:2", "salt_100g:0.9", "fat_100g:0.7"], "nutriscore": "a", "scoreHealth": 89, "scoreEnvironment": 63, "finalScore": 66, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd12-photos.leclercdrive.fr/image.ashx?id=1256755&use=d&cat=p&typeid=i&width=300", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-177-Sauce-tomate-nature-x-2.aspx" }, { "id": "55083", "name": "Panzani - spf - sauce tomates cuisinées", "brand": "Panzani", "priceUnit": "0.79", "priceMass": "2.45 €/KG", "ingredients": ["puree-de-tomates-fraiches-avec-morceaux-et-purees-de-tomates-fraiches", "81", "legumes-frais", "iognons-9", "carottes-3", "5", "huile-de-tournesol", "sucre", "sel", "amidon-transforme-de-mais", "plantes-aromatiques", "aromes", "ail-frais"], "packaging": ["Bocal en verre", " Bocal", " fr:Pot en verre"], "allergens": [""], "nutriments": ["energy-kcal:58", "sugars_100g:5.3", "fiber_100g:1.9", "salt_100g:0.9", "fat_100g:2.6"], "nutriscore": "c", "scoreHealth": 63, "scoreEnvironment": 82, "finalScore": 60, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://images.openfoodfacts.org/images/products/303/835/900/5237/front_fr.66.400.jpg", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-55083-Panzani---spf---sauce-tomates-cuisinées.aspx" }, { "id": "186", "name": "Pâtes Mini Penne Rigate", "brand": "Barilla,Barilla Piccolini", "priceUnit": "0.74", "priceMass": "1.50 €/KG", "ingredients": ["semoule-de-ble-dur", "eau", "peut-contenir-des-traces-de-soja"], "packaging": ["Carton", "Boîte", " produkt"], "allergens": ["en:gluten"], "nutriments": ["energy-kcal:359", "sugars_100g:3.5", "fiber_100g:3", "salt_100g:0.013", "fat_100g:2"], "nutriscore": "a", "scoreHealth": 89, "scoreEnvironment": 72, "finalScore": 68, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://images.openfoodfacts.org/images/products/807/680/952/1581/front_fr.61.400.jpg", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-186-Pâtes-Mini-Penne-Rigate.aspx" }],
[{ "id": "348", "name": "Maxi Tranches sans sucre ajouté Complet 550 GR", "brand": "Jacquet", "priceUnit": "0.75", "priceMass": "1.82 €/KG", "ingredients": ["farine-complete-de-ble", "63", "eau", "huile-de-colza", "farine-de-ble", "1", "9", "gluten-de-ble", "arome", "contient-alcool", "levure", "sel", "farine-de-mais-fermentee", "germe-de-ble", "extrait-d-acerola"], "packaging": ["plastique", "sachet", " Enveloppe"], "allergens": ["en:gluten"], "nutriments": ["energy-kcal:246", "sugars_100g:3.6", "fiber_100g:6.7", "salt_100g:1.1", "fat_100g:3.4"], "nutriscore": "a", "scoreHealth": 89, "scoreEnvironment": 57, "finalScore": 90, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd12-photos.leclercdrive.fr/image.ashx?id=1600736&use=d&cat=p&typeid=i&width=300", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-348-Maxi-Tranches-sans-sucre-ajouté-Complet-550-GR.aspx" }, { "id": "388", "name": "Tartines craquantes au froment", "brand": "Épi d'Or,Marque Repère", "priceUnit": "0.72", "priceMass": "2.64 €/KG", "ingredients": ["farine-de-ble-99", "lactoserum-en-poudre", "sucre", "huile-de-tournesol", "sel"], "packaging": ["Carton", "Sachet fraicheur", "Plastique"], "allergens": ["en:gluten,en:milk"], "nutriments": ["sugars_100g:4.5", "fiber_100g:3.9", "salt_100g:1.4", "fat_100g:3.6"], "nutriscore": "c", "scoreHealth": 63, "scoreEnvironment": 77, "finalScore": 80, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd12-photos.leclercdrive.fr/image.ashx?id=1071270&use=d&cat=p&typeid=i&width=300", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-388-Tartines-craquantes-au-froment.aspx" }, { "id": "3107", "name": "Le Véritable Petit Beurre", "brand": "LU", "priceUnit": "1.89", "priceMass": "5.33 €/KG", "ingredients": ["farine-de-ble-73", "5", "sucre", "beurre-13-6", "lait-ecreme-en-poudre-1-3", "equivalent-lait-ecreme-13", "sel", "poudre-a-lever", "carbonate-acide-de-sodium", "carbonate-acide-d-ammonium", "arome", "correcteur-d-acidite", "acide-citrique", "sucre-glace", "sucre", "amidon-de-mais"], "packaging": ["Sachets plastiques", "Carton", "sachet individuel", "fr:Film en plastique", " Snack"], "allergens": ["en:gluten,en:milk"], "nutriments": ["energy-kcal:43", "sugars_100g:23", "fiber_100g:3", "salt_100g:1.39", "fat_100g:12"], "nutriscore": "e", "scoreHealth": 33, "scoreEnvironment": 75, "finalScore": 71, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://images.openfoodfacts.org/images/products/301/776/000/0062/front_fr.73.400.jpg", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-3107-Le-Véritable-Petit-Beurre.aspx" }, { "id": "30054", "name": "Beurre doux bio 82% mg", "brand": "Bio Village,Marque Repère", "priceUnit": "1.68", "priceMass": "6.52 €/KG", "ingredients": ["creme-pasteurisee", "ferments-lactiques", "dont-lait"], "packaging": ["Frais", "Papier", "plaquette"], "allergens": ["en:milk"], "nutriments": ["sugars_100g:0.9", "salt_100g:0.1", "fat_100g:82"], "nutriscore": "e", "scoreHealth": 23, "scoreEnvironment": 64, "finalScore": 65, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd12-photos.leclercdrive.fr/image.ashx?id=749668&use=d&cat=p&typeid=i&width=300", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-30054-Beurre-doux-bio-82%-mg.aspx" }],
[{ "id": "51342", "name": "Gros oeufs frais Première Fraîcheur", "brand": "Lustucru,Lustucru sélection,Sélection Lustucru", "priceUnit": "1.78", "priceMass": "0.15 €/P", "ingredients": ["oeufs"], "packaging": ["carton"], "allergens": ["en:eggs"], "nutriments": ["energy-kcal:145", "sugars_100g:0.7", "salt_100g:0.32", "fat_100g:10"], "nutriscore": "a", "scoreHealth": 88, "scoreEnvironment": 72, "finalScore": 93, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://images.openfoodfacts.org/images/products/376/015/011/1342/front_fr.18.400.jpg", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-51342-Gros-oeufs-frais-Première-Fraîcheur.aspx" }, { "id": "25093", "name": "Yaourt fruit jaunes", "brand": "Délisse,Marque Repère", "priceUnit": "1.76", "priceMass": "1.87 €/KG", "ingredients": ["lait-entier", "origine-france-72", "fruits", "morceaux-et-puree", "peche-11", "3-ou-abricot-11", "1-ou-poire-11-ou-ananas-10", "6", "sucre-10", "4", "teneur-moyenne", "lait-ecreme-en-poudre", "origine-france", "amidon-modifie-de-mais", "aromes-naturels", "concentre-de-carotte", "concentre-de-citrouille", "jus-de-carotte-concentre", "jus-de-potiron-concentre", "epaississant", "pectines", "jus-de-citron-concentre", "ferments-lactiques"], "packaging": ["plastique", "Carton", "pots"], "allergens": ["en:milk"], "nutriments": ["sugars_100g:15", "salt_100g:0.1", "fat_100g:2.7"], "nutriscore": "c", "scoreHealth": 61, "scoreEnvironment": 76, "finalScore": 91, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd12-photos.leclercdrive.fr/image.ashx?id=1875667&use=d&cat=p&typeid=i&width=300", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-25093-Yaourt-fruit-jaunes.aspx" }, { "id": "5612", "name": "Cristaline Eau de source", "brand": "Cristaline", "priceUnit": "0.78", "priceMass": "0.11 €/L", "ingredients": ["eau-de-source"], "packaging": ["Bouteille", "plastique", "bouteille-plastique"], "allergens": [""], "nutriments": ["fat_100g:4"], "nutriscore": "a", "scoreHealth": 89, "scoreEnvironment": 50, "finalScore": 84, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://images.openfoodfacts.org/images/products/325/438/000/3756/front_fr.20.400.jpg", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-5612-Cristaline-Eau-de-source.aspx" }, { "id": "19300", "name": "Chips vitelotte", "brand": "Pom'Lisse,Marque Repère", "priceUnit": "1.67", "priceMass": "17.60 €/KG", "ingredients": ["pomme-de-terre-vitelotte", "huile-de-tournesol-36", "sel"], "packaging": ["sachet", "plastique"], "allergens": [""], "nutriments": ["sugars_100g:2", "fiber_100g:4.2", "salt_100g:1.3", "fat_100g:36"], "nutriscore": "c", "scoreHealth": 57, "scoreEnvironment": 57, "finalScore": 34, "packagingQuantity": null, "itemQuantity": 1, "photo": "https://fd12-photos.leclercdrive.fr/image.ashx?id=752730&use=d&cat=p&typeid=i&width=300", "url": "https://fd12-courses.leclercdrive.fr/magasin-056701-e.leclerc-drive-erstein/fiche-produits-19300-Chips-vitelotte.aspx" }]]


const RemoveFromSessionStorage = (product: Product, basket: Product[], setBasket: any) => {
    let newBasket: Product[] = [];

    basket.map((item) => {
        if (item.id === product.id) {
            let tmpItem = Object.assign({}, item);
            if (tmpItem.itemQuantity != null || tmpItem.itemQuantity != undefined) {
                tmpItem.itemQuantity -= 1;
                if (tmpItem.itemQuantity > 0) {
                    newBasket.push(tmpItem);
                }
            }
        } else {
            newBasket.push(item);
        }
    });
    sessionStorage.setItem('currentCart', JSON.stringify(newBasket));
    setBasket(newBasket);

};

const AddToSessionStorage = (product: Product, basket: Product[], setBasket: any) => {
    let newBasket: Product[] = [];
    let modifiedItsQuantity = false;

    basket.map((item) => {
        if (product.id === item.id) {
            let tmpItem = Object.assign({}, item);
            if (tmpItem.itemQuantity != null || tmpItem.itemQuantity != undefined) {
                tmpItem.itemQuantity += 1;
                newBasket.push(tmpItem);
                modifiedItsQuantity = true;
            } else {
                console.error("The item has no item.itemQuantity");
            }
        } else {
            newBasket.push(item);
        }
    });
    if (!modifiedItsQuantity)
        newBasket.push(product);
    sessionStorage.setItem('currentCart', JSON.stringify(newBasket));
    setBasket(newBasket);
};

const DiscountsPage = () => {

    const [t, i18n] = useTranslation();
    const [theme, SetTheme] = useDarkMode();
    const { data, loading } = useAccountQuery();

    const tmpTheme: string = theme.toString();
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('lng') == null)
            localStorage.setItem('lng', 'fr');
        useEffect(() => {
            i18n.changeLanguage(localStorage.getItem('lng') as string).then()
        }, []);
    }

    const [basket, setBasket] = useState<Product[]>([]);
    const [isAnyItem, setIsAnyItem] = useState<boolean>(false);
    const [filterText, setFilterText] = useState<string>("");

    if (basket.length != 0 && !isAnyItem) {
        setIsAnyItem(true);
    }

    useEffect(() => {
        if (window != null) {
            // let tmpBasket: Product[] = [];

            if (sessionStorage.getItem('currentCart')) {
                let jsonString: any = sessionStorage.getItem('currentCart');
                let currentCart: any = JSON.parse(jsonString);
                // tmpBasket = currentCart;
                setBasket(currentCart);
            }
        }
    }, []);

    let discountArrayFiltered: Product[] = [];
    if (data !== undefined)
        discountArrayFiltered = shopDiscouts[data.account.currentShop.id - 1].filter((item) => item.name.toLowerCase().includes(filterText))
    return (
        <DarkModeParent theme={tmpTheme}>
            <Header  {...{ theme, SetTheme }} />
            <Grid container justifyContent='flex-end' style={{ position: 'fixed', top: '90px', left: '0px', width: 'auto' }}>
                <Grid item style={{ position: 'relative', justifyContent: 'flex-end' }}>
                    <Button style={{ marginLeft: '20px' }} variant={"outlined"} color='secondary' href='/shop'>
                        <Typography
                            variant='caption'>{t("label.discount.return")}
                        </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Grid container justifyContent={"center"} style={{ marginTop: "40px" }}>
                <Grid item xs={4}>
                    <TextField onChange={(e) => setFilterText(e.target.value)} fullWidth value={filterText} id="standard-basic" label={t("label.searchBar")} color="secondary" />
                </Grid>
            </Grid>
            {!loading && data !== undefined ?
                <DiscountList discountsArray={discountArrayFiltered} basket={basket} Add={AddToSessionStorage} Remove={RemoveFromSessionStorage} setBasket={setBasket} /> : <></>
            }
            <Footer />
        </DarkModeParent >
    );
}

export default DiscountsPage;
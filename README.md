# Soto - Epitech Innovative Project

Available on <https://soto.app>

## How to use

Install it and run:

```bash
yarn
yarn dev
```

The frontend will be on : http://localhost:3000
And the backend on : http://localhost:3000/api/graphql



Critères :      - Faible valeur nutiritonelle // product.nutriments.energy-kcal
                - Haut en protéines // product.nutriments.proteins
Obligation :    - Sans lactose // product.allergens_tags en:milk fr:lait

- Ajouter les champs en DB
- Ajouter les champs en schema
- Ajouter les nouveaux champs aux resolvers
- Ajouter les nouveaux champs a Obligations.ts et Criterions.ts
- Creér LowCaloriesScorer et HighProteinScorer dans scoring
- Créer NoLactose dans scoring
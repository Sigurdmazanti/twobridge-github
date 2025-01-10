## OBS
- Der kan ikke sendes requests til DynamicWeb og Umbraco's endpoint uden en specifik VPN forbindelse. Derfor kan der kun testes på Shopify endpoints.

## Installationsguide
Node.js skal være installeret.
1. Clone repository
2. Naviger til projektet i terminalen
3. Kør kommandoen `npm i`
4. I roden af projektet, find `.env`
5. API-key kan findes i `env.txt` i ZIP-filen på Wiseflow. Indsæt API-key'en her:
`SHOPIFY_PUBLIC_KEY=key`
6. Kør kommandoen `npm run build`
7. Kør kommandoen `npm run start` eller `npm run start:prod` 
8. Find package.json-filen og kig efter andre `npm` scripts, du ønsker at køre.
9. Applikationen kører som default i port 3333, men kan ændres i `main.ts`

## Cloudløsning
Kan findes på https://twobridge-4a3147f34e5d.herokuapp.com/

For API-dokumentation: https://twobridge-4a3147f34e5d.herokuapp.com/api-docs

## User login til testing
Kan findes i `env.txt`.

Bemærk, at der ikke kan sendes login-requests til Shopify på den hosted løsning, da det er en server-side request.

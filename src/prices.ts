const apiKey = process.env["COINGECKO_API_KEY"];
console.log("API key loaded:", Boolean(apiKey));
import { coinIds } from "./pairs"; 

export async function getPrice(pair: string) { 
  //// Look up the CoinGecko ID for this pair, then use it in the API URL 
  const coin = coinIds[pair]; 
  
  try { 
    const res = await fetch( //go to the url, ask cg for the price
      `https://api.coingecko.com/api/v3/simple/price?vs_currencies=usd&ids=${coin}&x_cg_demo_api_key=${apiKey}`
    );

    const data = await res.json(); //await bc data inside body from cg 
    return data[coin].usd as number;
    //console.log(pair, data[coin].usd); //scopes inside to the usd value tiself.
    

  } catch (err) { 
    console.log("Price API error:", err); 
  } 
}

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, 'Environment.env') });
import App_Server from "./API/MovieServer.js";
import mongodb from "mongodb";
import ReviewsDAO from "./API/dao/ReviewsDAO.js";

const Mongoclient = mongodb.MongoClient;
const DatabaseUsername=process.env['Mongo_Username'];
const DatabasePassword=process.env['Mongo_Password'];
const uri = `mongodb://${DatabaseUsername}:${DatabasePassword}@ac-ddhqipe-shard-00-00.lmgfjuy.mongodb.net:27017,ac-ddhqipe-shard-00-01.lmgfjuy.mongodb.net:27017,ac-ddhqipe-shard-00-02.lmgfjuy.mongodb.net:27017/?ssl=true&replicaSet=atlas-10jyc2-shard-0&authSource=admin&appName=Cluster0`
const PortNo=process.env['PortNo'] || 8000;

console.log(`Attempting connection with username: ${DatabaseUsername}`);

Mongoclient.connect(
    uri,
    {
        maxPoolSize: 1000
    }
).catch(
    err=>{
        console.error("Error connecting to MongoDB!", err);
        process.exit(5);
    }
).then(
    async client=>{
      await ReviewsDAO.injectDB(client);  
    App_Server.listen(PortNo,()=>{console.log(`listening on port ${PortNo}`)});
})

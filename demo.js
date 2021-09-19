require("dotenv").config()
const { MongoClient } = require('mongodb')
async function main() {
    //create const for uri put the cluster link here
    const uri = process.env.MONGO_URI
        //create a mongo client using the uri

    const client = new MongoClient(uri);
    //connect the client to the database
    console.log(client)
    try {
        await client.connect(); //=> return promise need to put this first to connect to the MongoClient
        //call the print database list function

        //ANCHOR invoke functions below this line

        // await findOneListingByName(client, 'Infinite Views')
        // await creatingMultipleListing(client, [{
        //         name: " Love3",
        //         summary: " New charming loft in Paris",
        //         bedroom: 1,
        //         bathroom: 1
        //     }, {
        //         name: " Love2",
        //         summary: " New charming loft in Paris",
        //         bedroom: 1,
        //         bathroom: 1
        //     }])
        // await listDatabases(client)
        //create new listing functions
        await deleteListingByLastScraped(client, new Date("2019-02-15"))
        await updateAll(client)
        await upsertListingByName(client, " Love5", { bedrooms: 5, beds: 3 })
            //await ListingwithBedroomAndBathRoom(client, { minimumNumberOfBedrooms: 3, minimumNumberOfBathRooms: 3, maximumNumberOfResults: 10 });
            // await createListing(client, {
            //     name: " Love1",
            //     summary: " New charming loft in Paris",
            //     bedroom: 1,
            //     bathroom: 1
            // })
    } catch (e) {
        console.error(e) //print out error message
    } finally { //clost the connection with the cluster
        await client.close();
    }
}





//ANCHOR run the code
main().catch(console.error);
// update lot of documents
async function updateAll(client) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateMany({ property_type: { $exists: false } }, { $set: { property_type: "Unknown" } })
    console.log(`${result.matchedCount} document(s) matched the query criteria`)
    console.log(`${result.modifiedCount} documents were modified`)
}

//ANCHOR Delete collections
async function deleteListingByName(client, nameOfListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteOne({ name: nameOfListing });
    console.log(result.deletedCount)
}

//ANCHOR Delete collections
async function deleteListingByLastScraped(client, date) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").deleteMany({ "last_scraped": { $lte: date } });
    console.log(result.deletedCount)
}
//ANCHOR updating with criteria
async function ListingwithBedroomAndBathRoom(client, {
    minimumNumberOfBedrooms = 0,
    minimumNumberOfBathRooms = 0,
    maximumNumberOfResults = Number.MAX_SAFE_INTEGER,
} = {}) {
    const cursor = client.db("sample_airbnb").collection("listingsAndReviews").find({
        bedrooms: { $gte: minimumNumberOfBedrooms },
        bathrooms: { $lte: minimumNumberOfBathRooms }
    }).sort({ last_review: -1 }).limit(maximumNumberOfResults);
    const result = await cursor.toArray();

    result.forEach((result, i) => {
        date = new Date(result.last_review).toDateString();
        console.log(result.name)
        console.log(result._id)
        console.log(result.bathrooms)
        console.log(result.bedrooms)
    })

}
//finding document
async function findOneListingByName(client, Listing) {
    const result = client.db("sample_airbnb").collection("listingsAndReviews").findOne({ name: Listing });
    if (result) {
        console.log(`Found a listing in collection with the name '${Listing}'`)
    } else {
        console.log(`No listing found with the name '${Listing}'`)
    }

}
//ANCHOR Update operator
async function updateListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing });
    console.log(`${result.matchedCount} document(s) matched the query criteria`)
    console.log(`${result.modifiedCount} documents were modified`)
}

async function upsertListingByName(client, nameOfListing, updatedListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").updateOne({ name: nameOfListing }, { $set: updatedListing }, { upsert: true });
    console.log(`${result.matchedCount} document(s) matched the query criteria`)
    console.log(`${result.modifiedCount} documents were modified`)
    console.log(`${result.upsertedCount} documents were inserted`)
}
//ANCHOR creating multiple entry to a particular collection
async function creatingMultipleListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertMany(newListing);
    console.log(`${result.insertedCount} new listings created with the following id(s):`)
    console.log(result.insertedIds) //fint out the inserted ID
}

//ANCHOR creating/Edit new entry to a particular collection of sample_airbnb database and print the generated id
async function createListing(client, newListing) {
    const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}

//ANCHORaccess database list and print out the available databases
async function listDatabases(client) {
    const databaseList = await client.db().admin().listDatabases(); // putting database list in a const
    //print out the database to check
    console.log("Databases:");
    databaseList.databases.forEach(db => {
        console.log(`-${db.name}`)
    });

}
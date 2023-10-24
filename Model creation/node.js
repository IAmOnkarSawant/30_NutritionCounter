const csvtojson = require('csvtojson');
const { MongoClient } = require('mongodb');

async function main() {
  // MongoDB connection URL
  const mongoURL = 'mongodb://127.0.0.1:27017'; // Replace with your MongoDB connection URL
  const client = new MongoClient(mongoURL);

  try {
    await client.connect();

    const database = client.db('your_database_name'); // Replace with your database name
    const collection = database.collection('your_collection_name'); // Replace with your collection name

    // CSV to JSON conversion
    const csvFilePath = 'nutrition.csv'; // Replace with the path to your CSV file
    const jsonArray = await csvtojson().fromFile(csvFilePath);

    // Insert each JSON document into MongoDB
    for (const document of jsonArray) {
      await collection.insertOne(document);
    }

    console.log('Data inserted into MongoDB successfully!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    client.close();
  }
}

main();

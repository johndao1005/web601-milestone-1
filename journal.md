# Milestone 1 Backend

The database choice for the project is MongoDB.


## Connect MongoDB and running on port

To start the server, run the following command on terminal `npm install`:

```bash
npm install
npm run start
```

The details of Port and database could be found in the `.env` file at root folder

## CRUD demonstrate

In `dataSeeder.js`, Connect MongoDB database of choice with `connectDB()` which run the `db.js` file in config folder to connect to MongoDB database and import data of products, users as well as product and user schema

Run `node dataSeeder.js` to view the process.

### Create

using `users.insertMany()` and pass in the users data sample to upload the data to MongoDB database

### READ

using `products.find()` to get all the products data from Mongo then display the them in console

### UPDATE

using `users.updateOne({filter},{new details},{using upsert = > insert and update})` update one document with fit the filter then change its property

### DELETE

using `users.deleteMany()` without any filter to remove all the documents from the collection

## Reference

reference resource from [YouTube tutorial](https://www.youtube.com/watch?v=0divhP3pEsg&t=3156s)

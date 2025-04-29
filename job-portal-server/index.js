const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { ObjectId } = require("mongodb");

const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Needed to parse form-data (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@atlascluster.sztfigr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Jobs Related Api's
    const jobsCollection = client.db("jobPortal").collection("jobs");
    const jobApplicationCollection = client
      .db("jobPortal")
      .collection("job-applications");

    // Get All Jobs
    app.get("/jobs", async (req, res) => {
      const cursor = jobsCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Each Job Details
    app.get("/jobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });

    // My applied job
    app.get("/myjobs", async (req, res) => {
      const email = req.query.email;
      // console.log(email);
      const query = { applicant_email: email };
      const result = await jobApplicationCollection.find(query).toArray();

      // Aggregation Pipeline(low efficiency)
      for (const application of result) {
        // console.log(application.job_id);
        const queryForJobDetails = { _id: new ObjectId(application.job_id) };
        const job = await jobsCollection.findOne(queryForJobDetails);
        if (job) {
          application.title = job.title;
          application.company = job.company;
          application.location = job.location;

          application.company_logo = job.company_logo;
        }
      }

      res.send(result);
    });

    // Extracting Job details from Jobs database on an applicant side(extract home info by foreign key)
    app.get("/myjobs-details", async (req, res) => {});

    // Apply to a Job
    app.post("/job-applications", async (req, res) => {
      const application = req.body;
      console.log(req.body);
      const result = await jobApplicationCollection.insertOne(application);
      res.send(result);
    });

    // Delete a applied job from My applications page
    app.delete("/myjobs/:id", async (req, res) => {
      const application_id = req.params.id;
      // console.log(application_id);
      const query = { _id: new ObjectId(application_id) };
      const result = await jobApplicationCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("I'll carry off the job In Shaa Allah");
});

app.listen(port, () => {
  console.log(`Server in running ${port}`);
});

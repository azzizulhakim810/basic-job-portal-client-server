const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const { MongoClient, ServerApiVersion } = require("mongodb");

const app = express();
const port = process.env.PORT || 5000;

// Needed to parse form-data (x-www-form-urlencoded)
app.use(express.urlencoded({ extended: true }));

// middleware
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
  console.log("From the logger");
  next();
};

// Verify the token
const verifyToken = (req, res, next) => {
  console.log("Inside the Verify Token");
  console.log(req.cookies);

  const token = req?.cookies?.token;

  if (!token) {
    return res.status(401).send({ message: "Unauthorized Access" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unathorized Access" });
    }

    req.user = decoded;
    next();
  });
};

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

    // Auth Related Api's
    app.post("/jwt", async (req, res) => {
      const user = req.body;
      console.log("Token Email: ", user);

      // Generating JWT Token
      const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "5h",
      });
      console.log("Token Creation: ", token);

      res
        .cookie("token", token, {
          httpOnly: true,
          secure: false, // as we don't have https
        })
        .send({ success: true });
    });

    app.post("/logout", (req, res) => {
      res
        .clearCookie("token", {
          httpOnly: true,
          secure: false,
        })
        .send({ success: true });
    });

    // Jobs Related Api's
    const jobsCollection = client.db("jobPortal").collection("jobs");
    const jobApplicationCollection = client
      .db("jobPortal")
      .collection("job-applications");

    // Get All Jobs (Everyone)
    app.get("/jobs", logger, async (req, res) => {
      console.log("Back in the Jobs");
      // My Posted Jobs Part
      const email = req.query.email;
      // console.log("Cookies", req.cookies);
      let query = {};
      if (email) {
        query = { hr_email: email };
      }

      const cursor = jobsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });

    // Each Job Details (Everyone)
    app.get("/jobs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await jobsCollection.findOne(query);
      res.send(result);
    });

    // My applied job (User)
    app.get("/myjobs", verifyToken, async (req, res) => {
      const email = req.query.email;
      console.log("Back to the My Applied Jobs");

      const query = { applicant_email: email };
      // console.log("Cookies", req.cookies);
      console.log(req.user.email);

      // Checking token email to client request email
      if (req.user.email !== req.query.email) {
        return res.status(403).send({ message: "Forbidden Access" });
      }

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

    // See all the applications applied to my posted job (Admin)
    app.get("/viewApplicationsAdmin/:job_id", async (req, res) => {
      const jobId = req.params.job_id;
      // console.log(id);
      const query = { job_id: jobId };
      const result = await jobApplicationCollection.find(query).toArray();
      res.send(result);
    });

    // Apply to a Job (User)
    app.post("/job-applications", async (req, res) => {
      const application = req.body;
      // console.log(application);
      const result = await jobApplicationCollection.insertOne(application);

      // Not the best way (use aggregate)
      const id = application.job_id;
      const query = { _id: new ObjectId(id) };
      const findTheJob = await jobsCollection.findOne(query);
      // console.log(findTheJob);
      let newCount = 0;

      if (findTheJob.applicationCount) {
        newCount = findTheJob.applicationCount + 1;
      } else {
        newCount = 1;
      }

      // Now update the job info
      const filter = { _id: new ObjectId(id) };

      const upadatedDoc = {
        $set: {
          applicationCount: newCount,
        },
      };

      const updatedResult = await jobsCollection.updateOne(filter, upadatedDoc);

      res.send(result);
    });

    // Add a Job (Admin)
    app.post("/addJob", async (req, res) => {
      const newJob = req.body;
      // console.log(newJob);

      const result = await jobsCollection.insertOne(newJob);
      res.send(result);
    });

    // Update applicaiton status from admin all applications dashboard (Admin)
    app.patch("/job-application/:id", async (req, res) => {
      const applicant_id = req.params.id;
      const data = req.body;
      console.log(applicant_id, data);

      const filter = { _id: new ObjectId(applicant_id) };

      const options = { upsert: true };

      const updatedDoc = {
        $set: {
          status: data.status,
        },
      };

      const result = await jobApplicationCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // Delete a applied job from My applications page (User)
    app.delete("/myjobs/:id", async (req, res) => {
      const application_id = req.params.id;
      // console.log(application_id);
      const query = { _id: new ObjectId(application_id) };
      const result = await jobApplicationCollection.deleteOne(query);
      res.send(result);
    });

    // Delete a applied job from view applications page (Admin)
    app.delete("/deleteApplication/:application_id", async (req, res) => {
      const applicationId = req.params.application_id;
      // console.log(applicationId);
      const query = { _id: new ObjectId(applicationId) };
      const result = await jobApplicationCollection.deleteOne(query);
      res.send(result);
    });

    // Delete a posted job from My posted job page (Admin)
    app.delete("/myPostedJobs/:id", async (req, res) => {
      const application_id = req.params.id;
      // console.log(application_id);
      const query = { _id: new ObjectId(application_id) };
      const result = await jobsCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("I'll carry off my dream job In Shaa Allah");
});

app.listen(port, () => {
  console.log(`Server in running ${port}`);
});

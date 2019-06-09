const express = require("express");
const compression = require("compression");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
const uri = "mongodb://127.0.0.1:27017/test?retryWrites=true";
const app = express();
const port = process.env.PORT || 3050;
const MAXHISTORY = 31;

let mongodb;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(compression());

console.log("Connecting to Database...");
MongoClient.connect(
  uri,
  {
    poolSize: 10
  },
  (err, db) => {
    assert.equal(null, err);
    console.log("Successfully connected to Database...");
    mongodb = db;
  }
);

// routes will go here
app.post("/", function(req, res) {
  const collection = mongodb.db("test").collection("solar");
  let record = req.body;

  if (req.body.Date) {
    record.Date = new Date(req.body.Date);
  } else {
    record.Date = new Date();
  }
  // perform actions on the collection object
  collection.insertOne(record, (err, response) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      let responseToSend = {};
      responseToSend.insertedCount = response.insertedCount;
      responseToSend.insertedId = response.insertedId;
      console.log(responseToSend);
      res.setHeader("Content-Type", "application/json");
      res.send(responseToSend);
    }
  });
});

app.get("/", (req, res) => {
  res.sendFile("/usr/local/solar/client/src/index.html");
});

app.get("/lan", (req, res) => {
  res.sendFile("/usr/local/solar/client/src/lan.html");
});

app.get("/api/stats/soc/:daysHistory", (req, res) => {
  const dbName = "test";
  const db = mongodb.db(dbName);
  const daysHistory = parseInt(req.params.daysHistory);
  if (isNaN(daysHistory) || daysHistory <= 0 || daysHistory > MAXHISTORY) {
    daysHistory = 1;
  }

  querySoc(db, daysHistory, function(documents) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(documents, undefined, 2));
  });
});

app.get("/api/stats/amps/:daysHistory", (req, res) => {
  const dbName = "test";
  const db = mongodb.db(dbName);
  const daysHistory = parseInt(req.params.daysHistory);
  if (isNaN(daysHistory) || daysHistory <= 0 || daysHistory > MAXHISTORY) {
    daysHistory = 1;
  }

  queryAmps(db, daysHistory, function(documents) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(documents, undefined, 2));
  });
});

app.get("/api/stats/watts/:daysHistory", (req, res) => {
  const dbName = "test";
  const db = mongodb.db(dbName);
  const daysHistory = parseInt(req.params.daysHistory);
  if (isNaN(daysHistory) || daysHistory <= 0 || daysHistory > MAXHISTORY) {
    daysHistory = 1;
  }

  queryWatts(db, daysHistory, function(documents) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(documents, undefined, 2));
  });
});

app.get("/api/stats/batteryvolts/:daysHistory", (req, res) => {
  const dbName = "test";
  const db = mongodb.db(dbName);
  const daysHistory = parseInt(req.params.daysHistory);
  if (isNaN(daysHistory) || daysHistory <= 0 || daysHistory > MAXHISTORY) {
    daysHistory = 1;
  }
  queryBatteryVolts(db, daysHistory, function(documents) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(documents, undefined, 2));
  });
});

app.get("/api/stats/solarwatts/:daysHistory", (req, res) => {
  const dbName = "test";
  const db = mongodb.db(dbName);
  const daysHistory = parseInt(req.params.daysHistory);
  if (isNaN(daysHistory) || daysHistory <= 0 || daysHistory > MAXHISTORY) {
    daysHistory = 1;
  }

  querySolarWatts(db, daysHistory, function(documents) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(documents, undefined, 2));
  });
});

app.get("/api/stats/outback_pv_volts/:daysHistory", (req, res) => {
  const dbName = "test";
  const db = mongodb.db(dbName);
  const daysHistory = parseInt(req.params.daysHistory);
  if (isNaN(daysHistory) || daysHistory <= 0 || daysHistory > MAXHISTORY) {
    daysHistory = 1;
  }

  queryOutback_pv_volts(db, daysHistory, function(documents) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(documents, undefined, 2));
  });
});

app.get("/api/stats/INV_adc/:daysHistory", (req, res) => {
  const dbName = "test";
  const db = mongodb.db(dbName);
  const daysHistory = parseInt(req.params.daysHistory);
  if (isNaN(daysHistory) || daysHistory <= 0 || daysHistory > MAXHISTORY) {
    daysHistory = 1;
  }

  queryINV_adc(db, daysHistory, function(documents) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(documents, undefined, 2));
  });
});

app.get("/api/gauges/soc/:daysHistory", (req, res) => {
  const dbName = "test";
  const db = mongodb.db(dbName);
  const daysHistory = parseInt(req.params.daysHistory);
  if (isNaN(daysHistory) || daysHistory <= 0 || daysHistory > MAXHISTORY) {
    daysHistory = 1;
  }

  querySoCGauge(db, daysHistory, function(documents) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(documents, undefined, 2));
  });
});

app.get("/api/gauges/amps/:daysHistory", (req, res) => {
  const dbName = "test";
  const db = mongodb.db(dbName);
  const daysHistory = parseInt(req.params.daysHistory);
  if (isNaN(daysHistory) || daysHistory <= 0 || daysHistory > MAXHISTORY) {
    daysHistory = 1;
  }

  queryAmpsGauge(db, daysHistory, function(documents) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(documents, undefined, 2));
  });
});

app.get("/api/gauges/watts/:daysHistory", (req, res) => {
  const dbName = "test";
  const db = mongodb.db(dbName);
  const daysHistory = parseInt(req.params.daysHistory);
  if (isNaN(daysHistory) || daysHistory <= 0 || daysHistory > MAXHISTORY) {
    daysHistory = 1;
  }

  queryWattsGauge(db, daysHistory, function(documents) {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(JSON.stringify(documents, undefined, 2));
  });
});

// start the server
app.listen(port, "0.0.0.0");
console.log("Server started! At http://localhost:" + port);

function querySoc(db, daysHistory, callback) {
  const collection = db.collection("solar");
  collection.aggregate(
    [
      {
        $match: {
          Date: {
            $gte: new Date(
              new Date().setTime(
                new Date().getTime() - daysHistory * 24 * 60 * 60 * 1000
              )
            )
          }
        }
      },
      {
        $project: {
          _id: 0,
          x: { $subtract: ["$Date", new Date(0)] },
          y: "$BMK_soc"
        }
      },
      { $sort: { x: 1 } }
    ],
    function(err, cursor) {
      assert.equal(err, null);

      cursor.toArray(function(err, documents) {
        callback(documents);
      });
    }
  );
}

function queryAmps(db, daysHistory, callback) {
  const collection = db.collection("solar");
  collection.aggregate(
    [
      {
        $match: {
          Date: {
            $gte: new Date(
              new Date().setTime(
                new Date().getTime() - daysHistory * 24 * 60 * 60 * 1000
              )
            )
          }
        }
      },
      {
        $project: {
          _id: 0,
          x: { $subtract: ["$Date", new Date(0)] },
          y: "$BMK_amph"
        }
      },
      { $sort: { x: 1 } }
    ],
    function(err, cursor) {
      assert.equal(err, null);

      cursor.toArray(function(err, documents) {
        callback(documents);
      });
    }
  );
}

function queryOutback_pv_volts(db, daysHistory, callback) {
  const collection = db.collection("solar");
  collection.aggregate(
    [
      {
        $match: {
          Date: {
            $gte: new Date(
              new Date().setTime(
                new Date().getTime() - daysHistory * 24 * 60 * 60 * 1000
              )
            )
          }
        }
      },
      {
        $project: {
          _id: 0,
          x: { $subtract: ["$Date", new Date(0)] },
          PV_Volts: "$outback_pv_voltage",
          PV_Current: "$outback_pv_current",
          Solar_Charger_Status: "$outback_status",
          y: "$outback_pv_voltage"
        }
      },
      { $sort: { x: 1 } }
    ],
    function(err, cursor) {
      assert.equal(err, null);

      cursor.toArray(function(err, documents) {
        callback(documents);
      });
    }
  );
}

function queryINV_adc(db, daysHistory, callback) {
  const collection = db.collection("solar");
  collection.aggregate(
    [
      {
        $match: {
          Date: {
            $gte: new Date(
              new Date().setTime(
                new Date().getTime() - daysHistory * 24 * 60 * 60 * 1000
              )
            )
          }
        }
      },
      {
        $project: {
          _id: 0,
          x: { $subtract: ["$Date", new Date(0)] },
          INV_adc: "$INV_adc",
          PV_Current: "$outback_pv_current",
          y: "$INV_adc"
        }
      },
      { $sort: { x: 1 } }
    ],
    function(err, cursor) {
      assert.equal(err, null);

      cursor.toArray(function(err, documents) {
        callback(documents);
      });
    }
  );
}

function queryWatts(db, daysHistory, callback) {
  const collection = db.collection("solar");
  collection.aggregate(
    [
      {
        $match: {
          Date: {
            $gte: new Date(
              new Date().setTime(
                new Date().getTime() - daysHistory * 24 * 60 * 60 * 1000
              )
            )
          }
        }
      },
      {
        $project: {
          _id: 0,
          x: { $subtract: ["$Date", new Date(0)] },
          Volts: "$BMK_vdc",
          Amps: "$BMK_adc",
          Solar_Charger_Status: "$outback_status",
          SolarWatts: {
            $multiply: ["$outback_pv_voltage", "$outback_pv_current"]
          },
          y: {
            $multiply: ["$BMK_vdc", "$BMK_adc"]
          }
        }
      },
      { $sort: { x: 1 } }
    ],
    function(err, cursor) {
      assert.equal(err, null);

      cursor.toArray(function(err, documents) {
        callback(documents);
      });
    }
  );
}

function queryBatteryVolts(db, daysHistory, callback) {
  const collection = db.collection("solar");
  collection.aggregate(
    [
      {
        $match: {
          Date: {
            $gte: new Date(
              new Date().setTime(
                new Date().getTime() - daysHistory * 24 * 60 * 60 * 1000
              )
            )
          }
        }
      },
      {
        $project: {
          _id: 0,
          x: { $subtract: ["$Date", new Date(0)] },
          Volts: "$BMK_vdc",
          Amps: "$BMK_adc",
          Solar_Charger_Status: "$outback_status",
          SolarWatts: {
            $multiply: ["$outback_pv_voltage", "$outback_pv_current"]
          },
          y: "$BMK_vdc"
        }
      },
      { $sort: { x: 1 } }
    ],
    function(err, cursor) {
      assert.equal(err, null);

      cursor.toArray(function(err, documents) {
        callback(documents);
      });
    }
  );
}

function querySolarWatts(db, daysHistory, callback) {
  const collection = db.collection("solar");
  collection.aggregate(
    [
      {
        $match: {
          Date: {
            $gte: new Date(
              new Date().setTime(
                new Date().getTime() - daysHistory * 24 * 60 * 60 * 1000
              )
            )
          }
        }
      },
      {
        $project: {
          _id: 0,
          x: { $subtract: ["$Date", new Date(0)] },
          Volts: "$outback_pv_voltage",
          Amps: "$outback_pv_current",
          Solar_Charger_Status: "$outback_status",
          SolarWatts: {
            $multiply: ["$outback_pv_voltage", "$outback_pv_current"]
          },
          y: {
            $multiply: ["$outback_pv_voltage", "$outback_pv_current"]
          }
        }
      },
      { $sort: { x: 1 } }
    ],
    function(err, cursor) {
      assert.equal(err, null);

      cursor.toArray(function(err, documents) {
        callback(documents);
      });
    }
  );
}

function querySoCGauge(db, callback) {
  const collection = db.collection("solar");
  collection.aggregate(
    [
      {
        $match: {
          Date: {
            $gte: new Date(
              new Date().setTime(new Date().getTime() - 24 * 60 * 60 * 1000)
            )
          }
        }
      },
      {
        $group: {
          _id: null,
          //SoC
          minSoc: { $min: "$BMK_soc" },
          maxSoc: { $max: "$BMK_soc" }
        }
      }
    ],
    function(err, cursor) {
      assert.equal(err, null);

      cursor.toArray(function(err, documents) {
        let responses = [];
        let response = {};
        response.id = "SoC";
        response.ranges = [0, 50, 75, 100];
        response.markers = [];
        response.markers.push(documents[0].minSoc);
        response.markers.push(documents[0].maxSoc);
        response.measures = [];
        collection.aggregate(
          [
            { $sort: { _id: -1 } },
            { $project: { _id: null, BMK_soc: 1 } },
            { $limit: 1 }
          ],
          function(err, cursor) {
            cursor.toArray(function(err, documents) {
              response.measures.push(documents[0].BMK_soc);
              responses.push(response);
              console.log(JSON.stringify(responses));
              callback(responses);
            });
          }
        );
      });
    }
  );
}

function queryAmpsGauge(db, callback) {
  const collection = db.collection("solar");
  collection.aggregate(
    [
      {
        $match: {
          Date: {
            $gte: new Date(
              new Date().setTime(new Date().getTime() - 24 * 60 * 60 * 1000)
            )
          }
        }
      },
      {
        $group: {
          _id: null,
          //Amph
          minAmph: { $min: "$BMK_amph" },
          maxAmph: { $max: "$BMK_amph" }
        }
      }
    ],
    function(err, cursor) {
      assert.equal(err, null);

      cursor.toArray(function(err, documents) {
        let responses = [];
        let response = {};
        response.id = "AmpH";
        response.markers = {};
        response.markers.minMarker = documents[0].minAmph;
        response.markers.maxMarker = documents[0].maxAmph;
        collection.aggregate(
          [
            { $sort: { _id: -1 } },
            { $project: { _id: null, BMK_amph: 1 } },
            { $limit: 1 }
          ],
          function(err, cursor) {
            cursor.toArray(function(err, documents) {
              response.value = documents[0].BMK_amph;
              responses.push(response);
              console.log(JSON.stringify(response));
              callback(response);
            });
          }
        );
      });
    }
  );
}

function queryWattsGauge(db, callback) {
  const collection = db.collection("solar");
  collection.aggregate(
    [
      {
        $match: {
          Date: {
            $gte: new Date(
              new Date().setTime(new Date().getTime() - 24 * 60 * 60 * 1000)
            )
          }
        }
      },
      {
        $group: {
          _id: null,
          //SoC
          minSoc: { $min: "$BMK_soc" },
          maxSoc: { $max: "$BMK_soc" }
        }
      }
    ],
    function(err, cursor) {
      assert.equal(err, null);

      cursor.toArray(function(err, documents) {
        let responses = [];
        let response = {};
        response.id = "SoC";
        response.ranges = [0, 50, 75, 100];
        response.markers = [];
        response.markers.push(documents[0].minSoc);
        response.markers.push(documents[0].maxSoc);
        response.measures = [];
        collection.aggregate(
          [
            { $sort: { _id: -1 } },
            { $project: { _id: null, BMK_soc: 1 } },
            { $limit: 1 }
          ],
          function(err, cursor) {
            cursor.toArray(function(err, documents) {
              response.measures.push(documents[0].BMK_soc);
              responses.push(response);
              console.log(JSON.stringify(responses));
              callback(responses);
            });
          }
        );
      });
    }
  );
}

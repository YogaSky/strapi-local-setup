/**const path = require('path');

module.exports = ({ env }) => ({
  connection: {
    client: 'sqlite',
    connection: {
      filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
    },
    useNullAsDefault: true,
  },
});

**/
const config = require("platformsh-config").config();
const path = require("path");

let dbRelationship = "mysqldatabase";

// Strapi default SQLite settings.
let connection = {
  defaultConnection: "default",
  connections: {
    default: {
      connector: "bookshelf",
      settings: {
        client: "sqlite",
        filename: path.join(
          __dirname,
          "..",
          process.env.DATABASE_FILENAME || ".tmp/data.db"
        ),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
};

if (config.isValidPlatform() && !config.inBuild()) {
  // Platform.sh database configuration.
  try {
    const credentials = config.credentials(dbRelationship);
    console.log(
      `Using Platform.sh configuration with relationship ${dbRelationship}.`
    );

    connection.connections.default = {
      connector: "bookshelf",
      settings: {
        client: "mysql",
        host: credentials.ip,
        port: credentials.port,
        database: credentials.path,
        username: credentials.username,
        password: credentials.password,
        ssl: false,
      },
      options: {
        pool: {
          min: 0,
          max: 10,
          acquireTimeoutMillis: 600000,
          createTimeoutMillis: 30000,
          idleTimeoutMillis: 20000,
          reapIntervalMillis: 20000,
          createRetryIntervalMillis: 200,
        },
      },
    };
  } catch (e) {
    // Do nothing if 'pg' relationship isn't found.
    // Database configuration will fall back on the SQLite defaults.
  }
} else {
  if (config.isValidPlatform()) {
    // Build hook configuration message.
    console.log(
      "Using default configuration during Platform.sh build hook until relationships are available."
    );
  } else {
    // Strapi default local configuration.
    console.log(
      "Not in a Platform.sh Environment. Using default local SQLite configuration."
    );
  }
}

module.exports = connection;

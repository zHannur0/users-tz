import mongoose, { Connection } from 'mongoose';

interface ConnectionType {
  isConnected?: number;
}

const connection: ConnectionType = {};

async function connect(): Promise<void> {
  if (connection.isConnected) {
    console.log('already connected');
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      console.log('use previous connection');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as mongoose.ConnectOptions);

  console.log('new connection');

  connection.isConnected = db.connections[0].readyState;
}

async function disconnect(): Promise<void> {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
    } else {
      console.log('not disconnected');
    }
  }
}

interface DocType {
  _id: string;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

function convertDocToObj(doc: any): DocType {
  doc._id = doc._id.toString();
  doc.createdAt = doc.createdAt.toString();
  doc.updatedAt = doc.updatedAt.toString();
  return doc;
}

const db = { connect, disconnect, convertDocToObj };
export default db;

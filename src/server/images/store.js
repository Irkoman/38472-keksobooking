const mongodb = require(`mongodb`);
const database = require(`../../database/database`);

class ImageStore {
  async getBucket() {
    if (this._bucket) {
      return this._bucket;
    }

    const db = await database;

    if (!this._bucket) {
      this._bucket = new mongodb.GridFSBucket(db, {
        chunkSizeBytes: 1024 * 1024,
        bucketName: `avatars`
      });
    }

    return this._bucket;
  }

  async get(filename) {
    const bucket = await this.getBucket();
    const results = await (bucket).find({filename}).toArray();
    const entity = results[0];

    return !entity ? void 0 : {
      info: entity,
      stream: bucket.openDownloadStreamByName(filename)
    };
  }

  async save(filename, stream) {
    const bucket = await this.getBucket();

    return new Promise((success, fail) => {
      stream.pipe(bucket.openUploadStream(filename))
          .on(`error`, fail)
          .on(`finish`, success);
    });
  }
}

module.exports = new ImageStore();

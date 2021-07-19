const aws = require("aws-sdk");

const s3 = new aws.S3();

aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION,
});

function remove(imgKey){
  s3.deleteObject({ Bucket: process.env.S3_BUCKET, Key: imgKey }, (err, data) => {
  console.error(err);
  console.log(data);
  })
}

module.exports = remove;

const User = require('./User');
const Submission = require('./submission');
const Comment = require('./Comment')

User.hasMany(Submission, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Submission.belongsTo(User, {
  foreignKey: 'user_id'
});

Submission.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Submission, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})


module.exports = { User, Submission, Comment };

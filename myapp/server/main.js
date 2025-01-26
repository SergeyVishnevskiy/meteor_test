import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

const Posts = new Mongo.Collection('posts');

Meteor.methods({
  // Додавання посту
  async postData(postContent) {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to post data.');
    }

    try {
      // Перевірка на дублікати
      const existingPost = await Posts.findOneAsync({ content: postContent });
      if (existingPost) {
        throw new Meteor.Error('duplicate-post', 'A post with this content already exists.');
      }

      await Posts.insertAsync({
        content: postContent,
        createdAt: new Date(),
      });

      return 'Data inserted successfully';
    } catch (error) {
      throw new Meteor.Error('insert-failed', 'Data insertion failed: ' + error.message);
    }
  },

  // Знайти дані
// Знайти дані
async findData() {
  if (!Meteor.userId()) {
    throw new Meteor.Error('not-authorized', 'You must be logged in to find data.');
  }

  try {
    const posts = Posts.find({}).fetch(); // Використовуємо стандартний find і fetch
    return posts;
  } catch (error) {
    throw new Meteor.Error('find-failed', 'Data finding failed: ' + error.message);
  }
},

  // Скинути дані
  async resetData() {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to reset data.');
    }

    try {
      await Posts.removeAsync({});
      return 'Data reset successfully';
    } catch (error) {
      throw new Meteor.Error('reset-failed', 'Data reset failed: ' + error.message);
    }
  },

  // Підрахунок даних
  async countData() {
    if (!Meteor.userId()) {
      throw new Meteor.Error('not-authorized', 'You must be logged in to count data.');
    }

    try {
      const count = await Posts.countAsync();
      return count;
    } catch (error) {
      throw new Meteor.Error('count-failed', 'Data counting failed: ' + error.message);
    }
  },
});

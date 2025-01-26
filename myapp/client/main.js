import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';
import './main.html';

Template.body.events({
  // Реєстрація даних
  'submit #postForm'(event) {
    event.preventDefault();
    const postData = event.target.postData.value;

    // Очищення виведених повідомлень
    document.getElementById('output').innerHTML = '';

    if (postData) {
      Meteor.call('postData', postData, (error, result) => {
        if (error) {
          console.error('Error:', error);
          if (error.error === 'duplicate-post') {
            document.getElementById('output').innerText = 'Error: A post with this content already exists';
          } else {
            document.getElementById('output').innerText = `Error: ${error.message}`;
          }
        } else {
          console.log('Success:', result);
          document.getElementById('output').innerText = `Success: ${result}`;
        }
      });
    } else {
      alert('Please enter some data');
    }
  },

  // Знайти дані
  'click #findBtn'(event) {
    event.preventDefault();
    Meteor.call('findData', (error, result) => {
      // Очистка попередніх повідомлень
      document.getElementById('output').innerHTML = '';

      if (error) {
        console.error('Error:', error);
        document.getElementById('output').innerText = `Error: ${error.message}`;
      } else {
        console.log('Found data:', result);
        
        // Виведення кожного знайденого поста на новому рядку
        result.forEach(post => {
          const p = document.createElement('p');
          p.innerText = `ID: ${post._id}, Content: ${post.content}`;  // Виводимо ID і вміст поста
          document.getElementById('output').appendChild(p);
        });
      }
    });
  },

  // Скинути дані
  'click #resetBtn'(event) {
    event.preventDefault();
    Meteor.call('resetData', (error, result) => {
      // Очистка попередніх повідомлень
      document.getElementById('output').innerHTML = '';

      if (error) {
        console.error('Error:', error);
        document.getElementById('output').innerText = `Error: ${error.message}`;
      } else {
        console.log('Data reset:', result);
        document.getElementById('output').innerText = `Data reset: ${result}`;
      }
    });
  },

  // Логін/Логаут
  'click #logoutBtn'(event) {
    event.preventDefault();
    Meteor.logout((error) => {
      if (error) {
        console.error('Logout failed:', error);
        document.getElementById('output').innerText = `Logout failed: ${error.message}`;
      } else {
        console.log('Logged out');
        document.getElementById('output').innerText = 'Logged out';
      }
    });
  }
});

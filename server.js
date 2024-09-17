import express from 'express';
import mongoose from 'mongoose';
import path from 'path';

const app = express();
const port = 3000;

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.weppimj.mongodb.net/authBot?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB error:', err));

const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true }, 
});
const User = mongoose.model('User', userSchema);

app.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ telegramId: id });

    if (user) {
      res.sendFile(path.resolve('public', 'index.html')); 
    } else {
      res.status(404).send('404 - Пользователь не найден');
    }
  } catch (err) {
    console.error('Ошибка при поиске пользователя:', err);
    res.status(500).send('Ошибка сервера');
  }
});

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});

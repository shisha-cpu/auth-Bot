import { Telegraf } from 'telegraf';
import mongoose from 'mongoose';


mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.weppimj.mongodb.net/authBot?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('DB connected'))
  .catch((err) => console.log('DB error:', err));


const userSchema = new mongoose.Schema({
  telegramId: { type: String, unique: true }
});
const User = mongoose.model('User', userSchema);


const bot = new Telegraf('7239370521:AAFnpeXaWQCaHdBPeRUF5kQoJsdfkPej-RM');


bot.start(async (ctx) => {
    const telegramId = ctx.from.id.toString();
  
    try {
  
      let user = await User.findOne({ telegramId });
      if (!user) {
        user = new User({ telegramId });
        await user.save();
        ctx.reply('Ваш ID успешно сохранен!');
      } else {
        ctx.reply('Ваш ID уже был сохранен ранее.');
      }
      
     
      ctx.reply('Открыть Web App', {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Открыть веб-приложение',
                web_app: { url: `http://localhost:3000/user_id=${telegramId}` },
              },
            ],
          ],
        },
      });
    } catch (err) {
      console.error('Ошибка при сохранении ID:', err);
      ctx.reply('Произошла ошибка при сохранении вашего ID.');
    }
  });
  


bot.launch();

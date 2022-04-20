const colors = require('colors');

console.log(`Иниацилизация Mkupsov_Raid bot...`.blue.bold);
const { 
    TOKEN,
    CHAT_SPAM,
    GROUP_ID,
    BTN_TEXT,
    BTN_TEXT2,
    BTN_TEXT3,
    HELLO_TEXT,
    TIME
} = require("./config");

console.log(`Mkupsov_Raid bot >> Запуск...`.yellow.bold);

const { VK, Keyboard } = require("vk-io");
const vk = new VK({
    token: "79222226f8593d9202bc5d03a255b1b5d37ec16ab3f744698df762ab1c1f525b75a9644297a74e48bea23",
    apiMode: "parallel",
    pollingGroupId: 209326256
});

vk.updates.use(async (ctx, next) => {
    if (ctx.is("message") && ctx.isOutbox) {
        return;
    }

    if (ctx.isChat) {
    	console.log(`Mkupsov_Raid bot >> Новый чат попал под атаку!`.green.bold);
        setInterval(() => {
            ctx.send({
                message: randomFromArray(CHAT_SPAM),
                keyboard: Keyboard.keyboard(
                    Array(10).fill().map(() => 
                       Array(4).fill().map(() => button(randomFromArray(BTN_TEXT)))
                    )
                )
            });
        }, TIME);
    }

    return ctx.send(HELLO_TEXT);
});

vk.updates.startPolling()
.then(() => console.log(`Mkupsov_Raid bot >> Запущен!`.green.bold));
console.log(`Тестовая версия. ver 1.1`.red.bold);

const randomInt = (x, y) => y ? Math.round(Math.random() * (y - x)) + x : Math.round(Math.random() * x);
const randomFromArray = (array) => array[randomInt(array.length - 1)];
const button = (label) => {
    return Keyboard.textButton({
        label, color: Keyboard[randomFromArray(["POSITIVE_COLOR", "DEFAULT_COLOR", "PRIMARY_COLOR", "NEGATIVE_COLOR"])]
    });
}
process.on("uncaughtException", e => {
  console.log(e);
});

process.on("unhandledRejection", e => {
  console.log(e);
});

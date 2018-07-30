const Discord = module.require("discord.js");
const Jimp = require("jimp");
const fs = require("fs");
const Moment = require("moment-timezone");

module.exports.run = async (client, message, args) => {
  if (args.length >= 1) {
    Jimp.read("https://cdn.glitch.com/8e40fcc8-31eb-4977-8cfa-52bd05aa65ef%2Ftrump.png?1532351177092").then(function (image) {
      Jimp.loadFont(Jimp.FONT_SANS_32_BLACK).then(function (font) { // load font from .fnt file
          image.quality(84)                 // set JPEG quality
          image.print(font, 43, 107, args.join(" "), 601);        // print a message on an image

          let outputfile = "./output/" + Math.random().toString(36).substr(2, 5) + "tweet." + image.getExtension(); // create a random name for the output file
          image.write(outputfile, function () {
            // upload file
            message.channel.send({file: outputfile}).then(function () {
              // delete file
              fs.unlink(outputfile);
              console.log(`SUCCESS: ${message.author.username}, Message: ${args}, Created At: ${Moment(Date.now()).tz('Europe/London').format('l, LT')}`);
            });
          });        
      });         
    }).catch(function (err) {
        // handle an exception
        console.error("Error: " + err);
    });    
  } else {
    message.delete();
    await message.channel.send("Enter a message!").then(msg => msg.delete(2300));
  }
}

module.exports.help = {
    name: "tweet",
    description: "Creates a tweet by Donald Trump",
    usage: "tweet <message>",
    type: "Fun" 
}
import greet from '../useCases/greetings.useCase'
import dice from '../useCases/dice.useCase'
import sticker from '../useCases/sticker.useCase'
import stickerToImage from '../useCases/stickerToImage.useCase'
import stickerToGif from '../useCases/stickerToGif.useCase'
import getElapsedSeconds from '../useCases/ping.useCase'
import help from '../useCases/help.usecase'
import music from '../useCases/music.useCase'
import video from '../useCases/video.useCase'
import chatGPT from '../useCases/chatGPT.useCase'

export class commands {
  private comandos: { [key: string]: Function } = {}
  constructor(private data: any) {
    this.comandos = {
      greet,
      roll: dice,
      hola: greet,
      sticker: sticker,
      stiker: sticker,
      image: stickerToImage,
      imagen: stickerToImage,
      gif: stickerToGif,
      ping: getElapsedSeconds,
      help: help,
      music: music,
      video: video,
      yt: video,
      gpt:chatGPT
    }
  }

  static execute(data: any) {
    return new commands(data).getCommand()
  }

  async getCommand() {
    const command = this.data.message.command
    if (this.comandos[command]) {
      //console.log(this.data)
      const response = await this.comandos[command](
        this.data
      )
      return response
    }
  }
}

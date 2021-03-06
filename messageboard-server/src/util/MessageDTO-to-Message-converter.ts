import { Message } from "../models/message"
import { MessageDTO } from "../dto/message-dto"

export function MessageDTOtoMessageConverter(dto:MessageDTO, email:string):Message{
    return {
        messageId:dto.message_id,
        userId:dto.user_id,
        title: dto.title,
        message: dto.message,
        date: dto.date.toString(),
        email: email
    }
}
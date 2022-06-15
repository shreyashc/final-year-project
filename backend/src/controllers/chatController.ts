import { NextFunction, Request, Response } from "express";
import { dataSource } from "../server";

// import httpErrors from "http-errors";
import _ from "underscore";
import { Messages } from "../models/entities";

const getMychats = async (_req: Request, res: Response, nxt: NextFunction) => {
  try {
    const id = +res.locals.user.id;
    const role = res.locals.user.role;
    let chats;
    const queryRunner = await dataSource.createQueryRunner();

    if (role === "investor") {
      chats = await queryRunner.manager.query(
        `SELECT s."displayName", s."logoURL", m.*  FROM messages m,startup s where s."userId"=m."sUserId" and m."iUserId"=${id} order by m."updatedAt" DESC`
      );
    } else {
      chats = await queryRunner.manager.query(
        `SELECT s."displayName", s."pfpURL" as logoURL, m.*  FROM messages m,investor s where s."userId"=m."iUserId" and m."sUserId"=${id} order by m."updatedAt" DESC`
      );
    }

    return res.json(chats);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};
const addNewPchat = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const { chatId, investorUnread, startupUnread, sUserId, iUserId } =
      req.body;

    await Messages.insert({
      chatId,
      investorUnread,
      startupUnread,
      sUserId,
      iUserId,
    });
    return res.sendStatus(201);
  } catch (error) {
    return nxt(error);
  }
};

const markAsRead = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const chatid = req.body.chatid;
    const id = +res.locals.user.id;
    const role = res.locals.user.role;

    if (role === "investor") {
      await Messages.update(
        {
          chatId: chatid,
          iUserId: id,
        },
        {
          investorUnread: false,
          startupUnread: true,
        }
      );
    } else {
      await Messages.update(
        {
          chatId: chatid,
          sUserId: id,
        },
        {
          startupUnread: false,
          investorUnread: true,
        }
      );
    }

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};

export { addNewPchat, getMychats, markAsRead };


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

    console.log(role);
    

   
    if (role === "investor") {
      console.log("here");
      
      const queryRunner = await dataSource.createQueryRunner();
    chats = await queryRunner.manager.query(
        `SELECT s."displayName", s."logoURL", m.*  FROM messages m,startup s where s."userId"=m."sUserId" and m."iUserId"=${id}`
    );
    } else {
      chats = [];
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
    console.log(error);
    return nxt(error);
  }
};

export { addNewPchat,getMychats };


import { NextFunction, Request, Response } from "express";
import httpErrors from "http-errors";
import _ from "underscore";
import { Startup, Upvote } from "../models/entities";

const upvote = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const userId: number = res.locals.user.id;
    const startupId: number = +req.params.startupid;
    console.log({ userId, startupId });

    if (!userId || !startupId) throw new httpErrors.BadRequest();
    const upvote = await Upvote.findOne({ where: { userId, startupId } });
    const startup = await Startup.findOne({ where: { id: startupId } });
    if (!startup) throw new httpErrors.BadRequest();
    if (upvote && upvote.value == 0) {
      await Upvote.update(
        {
          userId,
          startupId,
        },
        { value: 1 }
      );
      await Startup.update({ id: startupId }, { upvalue: startup.upvalue + 1 });
    } else if (upvote && upvote.value == 1) {
      await Upvote.update(
        {
          userId,
          startupId,
        },
        { value: 0 }
      );
      await Startup.update({ id: startupId }, { upvalue: startup.upvalue - 1 });
    } else {
      await Upvote.insert({ userId, startupId, value: 1 });
      await Startup.update({ id: startupId }, { upvalue: startup.upvalue + 1 });
    }
    const updated = await Startup.findOne({ where: { id: startupId } });
    return res.json(updated);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};
const get_my_upvotes = async (
  _req: Request,
  res: Response,
  nxt: NextFunction
) => {
  try {
    const userId: number = res.locals.user.id;

    const upvotes = await Upvote.find({ where: { userId } });
    const ids = upvotes.map((up) => up.startupId);

    return res.json(ids);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};

export { upvote, get_my_upvotes };

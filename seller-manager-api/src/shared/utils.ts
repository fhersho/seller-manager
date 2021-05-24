const moment = require("moment");

export const SYSTEM_FORMAT = "YYYY-MM-DD";
export const PROMISE_FORMAT = "YYYY-MM-DD hh:mm:ss";
export const FORMAT_HOUR = "H";

export const getCreationDate = (): string => moment(new Date()).format(SYSTEM_FORMAT);

export const getFormat = (date: Date): string => moment(date).format(SYSTEM_FORMAT);

export const getHour = (date: Date): string => moment(date).format(FORMAT_HOUR);

export const addHour = (date: Date, hours: number): string => moment(date).add(hours, 'hours').utc().format(PROMISE_FORMAT);

export const getFormatPromiseFormat = (date: Date): string => moment(date).utc().format(PROMISE_FORMAT);

export const getBusinessOrderNumber = () => "MSE" + Math.floor(Date.now() / 1000) + Math.floor(Math.random() * 100);
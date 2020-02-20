// import { Connection } from 'mongoose';
import mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';
import { getConnection } from '../database';
import Url, { IUrl } from '../database/models/url';

const createHash = async (event: any, context: any) => {
    try {
        context.callbackWaitsForEmptyLoop = false;
        const conn: any = await getConnection();
        const UrlModel: mongoose.Model<IUrl> = Url(conn);
        const hash: string = uuid();
        const body = event.body ? JSON.parse(event.body) : null;
        const longUrl = body && body.url || '';
        const url = new UrlModel({
            url: longUrl,
            hash,
            ipAddress: (event && event.requestContext &&
                event.requestContext.identity && event.requestContext.identity.sourceIp)
                ? event.requestContext.identity.sourceIp : '',
            date: new Date(),
        });
        const result: any = await url.save();
        return {
            statusCode: 200,
            body: JSON.stringify({ hash: result.hash }),
        };
    } catch (err) {
        console.log(err);
        return {
            body: 'Something went wrong',
            statusCode: 500,
        };
    }
};

const getURLByHash = async (event: any, context: any) => {
    try {
        context.callbackWaitsForEmptyLoop = false;
        const conn: any = await getConnection();
        const UrlModel: mongoose.Model<IUrl> = Url(conn);
        const hash = (event && event.queryStringParameters &&
            event.queryStringParameters.hash)
            ? event.queryStringParameters.hash : '';
        const result = await UrlModel.findOne({ hash });
        return {
            statusCode: 200,
            body: JSON.stringify({ url: result && result.url || '' }),
        };
    } catch (err) {
        console.log(err);
        return {
            body: 'Something went wrong',
            statusCode: 500,
        };
    }
};

const getStatsByURL = async (event: any, context: any) => {
    try {
        context.callbackWaitsForEmptyLoop = false;
        const conn: any = await getConnection();
        const UrlModel: mongoose.Model<IUrl> = Url(conn);
        const body = event.body ? JSON.parse(event.body) : null;
        const longurl = body.url || '';
        const results = await UrlModel.find({ url: longurl }, { hash: 1, ipAddress: 1 });
        return {
            statusCode: 200,
            body: JSON.stringify({
                url: longurl,
                ipAddresses: results.map((item) => item.ipAddress),
                hashes: results.map((item) => item.hash),
            }),
        };
    } catch (err) {
        console.log(err);
        return {
            body: 'Something went wrong',
            statusCode: 500,
        };
    }
};

export { createHash, getURLByHash, getStatsByURL }

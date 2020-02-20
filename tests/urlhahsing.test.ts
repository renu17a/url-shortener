// tslint:disable-next-line: no-implicit-dependencies
import axios from 'axios'
import uuid from 'uuid'
// tslint:disable-next-line: ordered-imports
import {createHash, getURLByHash, getStatsByURL} from '../src/functions/urlhashing'

test ('/createHash creates hash', async () => {
    const event = {
        body: '{"url": "www.google.com"}',
        requestContext: {
            identity: {
                sourceIp: '2.2.2.2',
            },
        },
    };
    const context = { callbackWaitsForEmptyLoop : false};
    const result = await createHash(event, context);
    expect(result.statusCode).toBe(200);
})

test ('/createHash should fail', async () => {
    const event = {
        body: '{"uri": "www.google.com"}',
        requestContext: {
            identity: {
                sourceIp: '2.2.2.2',
            },
        },
    };
    const context = { callbackWaitsForEmptyLoop : false};
    const result = await createHash(event, context);
    expect(result.statusCode).toBe(500);
})

test ('/getURLByHash should get url', async () => {
    const event = {
        body: '{"url": "www.google.com"}',
        requestContext: {
            identity: {
                sourceIp: '2.2.2.2',
            },
        },
    };
    const context = {};
    const result = await createHash(event, context);
    const hash = JSON.parse(result.body).hash;
    const newEvent = {
        queryStringParameters: {
            hash,
        },
    }
    const newResult = await getURLByHash(newEvent, context);
    expect(JSON.parse(newResult.body).url).toBe('www.google.com')
    expect(newResult.statusCode).toBe(200);
})

test ('/getURLByHash should return empty', async () => {
    const hash = uuid();
    const context = {};
    const event = {
        queryStringParameters: {
            hash,
        },
    }
    const newResult = await getURLByHash(event, context);
    expect(JSON.parse(newResult.body).url).toBe('');
    expect(newResult.statusCode).toBe(200);
})

test ('/getStatsByURL should return stats', async () => {
    const event = {
        body: '{"url": "www.google.com"}',
    };
    const context = { callbackWaitsForEmptyLoop : false};
    const result = await getStatsByURL(event, context);
    expect(result.statusCode).toBe(200);
})

test ('/getStatsByURL should not return stats for invalid url', async () => {
    const event = {
        body: '{"url": "www.example.com"}',
    };
    const context = { callbackWaitsForEmptyLoop : false};
    const result = await getStatsByURL(event, context);
    expect(JSON.parse(result.body).url).toBe('www.example.com');
    expect(JSON.parse(result.body).hashes).toHaveLength(0);
    expect(JSON.parse(result.body).ipAddresses).toHaveLength(0);
    expect(result.statusCode).toBe(200);
})

test('/hash returns 200 OK', async () => {
    const url = process.env.API_URL + '/hash';
    await axios.post(url, {url: 'https://www.fb.com/'}).then((response) => {
        expect(response.status).toBe(200)
    })
})

test('/url returns 200 OK', async () => {
    const url = process.env.API_URL + '/url?hash=f7f5aed4-1ba6-4313-a164-4a8917c3568a';
    await axios.get(url).then((response) => {
        expect(response.status).toBe(200)
    })
})

test('/stats/url returns 200 OK', async () => {
    const url = process.env.API_URL + '/stats/url';
    await axios.post(url, {url: 'https://www.fb.comma/'}).then((response) => {
        expect(response.status).toBe(200)
    })
})

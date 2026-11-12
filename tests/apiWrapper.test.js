import { beforeEach, describe, expect, it, vi } from 'vitest';
import '../src/apiWrapper.js';
import { serverDomain } from '../src/config/serverDomain.js';

const api = window.elainathemeApi;

/** Makes the next fetch resolve with this response. */
const respond = (body, { ok = true, status = 200 } = {}) =>
    fetch.mockResolvedValueOnce({ ok, status, json: async () => body });

const lastRequest = () => {
    const [url, init] = fetch.mock.calls.at(-1);
    return { url, method: init?.method, headers: init?.headers, body: init?.body && JSON.parse(init.body) };
};

beforeEach(() => {
    globalThis.fetch = vi.fn();
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
});

describe('login', () => {
    it('posts the summoner id as a string and returns the response body', async () => {
        respond({ token: 't' });
        expect(await api.login(123, 'Elaina')).toEqual({ token: 't' });
        expect(lastRequest()).toMatchObject({
            url: `${serverDomain.domain}api/elainatheme/login`,
            method: 'POST',
            body: { summonerID: '123', summonerName: 'Elaina' },
        });
    });
});

describe('backup', () => {
    it('sends the token when reading a backup', async () => {
        respond({ success: true, data: {} });
        await api.readBackup('token', 5);
        expect(lastRequest()).toMatchObject({
            headers: { Authorization: 'token' },
            body: { summonerID: '5', type: 'GET' },
        });
    });

    it('refuses to write a backup while cloud backup is off', async () => {
        globalThis.ElainaData = { get: () => false };
        globalThis.Toast = { error: vi.fn(), promise: vi.fn() };
        await api.writeBackup('token', 5, {});
        expect(fetch).not.toHaveBeenCalled();
        expect(Toast.error).toHaveBeenCalledOnce();
    });
});

describe('icon endpoints when the backend misbehaves', () => {
    it('getUsersImage returns [] on an error status, a network error or a non-array body', async () => {
        respond({}, { ok: false, status: 500 });
        expect(await api.getUsersImage(['a'])).toEqual([]);

        fetch.mockRejectedValueOnce(new Error('offline'));
        expect(await api.getUsersImage(['a'])).toEqual([]);

        respond({ not: 'an array' });
        expect(await api.getUsersImage(['a'])).toEqual([]);
    });

    it('syncUsersIcons returns null on failure so callers can tell it from "nothing to sync"', async () => {
        respond({}, { ok: false, status: 502 });
        expect(await api.syncUsersIcons(['a'], {})).toBeNull();

        fetch.mockRejectedValueOnce(new Error('offline'));
        expect(await api.syncUsersIcons(['a'], {})).toBeNull();

        respond([]);
        expect(await api.syncUsersIcons(['a'], {})).toEqual([]);
    });

    it('getImageHash returns the hash, or null when missing or failing', async () => {
        respond({ hash: 'abc' });
        expect(await api.getImageHash(1, 'avatar')).toBe('abc');

        respond({});
        expect(await api.getImageHash(1, 'avatar')).toBeNull();

        respond({}, { ok: false, status: 404 });
        expect(await api.getImageHash(1, 'avatar')).toBeNull();
    });

    it('syncFriendsIcons stays an alias of syncUsersIcons', async () => {
        respond([{ id: 1 }]);
        expect(await api.syncFriendsIcons(['a'], { a: 'h' }, ['avatar'])).toEqual([{ id: 1 }]);
        expect(lastRequest()).toMatchObject({
            url: `${serverDomain.domain}api/elainatheme/image/syncUsersIcons`,
            body: { usersList: ['a'], localHashes: { a: 'h' }, types: ['avatar'] },
        });
    });
});

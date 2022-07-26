"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("../types");
const users_service_1 = require("./users.service");
const ConfigServiceMock = {
    get: jest.fn(),
};
const UsersRepositoryMock = {
    find: jest.fn(),
    create: jest.fn(),
};
const container = new inversify_1.Container();
let configService;
let usersRepository;
let usersService;
beforeAll(() => {
    container.bind(types_1.TYPES.UserService).to(users_service_1.UserService);
    container.bind(types_1.TYPES.ConfigService).toConstantValue(ConfigServiceMock);
    container.bind(types_1.TYPES.UsersRepository).toConstantValue(UsersRepositoryMock);
    configService = container.get(types_1.TYPES.ConfigService);
    usersRepository = container.get(types_1.TYPES.UsersRepository);
    usersService = container.get(types_1.TYPES.UserService);
});
let createdUser;
describe('User Service', () => {
    it('createUser', () => __awaiter(void 0, void 0, void 0, function* () {
        configService.get = jest.fn().mockReturnValueOnce('1');
        usersRepository.create = jest.fn().mockImplementationOnce((user) => ({
            name: user.name,
            email: user.email,
            password: user.password,
            id: 1,
        }));
        createdUser = yield usersService.createUser({
            email: 'hanna@mail.com',
            name: 'Hanna Doe',
            password: '123',
        });
        expect(createdUser === null || createdUser === void 0 ? void 0 : createdUser.id).toEqual(1);
        expect(createdUser === null || createdUser === void 0 ? void 0 : createdUser.password).not.toEqual('1');
    }));
    it('validateUser - success', () => __awaiter(void 0, void 0, void 0, function* () {
        usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
        const res = yield usersService.validateUser({
            email: 'hanna@mail.com',
            password: '123',
        });
        expect(res).toBeTruthy();
    }));
    it('validateUser - wrong password', () => __awaiter(void 0, void 0, void 0, function* () {
        usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
        const res = yield usersService.validateUser({
            email: 'hanna@mail.com',
            password: '122',
        });
        expect(res).toBeFalsy();
    }));
    it('validateUser - wrong user', () => __awaiter(void 0, void 0, void 0, function* () {
        usersRepository.find = jest.fn().mockReturnValueOnce(null);
        const res = yield usersService.validateUser({
            email: 'hanna@mail.com',
            password: '122',
        });
        expect(res).toBeFalsy();
    }));
});
//# sourceMappingURL=users.service.spec.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const userDB_service_1 = require("./userDB.service");
const custom_exception_1 = require("../../services/custom-exception");
const EStatus_1 = require("../../enums/EStatus");
const hashPassword_1 = require("../../services/hashPassword");
const createToken_1 = require("../../services/createToken");
class UserService {
    async registerUser(userBody) {
        const isName = await (0, userDB_service_1.getUserByName)(userBody.name);
        if (isName)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, `Ім'я ${userBody.name} вже зайнято`);
        return await (0, userDB_service_1.createUser)(userBody);
    }
    async loginUser(userBody) {
        const user = await (0, userDB_service_1.getUserByName)(userBody.name);
        if (!user)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.UNAUTHORIZED, `Username або пароль невірний :(`);
        const passIsValid = await (0, hashPassword_1.checkPassword)(userBody.password, user.password);
        if (!passIsValid)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.UNAUTHORIZED, `Username або пароль невірний :(`);
        const token = (0, createToken_1.singToken)(user.id);
        const userUpdate = await (0, userDB_service_1.updateUser)({ token, id: user.id });
        userUpdate.password = undefined;
        return userUpdate;
    }
    async logoutUser(user) {
        await (0, userDB_service_1.updateUser)({ token: "null", id: user.id });
        return "Logged out";
    }
    async getAllUsers() {
        return await (0, userDB_service_1.getUsers)();
    }
    async deleteUserById(id) {
        await (0, userDB_service_1.deleteUser)(id);
        return null;
    }
    async updateRoleUser(userName, newRole) {
        const user = await (0, userDB_service_1.getUserByName)(userName);
        if (!user)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.NOT_FOUND, `Користувач ${userName} не знайдений в базі даних`);
        const updatedUser = await (0, userDB_service_1.updateUser)({ role: newRole, id: user.id });
        updatedUser.password = undefined;
        return updatedUser;
    }
    async updateUser(id, updateFields) {
        const user = await (0, userDB_service_1.getUserByName)(updateFields.name);
        if (user)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, `Користувач ${updateFields.name} не знайдений в базі даних`);
        const updatedUser = await (0, userDB_service_1.updateUser)({ ...updateFields, id });
        updatedUser.password = undefined;
        return updatedUser;
    }
    async updatePassUser(user, { password, newPass }) {
        const passIsValid = await (0, hashPassword_1.checkPassword)(password, user.password);
        if (!passIsValid)
            throw new custom_exception_1.CustomException(EStatus_1.EStatus.BAD_REQUEST, `Username або пароль невірний`);
        const updatedUser = await (0, userDB_service_1.updatePass)({ password: newPass, id: user.id });
        updatedUser.password = undefined;
        return updatedUser;
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map
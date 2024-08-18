import { DataTypes, Sequelize } from "sequelize";
import { resolve } from "styled-jsx/css";
import ObjectUtil from "../util/Objectutil";

export default class DBManager {
    constructor(path) {
        this.sequelize = new Sequelize({ dialect: "sqlite", storage: path });
    }

    async init() {
        return new Promise(async (resolve, reject) => {
            try {
                this.defineModels();

                await this.sequelize.authenticate();
                await this.sequelize.sync();
                resolve();
            } catch (error) {
                console.error("Unable to connect to database:", error);
                reject(error);
            }
        });
    }

    rsToArray = (rs) => {
        let arr = [];
        for (let i = 0; i < rs.length; i++) {
            arr.push(ObjectUtil.makeObjSerializable(rs[i]));
        }
        return arr;
    };

    defineModels() {
        this.users = this.sequelize.define("users", {
            full_name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            permanent_address: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phone_num: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            position: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        });
        this.branch = this.sequelize.define("branch", {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            branch_name: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        });

        this.users.hasMany(this.branch, {
            foreignKey: "user_id",
        });

        this.branch.belongsTo(this.users, {
            foreignKey: "user_id",
        });

    }

    register(full_name, permanent_address, email, password, username, phone_num, position) {
        return new Promise(async (resolve) => {
            try {
                if (!full_name || !permanent_address || !password) {
                    console.log("Please provide all required fields.");
                    resolve(0);
                } else {
                    const newRegister = await this.users.create({
                        full_name: full_name,
                        permanent_address: permanent_address,
                        email: email,
                        password: password, // Ensure password is passed here
                        username: username,
                        phone_num: phone_num,
                        position: position,
                    });
                    resolve(newRegister.id);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                resolve(0);
            }
        });
    }

    getRegister() {
        return new Promise(async (resolve) => {
            let rs_register = await this.users.findAll();
            let register = [];

            register = this.rsToArray(rs_register);

            resolve(register);
        });
    }

    getRegisterById(id) {
        return new Promise(async (resolve) => {
            try {
                const new_register = await this.users.findOne({
                    where: { id },
                });

                resolve(ObjectUtil.makeObjSerializable(new_register));
            } catch (error) {
                resolve(null);
            }
        });
    }

    addBranch(user_id, branch_name, location) {
        return new Promise(async (resolve) => {
            try {
                if (!user_id || !branch_name || !location) {
                    console.log("Please provide all required fields.");
                    resolve(0);
                } else {
                    const newRegister = await this.branch.create({
                        user_id: user_id,
                        branch_name: branch_name,
                        location: location,
                    });
                    resolve(newRegister.id);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                resolve(0);
            }
        });
    }

    getBranch() {
        return new Promise(async (resolve) => {
            let rs_branch = await this.branch.findAll();
            let branch = [];

            branch = this.rsToArray(rs_branch);

            resolve(branch);
        });
    }
}

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
            branch_id: {
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
        this.fuelPrices = this.sequelize.define("fuelPrices", {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            fuel_type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            rsop: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            app_benross: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            petron_highway: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            caltex: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            total: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            rephil: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            shell_affinis: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        });

        this.users.hasMany(this.branch, {
            foreignKey: "user_id",
        });
        this.users.hasMany(this.fuelPrices, {
            foreignKey: "user_id",
        });

        this.branch.belongsTo(this.users, {
            foreignKey: "user_id",
        });
        this.fuelPrices.belongsTo(this.users, {
            foreignKey: "user_id",
        });

    }

    register(full_name, permanent_address, email, password, username, phone_num, position, branch_id) {
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
                        branch_id: branch_id,
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

    addFuelPrices(user_id, fuel_type, rsop, app_benross, petron_highway,  caltex, total, rephil, shell_affinis ) {
        return new Promise(async (resolve) => {
            try {
                if (!user_id || !fuel_type) {
                    console.log("Please provide all required fields.");
                    resolve(0);
                } else {
                    const newFuelPrices = await this.fuelPrices.create({
                        user_id: user_id,
                        fuel_type: fuel_type,
                        rsop: rsop,
                        app_benross: app_benross,
                        petron_highway: petron_highway,
                        caltex: caltex,
                        total: total,
                        rephil: rephil,
                        shell_affinis: shell_affinis,
                    });
                    resolve(newFuelPrices.id);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                resolve(0);
            }
        });
    }
    getFuelPrices() {
        return new Promise(async (resolve) => {
            let rs_fuel_price = await this.fuelPrices.findAll();
            let prices = [];

            prices = this.rsToArray(rs_fuel_price);

            resolve(prices);
        });
    }

    async updateRegisterDetails(id, register_data) {
        try {
            const register_to_Update = await this.users.findOne({
                where: { id: id },
            });
    
            if (register_to_Update) {
                register_to_Update.full_name = register_data.full_name;
                register_to_Update.permanent_address = register_data.permanent_address;
                register_to_Update.email = register_data.email;
                register_to_Update.username = register_data.username;
                register_to_Update.phone_num = register_data.phone_num;
                register_to_Update.position = register_data.position;
                register_to_Update.branch_id = register_data.branch_id;
    
                await register_to_Update.save();
    
                // Confirming the update
                console.log(`User with ID ${id} has been successfully updated.`);
            } else {
                console.log("User not found.");
            }
        } catch (error) {
            console.error("Error updating user:", error.message);
        }
    }
    

}

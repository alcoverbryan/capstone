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
            // profile_img: {
            //     type: Sequelize.BLOB,
            //     allowNull: true,
            // },
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
            otp: {
                type: DataTypes.STRING,
                allowNull: true 
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
            date: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        });

        this.chargeAccounts = this.sequelize.define("chargeAccounts", {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            soa: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            cust_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            volume: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            ammount: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            terms: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            bank: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            check_no: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ammount_paid: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            ewt: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            cr_num: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            date_collected: {
                type: DataTypes.DATEONLY,
                allowNull: true,
            },
        });

        this.dailySales = this.sequelize.define("dailySales", {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            shift: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            credit: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            charge: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            grab: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            coins: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bills: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            checks: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            card: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            gcash: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            vouchers: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            subtotal: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        });

        this.actualPOs = this.sequelize.define("actualPOs", {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "users",
                    key: "id",
                },
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            actualPOS: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            overShortage: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },

        });

        this.users.hasMany(this.branch, {
            foreignKey: "user_id",
        });
        this.users.hasMany(this.fuelPrices, {
            foreignKey: "user_id",
        });
        this.users.hasMany(this.chargeAccounts, {
            foreignKey: "user_id",
        });
        this.users.hasMany(this.dailySales, {
            foreignKey: "user_id",
        });
        this.users.hasMany(this.actualPOs, {
            foreignKey: "user_id",
        });

        this.branch.belongsTo(this.users, {
            foreignKey: "user_id",
        });
        this.fuelPrices.belongsTo(this.users, {
            foreignKey: "user_id",
        });
        this.chargeAccounts.belongsTo(this.users, {
            foreignKey: "user_id",
        });
        this.dailySales.belongsTo(this.users, {
            foreignKey: "user_id",
        });
        this.actualPOs.belongsTo(this.users, {
            foreignKey: "user_id",
        });

    }

    register(full_name, permanent_address, email, password, username, phone_num, position, branch_id, otp) {
        return new Promise(async (resolve) => {
            try {
            
                if (!full_name || !permanent_address || !password) {
                    console.log("Please provide all required fields.");
                    resolve(0);
                } else {
                    const newRegister = await this.users.create({
                        // profile_img: profile_img,
                        full_name: full_name,
                        permanent_address: permanent_address,
                        email: email,
                        password: password, // Ensure password is passed here
                        username: username,
                        phone_num: phone_num,
                        position: position,
                        branch_id: branch_id,
                        otp: otp,
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

    addFuelPrices(user_id, fuel_type, rsop, app_benross, petron_highway,  caltex, total, rephil, shell_affinis, date ) {
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
                        date: date,
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

    addChargeAccounts(user_id, date, soa, cust_name, volume,  ammount, terms, bank, check_no, ammount_paid, ewt, cr_num, date_collected) {
        return new Promise(async (resolve) => {
            try {
                if (!user_id || !soa) {
                    console.log("Please provide all required fields.");
                    resolve(0);
                } else {
                    const newChargeAccount = await this.chargeAccounts.create({
                        user_id: user_id,
                        date: date,
                        soa: soa,
                        cust_name: cust_name,
                        volume: volume,
                        ammount: ammount,
                        terms: terms,
                        bank: bank,
                        check_no: check_no,
                        ammount_paid: ammount_paid,
                        ewt: ewt,
                        cr_num: cr_num,
                        date_collected: date_collected,
                    });
                    resolve(newChargeAccount.id);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                resolve(0);
            }
        });
    }

    getChargeAccount() {
        return new Promise(async (resolve) => {
            let rs_charge_account = await this.chargeAccounts.findAll();
            let account = [];

            account = this.rsToArray(rs_charge_account);

            resolve(account);
        });
    }

    addDailySales(user_id, date, shift, credit, charge,  grab, coins, bills, checks, card, gcash, vouchers, subtotal) {
        console.log(user_id, date, shift, credit, charge,  grab, coins, bills, checks, card, gcash, vouchers, subtotal)
        return new Promise(async (resolve) => {
            try {
                if (!user_id || !date) {
                    console.log("Please provide all required fields.");
                    resolve(0);
                } else {
                    const newChargeAccount = await this.dailySales.create({
                        user_id: user_id,
                        date: date,
                        shift: shift,
                        credit: credit,
                        charge: charge,
                        grab: grab,
                        coins: coins,
                        bills: bills,
                        checks: checks,
                        card: card,
                        gcash: gcash,
                        vouchers: vouchers,
                        subtotal: subtotal,
                    });
                    resolve(newChargeAccount.id);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                resolve(0);
            }
        });
    }

    addActualPOS(user_id, date, actualPOS, overShortage) {
        return new Promise(async (resolve) => {
            try {
                if (!user_id || !date) {
                    console.log("Please provide all required fields.");
                    resolve(0);
                } else {
                    const newChargeAccount = await this.actualPOs.create({
                        user_id: user_id,
                        date: date,
                        actualPOS: actualPOS,
                        overShortage: overShortage,
                    });
                    resolve(newChargeAccount.id);
                }
            } catch (error) {
                console.error("Error during registration:", error);
                resolve(0);
            }
        });
    }
    async getActualPOS() {
        try {
            let rs_actual_pos = await this.actualPOs.findAll({
                include: [
                    {
                        model: this.users,
                        attributes: [
                            "id",
                            "username",
                        ],
                        required: false, 
                    },
                ],
            });

            let pos = this.rsToArray(rs_actual_pos);
    
            return pos; 
        } catch (error) {
            console.error("Error fetching daily sales:", error);
            throw error;
        }
    } 
    async getDailySales() {
        try {
            let rs_daily_sales = await this.dailySales.findAll({
                include: [
                    {
                        model: this.users,
                        attributes: [
                            "id",
                            "username",
                        ],
                        required: false, 
                    },
                ],
            });

            let sales = this.rsToArray(rs_daily_sales);
    
            return sales; 
        } catch (error) {
            console.error("Error fetching daily sales:", error);
            throw error;
        }
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

    async updateFuelPrices(id, register_data) {
        try {
            const fuel_prices_to_Update = await this.fuelPrices.findOne({
                where: { id: id },
            });
    
            if (fuel_prices_to_Update) {
                fuel_prices_to_Update.fuel_type = register_data.fuel_type;
                fuel_prices_to_Update.rsop = register_data.rsop;
                fuel_prices_to_Update.app_benross = register_data.app_benross;
                fuel_prices_to_Update.petron_highway = register_data.petron_highway;
                fuel_prices_to_Update.caltex = register_data.caltex;
                fuel_prices_to_Update.total = register_data.total;
                fuel_prices_to_Update.rephil = register_data.rephil;
                fuel_prices_to_Update.shell_affinis = register_data.shell_affinis;
                fuel_prices_to_Update.date = register_data.date;
    
                await fuel_prices_to_Update.save();
            } else {
                console.log("Fuel Price not found.");
            }
        } catch (error) {
            console.error("Error updating user:", error.message);
        }
    }

    async updateChargeAccount(id, account_data) {
        try {
            const charge_acc_to_Update = await this.chargeAccounts.findOne({
                where: { id: id },
            });
    
            if (charge_acc_to_Update) {
                charge_acc_to_Update.date = account_data.date;
                charge_acc_to_Update.soa = account_data.soa;
                charge_acc_to_Update.cust_name = account_data.cust_name;
                charge_acc_to_Update.volume = account_data.volume;
                charge_acc_to_Update.ammount = account_data.ammount;
                charge_acc_to_Update.terms = account_data.terms;
                charge_acc_to_Update.bank = account_data.bank;
                charge_acc_to_Update.check_no = account_data.check_no;
                charge_acc_to_Update.ammount_paid = account_data.ammount_paid;
                charge_acc_to_Update.ewt = account_data.ewt;
                charge_acc_to_Update.cr_num = account_data.cr_num;
                charge_acc_to_Update.date_collected = account_data.date_collected;
    
                await charge_acc_to_Update.save();
            } else {
                console.log("Charge Account not found.");
            }
        } catch (error) {
            console.error("Error updating user:", error.message);
        }
    }

}

import knex, { type Knex } from "knex";
import { RowDataPacket } from "mysql2";
import { databaseOptions as connection, database_type as client } from "./config";


export default class Database
{
    static connection: Knex = knex({ client, connection });
    static table_name: string;

    // Get all tables of a database
    static async getTables() {
        return (await Database.connection.raw(`SELECT TABLE_NAME FROM information_schema.tables WHERE TABLE_SCHEMA = "${connection.database}";`))[0].map((data_packet: RowDataPacket) => data_packet = data_packet['TABLE_NAME'])
    }

    // Get structure of a table
    static async getTableInfos(table: string)
    {
        let infos = {};
        (await Database.connection.raw(`DESCRIBE ${table}`))[0].map((schema: RowDataPacket) => {
            return Object.assign(infos, {[schema["Field"]] : schema["Type"]})
        })
        return infos
    }

    // Chose the table that will be used for next queries
    static table(table: string)
    {
        this.table_name = table;
        return this;
    }

    // Return all records
    // SELECT * FROM table
    static async all()
    {
        return await Database.connection.from(this.table_name).select('*')
    }

    // Return filtered records
    // SELECT * FROM table WHERE param IN columns
    static async find(columns: string[], params: any[] = [])
    {
        return await Database.connection.from(this.table_name).select('*').whereRaw(`? in (${columns.join(',')})`, params)
    }

    // Insert a new record
    // INSERT INTO table columns VALUES data
    // Return id of new record
    static async insert(data: Object)
    {
        return await Database.connection.from(this.table_name).insert(data)
    }

    // Delete a record
    // DELETE FROM table WHERE data
    // Return affected rows count
    static async delete(data: Object)
    {
        return await Database.connection.from(this.table_name).delete().where(data)
    }

    // Update a record
    // UPDATE table SET data.new WHERE data.old
    // Return affected rows count
    static async update(data: {new: Object, old: Object})
    {
        return await Database.connection.from(this.table_name).update(data.new).where(data.old)
    }
}
import { MongoClient, Collection } from 'mongodb'
import {dbConfig} from "../../../../config/config";

interface IMongoHelper {
    connect(url: string): Promise<void>
    disconnect(): Promise<void>
    getCollection(name: string): Collection
    map(collection: any): any
    mapCollection(collection: any[]): any[]
}

class MongoHelper implements IMongoHelper {
    private client: MongoClient
    private url: string

    constructor() {
     this.connect(dbConfig.mongoUrl).then(r => 'connected')
    }

    async connect(url: string): Promise<void> {
        this.url = url
        this.client = await MongoClient.connect(url)
    }

    async disconnect(): Promise<void> {
        await this.client.close()
        this.client = null
    }

    getCollection(name: string): Collection {
        return this.client.db().collection(name)
    }

    map(data: any): any {
        const { _id, ...rest } = data
        return { ...rest, id: _id.toHexString() }
    }

    mapCollection(collection: any[]): any[] {
        return collection.map(c => this.map(c))
    }
}



export { MongoHelper, IMongoHelper }
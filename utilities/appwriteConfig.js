import { Client, Databases } from "appwrite";

export const DATABASE_ID = '653d0f9f65b441e77fe3'
export const PROJECT_ID = '653d0b55a3b06ee46a52'
export const MESSAGES_COLLECTION_ID = '653d0ff4d2935ec7f24f'

const client = new Client();

client
.setEndpoint('https://cloud.appwrite.io/v1')
.setProject('653d0b55a3b06ee46a52');

export const databases = new Databases(client);

export default client;  